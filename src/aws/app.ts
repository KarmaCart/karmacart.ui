#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { KarmaCartUiStack } from './src/cdk-stack';

const awsAccountNumber = process.env.AWS_ACCOUNT_NUMBER;
const karmacartEnvironment = process.env.KARMACART_ENVIRONMENT

let karmacartDomainName: string
if (karmacartEnvironment === 'eng') {
  karmacartDomainName = 'karma-cart-eng.andersbuck.dev'
} else {
  karmacartDomainName = 'karma-cart.andersbuck.dev'
}

const app = new App();
new KarmaCartUiStack(app, 'KarmaCartUiStack', {
  env: {
    region: 'us-east-1',
    account: awsAccountNumber
  },
  stackName: 'KarmaCartUiStack',
  sourcePath: 'build',
  domainName: karmacartDomainName,
});