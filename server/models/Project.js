import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: {type : String, required: true},
    description : String,
    createdAt : {type: Date, default: Date.now},
    tasks : [{type: mongoose.Schema.Types.ObjectId,ref: 'Task'}]
})
const Project = mongoose.model('Project',projectSchema);
export default Project;