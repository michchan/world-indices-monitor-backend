import { ScheduledHandler } from 'aws-lambda'

export const handler: ScheduledHandler = () => {
  console.log('I am running!')
}