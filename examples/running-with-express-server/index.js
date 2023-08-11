require('dotenv').config()
const candymail = require('../../lib')
const express = require('express')
const app = express()
const port = 3000

const automation = require('../candymail.automation.json')
candymail
  .init(automation.workflows, {
    mail: [
      {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: true,
        },
      },

      
    ],
    hosting: { url: process.env.HOSTING_URL },
    db: { reset: false },
    debug: { trace: true },
  })
  .then((e) => {
    candymail.start()

    app.get('/', async (req, res) => {
      res.send('Go to /start to trigger the first workflow')
    })

    app.get('/start', async (req, res) => {
      
      params=[{key:"firstname",value:"Laurent"},{key:"lastname",value:"Ait lhadj"},]
      const user = process.env.RECIPIENT_EMAIL
      candymail.runWorkflow('welcome-series', user, 'laurent.aitlhadj@gmail.com', params)

      //candymail.runWorkflow('workflow1', user)

      res.send('workflow1 started')
    })

    app.get('/messages', async (req, res) => {
      const messages = await candymail.getAllScheduledMessages()
      res.json(`Messages scheduled: ${JSON.stringify(messages)}`)
    })

    app.get('/unsubscribe', (req, res) => {
      const { email } = req.query
      candymail.unsubscribeUser(email)
      res.send(`Sent a unsubscribe request for ${email}`)
    })

    app.listen(port, () => {
      console.log(`Learn about our new features at http://localhost:${port}`)
    })
  })
