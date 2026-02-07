import React, { useState } from 'react'
import { dummyTrailers } from '../assets/assets'
import BlurCircle from './BlurCircle'
import { PlayCircleIcon } from 'lucide-react'

const TrailerSection = () => {

    const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0])
    const [playing, setPlaying] = useState(false)

    function getYouTubeId(url){
      try{
        const u = new URL(url)
        if(u.hostname.includes('youtu.be')) return u.pathname.slice(1)
        if(u.searchParams.has('v')) return u.searchParams.get('v')
      }catch(e){ }
      const m = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/)
      return m ? m[1] : null
    }

  return (
    <div className="p-6 md:px-16 lg:px-24 xl:px-44 py-20 ">
       <p className='text-gray-300 font-medium text-lg max-w-960px mx-auto'>Trailers</p>

       <div className='relative mt-6'>
        <BlurCircle top='-100px' right='-100px'/>
        {/* Thumbnail + iframe embed fallback (more reliable than an external player lib) */}
        <div style={{ width: '100%', maxWidth: '960px' }} className="mx-auto relative z-10">
          {!playing ? (
            <button
              aria-label="Play trailer"
              onClick={() => setPlaying(true)}
              className="w-full h-540px block p-0 border-0 bg-transparent cursor-pointer"
            >
              <img src={currentTrailer.image} alt="trailer poster" className="w-full h-full object-cover rounded" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
                  <PlayCircleIcon strokeWidth={1.6} className='w-10 h-10 text-white' />
                </div>
              </div>
            </button>
          ) : (
            (() => {
              const id = getYouTubeId(currentTrailer.videoUrl)
              if(!id) return <div className="w-full h-540px bg-black text-white flex items-center justify-center">Video unavailable</div>
              const src = `https://www.youtube.com/embed/${id}?autoplay=1&controls=1&rel=0&modestbranding=1`
              return (
                <iframe
                  title="trailer-player"
                  src={src}
                  width="100%"
                  height="540"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )
            })()
          )}
        </div>
       </div>

       <div className='group grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto'>
        {dummyTrailers.map((trailer)=>(
          <div
            key={trailer.image}
            className='relative group-hover:not-hover:opacity-50 hover:-translate-y-1 duration-300 transition max-md:h-60 md:max-h-60 cursor-pointer'
            onClick={() => { setCurrentTrailer(trailer); setPlaying(true) }}
          >
            <img src={trailer.image} alt="trailer" className='rounded-lg w-full h-full object-cover brightness-75'/>
            <PlayCircleIcon strokeWidth={1.6} className='absolute top-1/2 left-1/2 w-5 md:w-8 h-5 md:h-12 transform -translate-x-1/2 -translate-y-1/2'/>
          </div>
        ))}
      </div>

    </div>
  )
}

export default TrailerSection