import { createConnection, getConnection } from 'typeorm'
import { User } from '../entity/User'
import { Message } from '../entity/Message'
import { getConfig } from '../config'

export const genConnection = async () => {
  await createConnection({
    //type: 'sqlite',
    //database: './candymail.db',

    type: "postgres",
    host: "ep-mute-cake-67553112.eu-central-1.postgres.vercel-storage.com",
    port: 5432,
    username: "default",
    password: "VJX5FUHwWv8A",
    database: "verceldb",
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false
      }
    },

    dropSchema: getConfig()?.db?.reset != null ? getConfig().db.reset : true,
    entities: [User, Message],
    synchronize: true,
    
  })
}

export const getDB = async () => {
  return await getConnection()
}
