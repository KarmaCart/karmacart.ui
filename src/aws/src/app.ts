#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { KarmaCartUiStack } from './cdk-stack';

const karamcartEnvironment = process.env.KARAMCART_ENVIRONMENT;
const awsAccountNumber = process.env.AWS_ACCOUNT_NUMBER;

const app = new App();
new KarmaCartUiStack(app, 'KarmaCartUiStack', karamcartEnvironment!, {
  env: {
    region: 'us-east-2',
    account: awsAccountNumber
  },
  stackName: 'KarmaCartUiStack'
});