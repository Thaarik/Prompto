import {Schema, model, models} from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'], //unique is true or display the message
        required: [true, 'Email is required!'],//required is true. if not, display the right message.
    },
    username:{
        type: String,
        required:[true,'Username is required!'],
        match: [/^[a-zA-Z0-9._ ]+$/, "Username invalid, it should contain 8-30 alphanumeric letters and be unique!"],
    },
    image:{
        type: String,
    }
})

//The 'models' object is provided by the Mongoose library and stores all the registered models.
//If a model name 'User' already exists in the 'models' object, it assigns that existing model to the 'User' variable.
//This prevents redefining the model and ensures that the existing model is reused.
//If a model name 'User' does not exist in the 'models' object, the 'model' function from mongoose is called to create a new model.
//The newly created model is then assigned to the 'user variable.

// in express.js:
// const user = model('User',UserSchema)

//in next.js
const User = models.User || model('User', UserSchema);

export default User;