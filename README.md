# karmacart.ui

This is a UI project whose infrastructure is defined using AWS CDK in /aws-cdk. The UI is implemented using the React framework in the /src directory.

## Useful commands

* `npm start`   starts the application locally

## Deployment

Deployment is managed in the .github/workflows directory, a GitHub action is defined there that will execute the AWS CDK tool during a manual run of the action.

### First Deployment
When deploying for the first time in an environment need to create CNAME records in a DNS Service during deployment. Use Cloudfront and Certificate Manager.