import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {

 const [isOpen,setIsOpen] = useState(false) 
 const {user} = useUser()
 const {openSignIn} = useClerk()
 const navigate = useNavigate()

  return (
    <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5'>
      
      <Link to='/' className='max-md:flex-1'>
        <img src={assets.logo} alt="" className='w-45 h-15'/>
      </Link>

      <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-10 md:px-12 py-3 max-md:h-screen md:rounded-full backdrop:blur bg-black/70 md:bg-white/10  overflow-hidden transition-[width] duration-300 md:text-[20px] ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>
        
        <XIcon className='md:hidden absolute top-6 right-6 w-8 h-8 cursor-pointer ' onClick={() => setIsOpen(prev => !prev)}/>
 
        <Link onClick={() => { window.scrollTo(0, 0); setIsOpen(false) }} to='/' >Home</Link>
        <Link onClick={() => { window.scrollTo(0, 0); setIsOpen(false) }} to='/movies' >Movies</Link>
        <Link onClick={() => { window.scrollTo(0, 0); setIsOpen(false) }} to='/' >Theaters</Link>
        <Link onClick={() => { window.scrollTo(0, 0); setIsOpen(false) }} to='/' >Releases</Link>
        <Link onClick={() => { window.scrollTo(0, 0); setIsOpen(false) }} to='/favourites' >Favourites</Link>
      </div>

      <div className='flex items-center gap-8'>
        <SearchIcon className='max-md:hidden w-7 h-7 cursor-pointer'/>
        {
          !user ? (
            <button onClick={openSignIn} className='px-4 py-1 sm:px-10 sm:py-4 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>Login</button>
          ) : (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label='My Bookings' onClick={() => navigate('/my-bookings')} labelIcon={<TicketPlus width={15} />} />
              </UserButton.MenuItems>
            </UserButton>
          )
        }
        
      </div>

      <MenuIcon className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer'  onClick={() => setIsOpen(prev => !prev)}/>
    </div>
  )
}

export default Navbar