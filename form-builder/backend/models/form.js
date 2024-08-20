// models/form.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const FormSchema = new Schema({
    
  title: { type: String, required: true },
  inputs: [
    {
      type: { type: String, required: true },
      title: { type: String, required: true },
      placeholder: { type: String, required: true },
    },
  ],
});

export default mongoose.model('Form', FormSchema);
