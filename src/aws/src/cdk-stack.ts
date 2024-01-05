import { Stack, StackProps, RemovalPolicy, Duration }from 'aws-cdk-lib';
import { BlockPublicAccess, Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from "constructs";
import { BucketDeployment, CacheControl, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';
import { CloudFrontAllowedMethods, CloudFrontWebDistribution, OriginAccessIdentity, SSLMethod, SecurityPolicyProtocol, ViewerCertificate } from 'aws-cdk-lib/aws-cloudfront';
import { CanonicalUserPrincipal, Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Metric } from 'aws-cdk-lib/aws-cloudwatch';

export interface CFAppProps extends StackProps {
  sourcePath: string;
  domainName: string;
}

export class KarmaCartUiStack extends Stack {
  constructor(scope: Construct, id: string, props: CFAppProps) {
    super(scope, id, props);

    const { sourcePath, domainName } = props;

    // The code that defines your stack goes here
    const karmaCartUiBucket = new Bucket(this, `karma-cart-ui`, {
      publicReadAccess: false,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html'
    });

    const cert = new Certificate(
      this,
      'Certificate',
      {
        domainName: domainName,
        validation: CertificateValidation.fromEmail(),
      }
    );

    const cloudfrontOAI = new OriginAccessIdentity(this, 'CloudfrontOAI', {
      comment: `Cloudfront OAI for ${domainName}`,
    });

    karmaCartUiBucket.addToResourcePolicy(
      new PolicyStatement({
        sid: 's3BucketPublicRead',
        effect: Effect.ALLOW,
        actions: ['s3:GetObject'],
        principals: [
          new CanonicalUserPrincipal(
            cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
        resources: [`${karmaCartUiBucket.bucketArn}/*`],
      })
    );

    const viewerCert = ViewerCertificate.fromAcmCertificate(
      {
        certificateArn: cert.certificateArn,
        env: {
          region: 'us-east-1',
          account: props.env!.account!,
        },
        applyRemovalPolicy: cert.applyRemovalPolicy,
        node: this.node,
        stack: this,
        metricDaysToExpiry: () =>
          new Metric({
            namespace: 'TLS viewer certificate validity',
            metricName: 'TLS Viewer Certificate expired',
          }),
      },
      {
        sslMethod: SSLMethod.SNI,
        securityPolicy: SecurityPolicyProtocol.TLS_V1_2_2021,
        aliases: [domainName],
      }
    );

    const distribution = new CloudFrontWebDistribution(
      this,
      'karmaCartUiDistro',
      {
        viewerCertificate: viewerCert,
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: karmaCartUiBucket,
              originAccessIdentity: cloudfrontOAI,
            },
            behaviors: [
              {
                isDefaultBehavior: true,
                compress: true,
                allowedMethods: CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
              },
            ],
          },
        ],
      }
    );

    new BucketDeployment(
      this,
      `deployStaticWebsite`,
      {
        destinationBucket: karmaCartUiBucket,
        sources: [Source.asset(sourcePath)],
        cacheControl: [
          CacheControl.maxAge(Duration.days(1)),
        ],
        distribution,
      }
    );
  }
}