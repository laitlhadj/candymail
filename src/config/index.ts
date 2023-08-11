import { Options } from '../types'
import * as mailer from 'nodemailer'
import Mail = require('nodemailer/lib/mailer')

let config: Options

const setConfig = (configOptions: Options) => {
  if (!config) {
    config = configOptions
  } else {
    throw new Error('Invalid Configurations provided for custom service')
  }
}

const getConfig = (): Options => {
  return config
}

const getTransporter = (sendFrom: any = null): Mail => {
  if (sendFrom) {
    return mailer.createTransport(getConfig().mail.find((m: any) => m.auth.user === sendFrom))
  }

  return mailer.createTransport(getConfig().mail[0])
}

export { getConfig, setConfig, getTransporter }
