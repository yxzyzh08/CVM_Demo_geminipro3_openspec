import app from './app';
import cors from 'cors';

const PORT = process.env.PORT || 3001;

// Enable CORS for development
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
