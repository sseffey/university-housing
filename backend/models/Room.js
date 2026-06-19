import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    buildingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building',
        required: true
    },

    roomNumber: {
        type: String,
        required: true,
        trim: true,   
    },

    floor: {
        type: Number,
        required: true,
        min: 1
    },  

    capacity: {
        type: Number,
        required: true,
        min: 1
    },

    occupiedBeds: {
        type: Number,
        default: 0,
        validate:{
            validator: function(value){
                return value <= this.capacity;
            },
            message: 'Occupied beds cannot exceed room capacity'
        }
    }
}, { timestamps: true });

roomSchema.index({ buildingId: 1, roomNumber: 1 }, { unique: true });

const Room = mongoose.model('Room', roomSchema);
export default Room;
