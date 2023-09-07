import dotenv from 'dotenv';
import app from './app';
import './database';

dotenv.config();

const port = process.env.PORT || 8080;

app.listen(port);
console.log(`Server listen on port ${port}`);
