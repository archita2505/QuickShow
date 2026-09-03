import React, { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'
import { useAppContext } from '../context/AppContext'

const Releases = () => {
  const { axios, shows } = useAppContext()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const { data } = await axios.get('/api/show/now-playing')
        if (data.success) {
          setMovies(data.movies)
        } else {
          setError(true)
        }
      } catch (requestError) {
        console.error(requestError)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchReleases()
  }, [axios])

  if (loading) {
    return <div className='flex items-center justify-center min-h-screen'>Loading releases...</div>
  }

  return movies.length > 0 && !error ? (
    <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-16 xl:px-20 overflow-hidden min-h-[80vh]'>
      <BlurCircle top='150px' left='0px' />
      <BlurCircle bottom='100px' right='50px' />
      <h1 className='text-lg font-medium my-4'>New Releases</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {movies.map(movie => (
          <MovieCard
            movie={movie}
            key={movie.id}
            isAvailable={shows.some(show => String(show._id) === String(movie.id))}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className='flex items-center justify-center min-h-screen'>
      <h1 className='text-3xl font-bold text-center'>Unable to load new releases</h1>
    </div>
  )
}

export default Releases