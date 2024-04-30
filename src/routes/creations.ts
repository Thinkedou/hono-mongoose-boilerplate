import { Hono } from 'hono'
import { HydratedDocument } from 'mongoose';
import { Creation,ICreations } from '../models/creations'

const api = new Hono().basePath('/creations')

api.get('/', async (c) => {
    try {
        const allCreas = await Creation.find({})
        return c.json(allCreas)
      } catch (error) {
        console.error(error);
        return c.json('Internal Server Error')
    }
})

api.post('/', async (c) => {
  const body = await c.req.json()
  try {
    const newCrea:HydratedDocument<ICreations>= new Creation(body)
    const saveCrea = await newCrea.save()
    return c.json(saveCrea, 201)
  } catch (error) {
    return c.json(error._message,400)
  }
})

api.get('/:id', (c) => {
  const {id} = c.req.param()
  return c.json(`get ${id}`)
})

export default api