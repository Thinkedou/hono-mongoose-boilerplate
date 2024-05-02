import { IComment,Comment } from './../models/comments';
import { Hono } from 'hono'
import { HydratedDocument, isValidObjectId } from 'mongoose';

type findOptions={
  [key:string]:object|string|number
}

const api = new Hono().basePath('/comments')

api.get('/', async (c) => {
    const {
        limit=0,
        page=1,
        sort=false,
        embed=false,
        ...rest
    } = c.req.query()
    const skip = (+page-1)*+limit
       
    const options:findOptions = {
      skip,
      limit
    }
    if(embed){
      options['populate']={
        path:'parentCreationRef'
      }
    }
    if(sort){
      const order = sort.includes('-') ? -1:1
      const sortKey = order>0? sort: sort.substring(1,sort.length)
      const sortOptions: Record<string, number> = {
        [sortKey]:order
      }
      options['sort']={
        ...sortOptions
      }
    } 
    const query = {
      ...rest
    }
    console.log({query,options})
    // const projection = {
    //   createdAt:0,
    //   updatedAt:0
    // }
    try {
    
        const allComments = await Comment.find(query,{},options)
        return c.json(allComments)
      } catch (error) {
        console.error(error);
        return c.json('Internal Server Error')
    }
})

api.post('/', async (c) => {
  const body = await c.req.json()
  try {
    const newCom:HydratedDocument<IComment>= new Comment(body)
    const saveComment = await newCom.save()
    return c.json(saveComment, 201)
  } catch (error) {
    return c.json(error._message,400)
  }
})

// api.put('/:id', async (c) => {
//   const {id} = c.req.param()
//   const body = await c.req.json()
//   if(isValidObjectId(id)){
//     const query = {
//       _id:id
//     }
//     const updateQuery = {
//       $set:{
//         ...body
//       }
//     }
//     try {
//       const updatedCrea = await Creation.findOneAndUpdate(query,updateQuery,{new:true})
//       return c.json(updatedCrea, 201)
//     } catch (error) {
//       return c.json(error._message,400)
//     }
//   }else{
//     return c.text('error wrong id',400)
//   }
  
// })

// api.patch('/:id', async (c) => {
//   const {id} = c.req.param()
//   const body = await c.req.json()
//   const {categories=false,...rest} = body

//   if(isValidObjectId(id)){
//     const query = {
//       _id:id
//     }
//     const queryUpdate: Record<string, object> = {}
//     queryUpdate['$set'] = {
//       ...rest
//     }
//     if(categories){
//       queryUpdate['$addToSet'] = {
//         categories
//       }
//     }
//     try {
//       const updatedCrea = await Creation.findOneAndUpdate(query,queryUpdate,{new:true})
//       return c.json(updatedCrea, 201)
//     } catch (error) {
//       return c.json(error._message,400)
//     }
//   }else{
//     return c.text('error wrong id',400)
//   }
  
// })

// api.get('/:id', async (c) => {
//   const {id} = c.req.param()
//   if(isValidObjectId(id)){
//     const oneCrea = await Creation.findOne({_id:id})
//     return c.json(oneCrea)
//   }else{
//     return c.text('error wrong id',400)
//   }
// })


// api.delete('/:id', async (c) => {
//   const {id} = c.req.param()
//   if(isValidObjectId(id)){
//     const toDel = await Creation.deleteOne({_id:id})
//     return c.json(toDel,200)
//   }else{
//     return c.text('error wrong id',400)
//   }
// })

export default api