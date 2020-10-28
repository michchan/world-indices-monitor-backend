import { ScheduledHandler } from 'aws-lambda'

export const handler: ScheduledHandler = async (event, context, callback) => {
  try {
    console.log('I am running!')
  } catch (error) {
    callback(error)
  }
}