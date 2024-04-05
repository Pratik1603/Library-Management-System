import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
        type: String,
        required: true,
    
    },
    publisher: {
      type: String,
      required: true,
    },
    date:{
        type: String,
        required: true,
    },
    rating:{
      type: Array,
      default: [],
    },
    ratingOver:{
      type: Number,
      default:3
    },
    imageUrl: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    totalCopies: {
        type: Number,
        required: true,
    },
   
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;