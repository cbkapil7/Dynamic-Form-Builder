
import express from 'express';
import Form from '../models/form.js';

const router = express.Router();


router.post('/create', async (req, res) => {
  try {
    const { title, inputs } = req.body;
    const newForm = new Form({ title, inputs });
    await newForm.save();
    res.status(201).json(newForm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/forms', async (req, res) => {
  try {
    const forms = await Form.find();
    if (forms.length === 0) {
      return res.status(404).json({ message: 'No forms found' });
    }
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/view/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ message: 'Form not found' });
    res.json(form);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.put('/edit/:id', async (req, res) => {
  try {
    const { title, inputs } = req.body;
    const form = await Form.findByIdAndUpdate(req.params.id, { title, inputs }, { new: true });
    if (!form) return res.status(404).json({ message: 'Form not found' });
    res.json(form);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
