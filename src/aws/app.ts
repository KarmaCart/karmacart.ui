#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { KarmaCartUiStack } from './cdk-stack';

let karamcartEnvironment = process.env.KARAMCART_ENVIRONMENT;

// Validate that the environment was set with an expected value.
if (!karamcartEnvironment) {
  throw new Error("KaramCart Environment not set!");
} else {
  let valid = karamcartEnvironment === 'eng' || karamcartEnvironment === 'prod';
  if (!valid) {
    throw new Error("KarmaCart Environment not valid!");
  }
}

const app = new App();
new KarmaCartUiStack(app, 'KarmaCartUiStack', karamcartEnvironment, {
  env: {
    region: 'us-east-2',
    account: '740207786562'
  },
  stackName: 'KarmaCartUiStack'
});