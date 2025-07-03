import { serializeError } from 'serialize-error';
import winston from 'winston'
import { env } from './env'
import { EOL } from 'os'
import { omit } from '@mysite/shared/src/omit'
import pc from 'picocolors'
import { MESSAGE } from 'triple-beam'
import * as yaml from 'yaml'
import debug from 'debug'
import { deepMap } from '../utils/deepMap';
import _ from 'lodash'

export const winstonLogger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'backend', hostEnv: env.HOST_ENV },
  transports: [
    new winston.transports.Console({
      format: winston.format((logData) => {
        const setColor = {
          info: (str: string) => pc.blue(str),
          error: (str: string) => pc.red(str),
          debug: (str: string) => pc.cyan(str),
        }[logData.level as 'info' | 'error' | 'debug']

        
        const timestamp = typeof logData.timestamp === 'string' ? logData.timestamp : 'UNKNOWN_TIME'

        const levelAndType = `${logData.level} ${logData.logType}`
        const topMessage = `${setColor(levelAndType)} ${pc.green(timestamp)}${EOL}${logData.message}`

        const visibleMessageTags = omit(logData, [
          'level',
          'logType',
          'timestamp',
          'message',
          'service',
          'hostEnv',
        ])

        const stringifyedLogData = _.trim(
          yaml.stringify(visibleMessageTags, (_k, v) => (_.isFunction(v) ? 'Function' : v))
        )

        const resultLogData = {
          ...logData,
          [MESSAGE]:
            [topMessage, Object.keys(visibleMessageTags).length > 0 ? `${EOL}${stringifyedLogData}` : '']
              .filter(Boolean)
              .join('') + EOL,
        }

        return resultLogData
      })(),
    }),
  ],
})


type Meta = Record<string, any> | undefined
const prettifyMeta = (meta: Meta): Meta => {
  return deepMap(meta, ({key, value}) => {
    if (['email', 'password', 'newPassword', 'oldPassword', 'token', 'text', 'description', 'apiKey', 'signature'].includes(key)) {
      return '🙈'
    }
    return value
  })
}

export const logger = {
  info: (logType: string, message: string, meta?: Meta) => {
    if (!debug.enabled(`mysite:${logType}`)) {
      return
    }
    winstonLogger.info(message, { logType, ...prettifyMeta(meta) })
  },
  error: (logType: string, error: Error, meta?: Meta) => {
    if (!debug.enabled(`mysite:${logType}`)) {
      return
    }
    const serializedError = serializeError(error)
    winstonLogger.error(serializedError.message || 'Unknown error', {
      logType,
      error,
      errorStack: serializedError.stack,
      ...prettifyMeta(meta),
    })
  },
}