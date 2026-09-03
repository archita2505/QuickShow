import { clerkClient } from '@clerk/express';
import Booking from '../models/Booking.js';
import Movie from '../models/Movie.js';

//API controller function to get user bookings
export const getUserBookings = async (req, res) => {
    try {
        const user = req.auth().userId;

        const bookings = await Booking.find({user}).populate({
            path: "show",
            populate: {path: "movie"}
        }).sort({createdAt: -1})
        res.json({success: true, bookings})
    } catch (error) {
        console.error(error.message);
        res.json({success: false, message: error.message});
    }
}

//API controller function to update favourite movie in Clerk User Metadata
export const updateFavourite = async (req, res) => {
    try {
        const {movieId} = req.body;
        if(!movieId){
            return res.status(400).json({success: false, message: "Movie id is required"});
        }

        const userId = req.auth().userId;
        const user = await clerkClient.users.getUser(userId);
        const favourites = user.privateMetadata?.favourites || [];
        const updatedFavourites = favourites.includes(movieId)
            ? favourites.filter(item => item !== movieId)
            : [...favourites, movieId];

        await clerkClient.users.updateUserMetadata(userId, {
            privateMetadata: {
                ...user.privateMetadata,
                favourites: updatedFavourites
            }
        });

        res.json({success: true, message: "Favourite movies updated successfully."})
    } catch (error) {
        console.error(error.message);
        res.json({success: false, message: error.message});
    }
}

export const getFavourites = async (req, res) => {
    try {
        const user = await clerkClient.users.getUser(req.auth().userId);
        const favourites = user.privateMetadata.favourites || [];

        //Getting movies from database
        const movies = await Movie.find({_id: {$in: favourites}})
        res.json({success: true, movies})
    } catch (error) {
        console.error(error.message);
        res.json({success: false, message: error.message});
    }
}