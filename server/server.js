import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import { serve } from 'inngest/express';
import { inngest, functions } from './inngest/index.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// API Routes
app.get('/', (req, res) => res.send('Server is live !'));
app.use('/api/inngest', serve({ client: inngest, functions }));

// Keep track of DB connection per execution environment
let _dbConnected = false;
async function ensureDB() {
	if (!_dbConnected) {
		await connectDB();
		_dbConnected = true;
	}
}

// Vercel (and other serverless) expect a default export handler
export default async function handler(req, res) {
	try {
		await ensureDB();
		return app(req, res);
	} catch (err) {
		console.error('Handler error:', err);
		res.status(500).send('Internal Server Error');
	}
}