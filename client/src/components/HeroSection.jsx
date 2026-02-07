import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


const HeroSection = () => {

    const navigate = useNavigate()
  return (
    <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen' >
        
        <img src={assets.marvelLogo} alt="" className="max-h-13 lg:h-13 mt-20"/>
        
        <h1 className='text-5xl md:text-[80px] md:leading-18 font-semibold max-w-125' >Guardians <br/> of the Galaxy</h1>

        <div className='flex items-centre gap-4 text-gray-300 md:text-[20px]' >
            <span>Action | Adventure | Sci-Fi</span>
            <div className='flex items-center gap-1'>
                <CalendarIcon className='w-4.5 h-4.5' /> 2018
            </div>
            <div className='flex items-center gap-1'>
                <ClockIcon className='w-4.5 h-4.5' /> 2h 8m
            </div>
         </div>    
            <div>
                <p className='max-w-125 text-gray-300 md:text-[20px]'>
                    In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.
                </p>
                <br/>
                <button onClick = {()=> navigate('/movies')}className='flex items-center gap-1 px-6 py-3 text-[20px] bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>
                    Explore Movies 
                    <ArrowRight className="w-5 h-5"/>
                </button>
            </div>
    </div>
  )
}

export default HeroSection