import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import {DbConnect} from './db'

import creations    from './routes/creations'

const app = new Hono()
await DbConnect()

app.route('/api', creations)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
