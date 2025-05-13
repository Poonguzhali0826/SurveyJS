const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.routes');
const { authenticate, authorizeRole } = require('./middleware/auth.middleware');
const app = express();

// Middleware
app.use(cors('*'));  // Enable CORS
app.use(bodyParser.json());  // Parse JSON request bodies
mongoose.connection.once('open', async () => {
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log("📂 Collections in DB:", collections.map(c => c.name));
});
app.use('/api/auth', authRoutes);
// MongoDB connection
mongoose.connect('mongodb+srv://apoonguzhali26:SmartWork_123@cluster0.8puchx8.mongodb.net/Embroider_Survey', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

const surveySchema = new mongoose.Schema({
  clientName: String,
  email: String,
  phone: Number,
  location: String,
  garmentType: String,
  quantity: String,
  sizes: String,
  colors: String,
  fabricType: String,
  hasDesign: String,
  fileFormats: String,
  printType: String,
  embroiderySize: String,
  estimatedBudget: String,
  specialInstructions:String,
  followUpTime:String,
  assignedSalesRep:String,
  printLocations: [String],
  eventDeadline: String,
  requireShipping: String,
  shippingAddress: String,
  surveyCreatedUsing: String,
  incoming_mail:[Object],
  reply_message: String,
  missing_fields:[String],
  submittedAt: {
    type: Date,
    default: Date.now
  }
});
const SurveyResponse = mongoose.model('SurveyResponse', surveySchema);
console.log(
  'SurveyResponse model created successfully'
);
const createSurveySchema = new mongoose.Schema({
  data: Object,
  createdAt: { type: Date, default: Date.now }
});
const CreateSurvey = mongoose.model('CreateSurvey', createSurveySchema);
console.log(
  'CreateSurvey model created successfully'
);

//POST API
app.post('/api/createSurvey', async (req, res) => {
  try {
    const newResponse = new CreateSurvey({ data: req.body });
    // Save the new survey to the database
    const savedSurvey = await newResponse.save();
    res.status(201).send({ message: 'Survey questions created successfully!' , surveyId: savedSurvey._id});
  } catch (error) {
    res.status(500).send({ error: 'Error saving survey questions' });
  }
});
// PUT /api/createSurvey/:id
app.put('/api/createSurvey/:id', async (req, res) => {
  try {
    const surveyId = req.params.id;  // Get the surveyId from the URL
    const updatedData = req.body;    // Get the updated data from the request body

    // Find the survey by ID and update its data
    const updatedSurvey = await CreateSurvey.findByIdAndUpdate(surveyId, { data: updatedData }, { new: true });

    if (!updatedSurvey) {
      return res.status(404).send({ error: 'Survey not found' }); // If no survey is found, return 404
    }

    // Send back a success message with the updated surveyId
    res.status(200).send({ message: 'Survey updated successfully!', surveyId: updatedSurvey._id });
  } catch (error) {
    res.status(500).send({ error: 'Error updating survey questions' });  // Handle server errors
  }
});

//GET API
app.get('/api/createsurvey', async (req, res) => {
  try {
    const surveys = await CreateSurvey.find().sort({ createdAt: -1 });
    res.status(200).json(surveys);
  } catch (error) {
    console.error('Error fetching surveys:', error);
    res.status(500).json({ error: 'Failed to fetch surveys' });
  }
});

// Get survey by ID (added a new route to load saved survey)
app.get('/api/createSurvey/:surveyId', async (req, res) => {
  try {
    const surveyId = req.params.surveyId;
    const survey = await CreateSurvey.findById(surveyId);

    if (!survey) {
      return res.status(404).send({ error: 'Survey not found' });
    }

    res.status(200).send({ surveyJson: survey.data });
  } catch (error) {
    res.status(500).send({ error: 'Error loading survey' });
  }
});

// POST API
app.post('/api/survey', async (req, res) => {
  try {
    const newResponse = new SurveyResponse(req.body);
    await newResponse.save();
    res.status(201).send({ message: 'Survey saved successfully!' });
  } catch (error) {
    res.status(500).send({ error: 'Error saving survey data' });
  }
});

app.get('/api/survey', async (req, res) => {
  try {
    const surveys =  await SurveyResponse.find().sort({ submittedAt: -1 })
    res.status(200).json(surveys);
  } catch (error) {
    console.error("Error fetching surveys:", error);
    res.status(500).json({ error: 'Failed to fetch surveys' });
  }
});
app.get('/api/survey/:id', async (req, res) => {
  try {
    console.log('Fetching survey with ID:', req.params);
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send('Invalid survey ID');
    }

    const data = await SurveyResponse.findById(id);
    if (!data) return res.status(404).send('Survey not found');

    res.json(data);
  } catch (err) {
    console.error('Error fetching survey data:', err);
    res.status(500).send('Error fetching survey data');
  }
});

app.get('/api/admin-dashboard', authenticate, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Welcome, admin!', user: req.user });
});

// Example route: Customer only
app.get('/api/customer-dashboard', authenticate, authorizeRole('customer'), (req, res) => {
  res.json({ message: 'Welcome, customer!', user: req.user });
});




// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
