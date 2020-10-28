import * as cdk from '@aws-cdk/core'

import api from './services/api'
import cron from './services/cron'

export class WorldIndicesMonitorBackendStack extends cdk.Stack {
  constructor (scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // Initialize cron service
    cron.construct(this)
    // Initialize api service
    api.construct(this)
  }
}