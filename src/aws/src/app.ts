#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { KarmaCartUiStack } from './cdk-stack';

const awsAccountNumber = process.env.AWS_ACCOUNT_NUMBER;

const app = new App();
new KarmaCartUiStack(app, 'KarmaCartUiStack', {
  env: {
    region: 'us-east-1',
    account: awsAccountNumber
  },
  stackName: 'KarmaCartUiStack',
  sourcePath: 'build',
  domainName: 'karma-cart.com',
});