import React from 'react'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'
import { useAppContext } from '../context/AppContext'
import { useSearchParams } from 'react-router-dom'

const Movies = () => {

  const {shows} = useAppContext();
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search')?.trim().toLowerCase() || ''
  const filteredShows = shows.filter(movie => movie.title.toLowerCase().includes(search))

  return filteredShows.length > 0 ?(
    <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-16 xl:px-20 overflow-hidden min-h-[80vh]'>
      <BlurCircle top='150px' left='0px'/>
      <BlurCircle bottom='100px' right='50px'/>
      <h1 className='text-lg font-medium my-4'>{search ? `Search results for "${searchParams.get('search')}"` : 'Now Showing'}</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {filteredShows.map((movie) => (
          <MovieCard movie={movie} key={movie._id}/>
        ))}
      </div>
    </div>
  ) : (
    <div className='flex flex-cols items-center justify-center h-screen'>
      <h1 className='text-3xl font-bold text-center'>{search ? 'No matching movies found' : 'No movies available'}</h1>
    </div>
  )
}

export default Movies