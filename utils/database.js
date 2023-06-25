import mongoose from 'mongoose';

let isConnected = false; //track the connection status

//create the connection to the database
export const connectToDb = async ()=>{
    mongoose.set('strictQuery',true); // This usually sets MongoDB options to avoid the warnings
    // if database is already connected
    if(isConnected){
        console.log('MongoDB is already connected!');
        return; //already connected. so stopping it from running this function
    }

    //if not connected.
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            //options object
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true
        console.log('MongoDB connected')
    }catch(error){
        console.log(error)
    }
}

