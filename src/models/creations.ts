import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.

interface iUser {
  lastName:string;
  firstName:string;
}

interface ICreations {
  imgUri: string;
  prompt: string;
  categories?: Array<string>;
  publicationDate?:Date;
  aiEngine?:string;
  author:iUser
}

// 2. Create a Schema corresponding to the document interface.
const creationSchema = new Schema<ICreations>({
  imgUri: { type: String, required: true, lowercase: true, trim: true },
  prompt: { type: String, required: true },
  categories: {type:[String]},
  publicationDate:{type:Date,default:Date.now},
  aiEngine:String,
  author:{type:Schema.Types.Mixed}
});

// 3. Create a Model.
const Creation = model<ICreations>('creations', creationSchema);

export {Creation}