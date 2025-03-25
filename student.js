const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/studentId'); 

const app = express();
app.use(express.json()); 





app.post('/students', async (req, res) => {
  try {
  
    const student = await Student.create(req.body);

    
    res.status(201).json({
      message: 'Student added successfully!',
      studentId: student._id,
    });
  } catch (error) {
    if (error.code === 11000) {
      
      res.status(400).json({ message: 'Duplicate rollNo/studentId detected.' });
    } else {
      
      res.status(500).json({ message: error.message });
    }
  }
});


mongoose.connect('mongodb+srv://gowtham:6qxWHIWLico7RYVL@studentsdatabase.jjbya.mongodb.net/STUDENT-DATABASE?retryWrites=true&w=majority&appName=studentsDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas!');

  app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
  });

}).catch(err => {
  console.error('Database connection error:', err);
});
