import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../assets/assets'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import timeFormat from '../lib/timeFormat'
import { dateFormat } from '../lib/dateFormat'
import { useAppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'

const MyBookings = () => {

  const currency = import.meta.env.VITE_CURRENCY

   const {axios, getToken, user, image_base_url} = useAppContext();

  const [bookings,setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getMyBookings = async ()=>{
    try {
      const {data} = await axios.get('/api/user/bookings', {headers: {Authorization: `Bearer ${await getToken()}`}});

      if(data.success){
        setBookings(data.bookings)
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(()=>{
    if(user){
      getMyBookings()
    }
  },[user])

  return !isLoading ? (
    <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
      <BlurCircle top="100px" left="100px" />
      <div>
        <BlurCircle bottom="0px" left="600px" />
        <BlurCircle top="100px" left="1200px" />
        <BlurCircle bottom="0px" left="1800px" />
      </div>
      <h1 className='text-[25px] font-semibold mb-4'>My Bookings</h1>

      {bookings.map((item, index) => (
        <div key={index} className='flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-1000px'>
          <div className='flex flex-col md:flex-row '>
            <img src={image_base_url + item.show.movie.poster_path} alt="" className='md:max-w-100 aspect-video h-auto object-cover object-bottom rounded'/>
            <div className='flex flex-col p-4 pt-2'>
                <p className='text-[40px] font-semibold'>{item.show.movie.title}</p>
                <p className='text-gray-400 text-[20px]'>{timeFormat(item.show.movie.runtime)}</p>
                <p className='text-gray-400 text-[20px] mt-auto'>{dateFormat(item.show.showDateTime)}</p>
            </div> 
          </div>

          <div className='flex flex-col justify-center items-end text-right min-w-180px'>
            <div className='flex items-center gap-4 mb-3'>
              <p className='text-2xl font-semibold mr-3'>{currency}{item.amount}</p>
              {!item.isPaid && <Link to={item.paymentLink} className='bg-primary px-8 py-5 mb-3 text-xl rounded-full font-medium cursor-pointer'>Pay Now</Link>}
            </div> 
            <div className='text-20 space-y-1 mr-3'>
              <p><span className='text-gray-400 mr-2'>Total Tickets : </span>{item.bookedSeats.length}</p>
              <p><span className='text-gray-400 mr-2'>Seat Number : </span>{item.bookedSeats.join(", ")}</p>
            </div>
          </div>
        </div>
      ))}

    </div>
  ) : (
    <Loading/>
  )
}

export default MyBookings