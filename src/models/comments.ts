import { Schema, model, Types  } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.

interface iUser {
  lastName:string;
  firstName:string;
}

export interface IComment {
  comment: string;
  parentCreationRef:Types.ObjectId;
  commentDate?:Date;
  author:iUser
}

// 2. Create a Schema corresponding to the document interface.
const commentSchema = new Schema<IComment>(
  {
    comment: { type: String, trim: true },
    parentCreationRef: { 
      type: Schema.Types.ObjectId, 
      ref: 'creations'
    },
    commentDate:{type:Date,default:Date.now},
    author:{type:Schema.Types.Mixed}
},
{
  timestamps: true
}
);

// 3. Create a Model.
const Comment = model<IComment>('comments', commentSchema);

export {Comment}