import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createTime: String,
});

export default db.model('User', UserSchema);
