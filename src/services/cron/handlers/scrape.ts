import { ScheduledHandler } from 'aws-lambda'

export const handler: ScheduledHandler = (event, context, callback) => {
  try {
    console.log('I am running!')
  } catch (error) {
    callback(error)
  }
}