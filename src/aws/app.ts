#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { KarmaCartUiStack } from './cdk-stack';

let karamcartEnvironment = process.env.KARAMCART_ENVIRONMENT;
let awsAccountNumber = process.env.AWS_ACCOUNT_NUMBER;

const app = new App();
new KarmaCartUiStack(app, 'KarmaCartUiStack', karamcartEnvironment!, {
  env: {
    region: 'us-east-2',
    account: awsAccountNumber
  },
  stackName: 'KarmaCartUiStack'
});