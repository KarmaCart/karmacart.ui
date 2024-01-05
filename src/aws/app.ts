#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { KarmaCartUiStack } from './cdk-stack';

let karamcartEnvironment = process.env.KARAMCART_ENVIRONMENT;
let awsAccountNumber = process.env.AWS_ACCOUNT_NUMBER;

// Validate that the environment was set with an expected value.
if (!karamcartEnvironment) {
  throw new Error("KaramCart Environment not set!");
} else {
  let isEngEnv = karamcartEnvironment === 'eng'
  let isProdEnv = karamcartEnvironment === 'prod'
  let isValidEnv = isEngEnv || isProdEnv;
  if (!isValidEnv) {
    throw new Error("KarmaCart Environment not valid!");
  }
}

const app = new App();
new KarmaCartUiStack(app, 'KarmaCartUiStack', karamcartEnvironment, {
  env: {
    region: 'us-east-2',
    account: awsAccountNumber
  },
  stackName: 'KarmaCartUiStack'
});