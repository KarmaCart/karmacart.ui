#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { KarmaCartUiStack } from './cdk-stack';

const app = new App();
new KarmaCartUiStack(app, 'KarmaCartUiStack', {
  env: {
    region: 'us-east-2',
    account: '740207786562'
  },
  stackName: 'KarmaCartUiStack'
});