import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    socialMedia:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    images:[
        {
            type:String,
        }
    ]
},{timestamps:true})

export const User=mongoose.model('User',userSchema);