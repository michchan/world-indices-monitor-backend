import * as cdk from '@aws-cdk/core'

function construct (scope: cdk.Construct): void {
  // CDK Construct of api service goes here
  JSON.stringify(scope)
}
export default { construct }