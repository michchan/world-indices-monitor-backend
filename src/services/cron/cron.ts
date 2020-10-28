import * as cdk from '@aws-cdk/core'
import * as iam from '@aws-cdk/aws-iam'
import * as lambda from '@aws-cdk/aws-lambda'

const ROLE_ID = 'CronRole'
const SERVICE_PATHNAME = __dirname.split('/').pop() ?? ''
const TIMEOUT_MINS = 5
const SCRAPER_MEMORY_SIZE_MB = 700

const constructIamRole = (scope: cdk.Construct): iam.Role => {
  const role = new iam.Role(scope, ROLE_ID, {
    assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
  })
  return role
}

const constructLambdas = (scope: cdk.Construct, role: iam.Role) => {
  new lambda.Function(scope, 'Scrape', {
    code: lambda.Code
      .fromAsset(`bundles/${SERVICE_PATHNAME}/handlers`),
    handler: 'scrape.handler',
    timeout: cdk.Duration.minutes(TIMEOUT_MINS),
    runtime: lambda.Runtime.NODEJS_12_X,
    memorySize: SCRAPER_MEMORY_SIZE_MB,
    role,
  })
}

function construct (scope: cdk.Construct): void {
  const role = constructIamRole(scope)
  constructLambdas(scope, role)
}
export default { construct }