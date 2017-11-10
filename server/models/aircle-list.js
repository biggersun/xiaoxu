import mongoose from 'mongoose';

const { Schema } = mongoose;

const AircleListSchema = new Schema({
    title: String,
    description: String,
    author: String,
    publishTime: String,
    url: String,
    chip: [
        {
            name: String,
            index: Number,
        },
    ],
});

export default db.model('AircleList', AircleListSchema);
