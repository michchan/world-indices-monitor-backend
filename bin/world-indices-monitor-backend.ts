#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { WorldIndicesMonitorBackendStack } from '../src/world-indices-monitor-backend-stack';

const app = new cdk.App();
new WorldIndicesMonitorBackendStack(app, 'WorldIndicesMonitorBackendStack');
