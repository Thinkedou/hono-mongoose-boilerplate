import { Hono } from 'hono'
import { Creation } from '../models/creations'

const api = new Hono().basePath('/creations')

api.get('/', async (c) => {
    try {
        return c.json([])
      } catch (error) {
        console.error(error);
        return c.json('Internal Server Error')
    }
})

api.post('/', async (c) => {

  const newCrea = new Creation({
      imgUri:' https://testtesTR.fr ',
      prompt:'test pour new Crea'
  })
  const saveCrea = await newCrea.save()

  return c.json(saveCrea, 201)
})

api.get('/:id', (c) => {
  const {id} = c.req.param()
  return c.json(`get ${id}`)
})

export default api