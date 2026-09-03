import 'dotenv/config';
import mongoose from 'mongoose';
const uri = process.env.MONGODB_URI?.trim();
console.log('mongo uri:', uri);
mongoose.connect(`${uri}/quickshow`, {serverSelectionTimeoutMS: 10000})
  .then(() => { console.log('connected'); process.exit(0); })
  .catch((err) => { console.error('connect failed:', err.message); process.exit(1); });
