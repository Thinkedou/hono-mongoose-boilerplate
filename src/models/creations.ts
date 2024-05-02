import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.

interface iUser {
  lastName:string;
  firstName:string;
}

export interface ICreations {
  imgUri: string;
  prompt: string;
  categories?: Array<string>;
  publicationDate?:Date;
  aiEngine?:string;
  author:iUser,
  comments:Array<object>
}

// 2. Create a Schema corresponding to the document interface.
const creationSchema = new Schema<ICreations>(
  {
    imgUri: { type: String, required: [true, 'imgUri is mandatory'], lowercase: true, trim: true },
    prompt: { type: String, required: true },
    categories: {type:[String]},
    publicationDate:{type:Date,default:Date.now},
    aiEngine:String,
    comments:{type:[Schema.Types.Mixed]},
    author:{type:Schema.Types.Mixed}
},
{
  timestamps: true
}
);





// 3. Create a Model.
const Creation = model<ICreations>('creations', creationSchema);

export {Creation}