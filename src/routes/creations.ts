import { Hono } from 'hono'
import { HydratedDocument,isValidObjectId } from 'mongoose';
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

api.put('/:id', async (c) => {
  const {id} = c.req.param()
  const body = await c.req.json()
  if(isValidObjectId(id)){
    const query = {
      _id:id
    }
    const updateQuery = {
      $set:{
        ...body
      }
    }
    try {
      const updatedCrea = await Creation.findOneAndUpdate(query,updateQuery,{new:true})
      return c.json(updatedCrea, 201)
    } catch (error) {
      return c.json(error._message,400)
    }
  }else{
    return c.text('error wrong id',400)
  }
  
})

api.patch('/:id', async (c) => {
  const {id} = c.req.param()
  const body = await c.req.json()
  const {categories=false,...rest} = body

  if(isValidObjectId(id)){
    const query = {
      _id:id
    }
    const queryUpdate: Record<string, object> = {}
    queryUpdate['$set'] = {
      ...rest
    }
    if(categories){
      queryUpdate['$addToSet'] = {
        categories
      }
    }
    try {
      const updatedCrea = await Creation.findOneAndUpdate(query,queryUpdate,{new:true})
      return c.json(updatedCrea, 201)
    } catch (error) {
      return c.json(error._message,400)
    }
  }else{
    return c.text('error wrong id',400)
  }
  
})

api.get('/:id', async (c) => {
  const {id} = c.req.param()
  if(isValidObjectId(id)){
    const oneCrea = await Creation.findOne({_id:id})
    return c.json(oneCrea)
  }else{
    return c.text('error wrong id',400)
  }
})


api.delete('/:id', async (c) => {
  const {id} = c.req.param()
  if(isValidObjectId(id)){
    const toDel = await Creation.deleteOne({_id:id})
    return c.json(toDel,200)
  }else{
    return c.text('error wrong id',400)
  }
})

export default api