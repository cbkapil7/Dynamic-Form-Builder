
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import formRoutes from './Routes/formRoutes.js';


const app = express();


const mongoURI= 'mongodb+srv://kapil07:kapil07@cluster0.bvak56y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/form', formRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
