const mongoose = require('mongoose');

const pageSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Workspace',
        required:true
    },
    blocks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Block',
        // not required cause new page will have zero blocks
    }]
},{
    timestamps:true
})


module.exports = mongoose.model('Page',pageSchema);