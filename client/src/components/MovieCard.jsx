import { StarIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import timeFormat from '../lib/timeFormat'
import { useAppContext } from '../context/AppContext'

const MovieCard = ({movie, isAvailable = true}) => {
        const navigate = useNavigate()
        const {image_base_url} = useAppContext();
        const movieId = movie?._id || movie?.id;

        const releaseYear = movie?.release_date ? new Date(movie.release_date).getFullYear() : ''
        const genres = (movie?.genres || []).slice(0,2).map(genre => genre.name).join(' | ')
        const rating = typeof movie?.vote_average === 'number' ? movie.vote_average.toFixed(1) : '0.0'

    return (
    <div className='flex flex-col justify-between p-3 bg-gray-800 rounded-2xl hover:translate-y-1 transition duration-300 w-full'>
                <img onClick={() => { if(isAvailable){ navigate(`/movies/${movieId}`); window.scrollTo(0,0); } }}
                src={image_base_url + movie?.backdrop_path} alt="" className={`rounded-lg h-52 w-full object-cover object-bottom-right ${isAvailable ? 'cursor-pointer' : ''}`} />

                <p className='font-semibold mt-2 truncate'>{movie?.title}</p>

                <p className='text-sm text-gray-400 mt-2'>{releaseYear} ● {genres} ● {timeFormat(movie?.runtime)}</p>
        
        <div className='flex items-center justify-between mt-4 pb-3'>
            <button disabled={!isAvailable} onClick={() => { navigate(`/movies/${movieId}`); window.scrollTo(0,0); }} className={`px-4 py-2 text-xs transition rounded-full font-medium ${isAvailable ? 'bg-primary hover:bg-primary-dull cursor-pointer' : 'bg-gray-600 text-gray-300 cursor-not-allowed'}`}>
                {isAvailable ? 'Buy Tickets' : 'Coming Soon'}
            </button>
            <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1" >
                <StarIcon className="w-4 h-4 text-primary fill-primary" />
                {rating}
            </p>
        </div>
    
    </div>
  )
}

export default MovieCard