import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      required: true,
    },
    librarianId:{
        type: String,
        required: true,
    },
    patronId: {
        type: String,
        required: true,
    },
    isApproved:{
        type:Boolean,
        required:true,
    },
    issuePeriod:{
        type:Number,
        required:true,
    },
    issueRequestedDate:{
        type: String,
      
    },
    issueApprovedDate:{
        type: String,
       
    },
    bookReturnDateExpec:{
        type: String,
        
    },
    bookReturnedDate:{
        type: String,
    },
    isBookRetn:{
        type: Boolean,
        
    },
    issueClosed:{
        type: Boolean,
        required :true,
    },
    amountPaid:{
        type:Number,
        required:true,
    },
    books:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    }],
    librarian:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    patron:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]


  },
  { timestamps: true }
);

const Issue = mongoose.model('Issue', issueSchema);

export default Issue;