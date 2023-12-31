import { Stack, StackProps, RemovalPolicy }from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from "constructs";
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';

export class KarmaCartUiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const myBucket = new Bucket(this, 'karma-cart-ui', {
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
    });
    const deployment = new BucketDeployment(
      this,
      'deployStaticWebsite',
      {
        sources: [Source.asset('../../build')],
        destinationBucket: myBucket,
      }
    );
  }
}