import express from 'express';
import { createBooking, getOcupiedSeats } from '../controllers/bookingController.js';

const bookingRouter = express.Router();


bookingRouter.post('/create', createBooking);
bookingRouter.get('/seats/:showId', getOcupiedSeats);

export default bookingRouter;