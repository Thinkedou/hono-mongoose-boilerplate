import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import {DbConnect} from './db'

import creations    from './routes/creations'
import comments    from './routes/comments'

const app = new Hono()
await DbConnect()

app.route('/api', creations)
app.route('/api', comments)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
