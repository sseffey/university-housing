import mongoose from 'mongoose';

const buildingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    genderType: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },  

    totalFloors: {
        type: Number,
        required: true,
        min: 1
    }




}, {timestamps: true});

const Building = mongoose.model('Building', buildingSchema);
export default Building;
