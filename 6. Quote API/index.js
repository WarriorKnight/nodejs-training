const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Connection error:', err));

// mongoose.connection.once('open', async () => {
//     try {
//         await mongoose.connection.db.dropDatabase();
//         console.log('🗑️ Database cleared');
//     } catch (err) {
//         console.error('❌ Error clearing database:', err);
//     }
// });

const quotesRouter = require('./routes/quotes');
app.use('/api/quotes', quotesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));