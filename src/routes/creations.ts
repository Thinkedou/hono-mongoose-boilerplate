import { Hono } from 'hono'

const api = new Hono().basePath('/creations')

api.get('/', async (c) => {
    try {
        // ici find all 
        return c.json([])
      } catch (error) {
        console.error(error);
        return c.json('Internal Server Error')
    }
})

api.post('/', async (c) => {
  return c.json({newDoc:true}, 201)
})

api.get('/:id', (c) => {
  const {id} = c.req.param()
  return c.json(`get ${id}`)
})

export default api