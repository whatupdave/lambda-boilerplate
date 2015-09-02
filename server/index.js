import express from 'express'

import {handler} from '../src'

const app = express()

app.post('/', (req, res) => {
  console.log(req.body)

  handler(req.body, {
    done: (result, error) => {
      if (error) {
        return res.send(error)
      }

      res.send(result)
    },

    succeed: result => {
      res.send(result)
    },

    fail: error => {
      res.send(error)
    },
  })
})

const server = app.listen(process.env.PORT || 3100, () => {
  const {address, port} = server.address()

  console.log(`listening at http://${address}:${port}`)
})
