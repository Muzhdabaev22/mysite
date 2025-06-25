import winston from 'winston'
import { env } from './env'
import { serializeError } from 'serialize-error'
import { EOL } from 'os'
import _ from 'lodash'
import pc from 'picocolors'
import { MESSAGE } from 'triple-beam'
import * as yaml from 'yaml'

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

        const visibleMessageTags = _.omit(logData, [
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

// --- HELPERS ---

function sanitizeMeta(meta: Record<string, any>): Record<string, any> {
  const cleanedMeta: Record<string, any> = {}

  for (const key in meta) {
    const value = meta[key]

    if (value instanceof Error) {
      cleanedMeta[key] = {
        message: value.message,
        stack: value.stack,
      }
    } else if (typeof value === 'object' && value !== null) {
      try {
        cleanedMeta[key] = JSON.parse(JSON.stringify(value))
      } catch {
        cleanedMeta[key] = 'Cyclic or non-serializable object'
      }
    } else {
      cleanedMeta[key] = value
    }
  }

  return cleanedMeta
}

// --- LOGGER ---

export const logger = {
  info: (logType: string, message: string, meta?: Record<string, any>) => {
    winstonLogger.info(message, { logType, ...sanitizeMeta(meta || {}) })
  },
  error: (logType: string, error: Error, meta?: Record<string, any>) => {
    const sanitizedMeta = sanitizeMeta({
      error: error,
      errorStack: error.stack,
      ...meta,
    })

    const errorMessage = typeof error.message === 'string' ? error.message : 'Unknown error'

    winstonLogger.error(errorMessage, {
      logType,
      ...sanitizedMeta,
    })
  },
}