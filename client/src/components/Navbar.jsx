import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {

 const [isOpen,setIsOpen] = useState(false) 
 const [isSearchOpen, setIsSearchOpen] = useState(false)
 const [searchText, setSearchText] = useState('')
 const {user} = useUser()
 const {openSignIn} = useClerk()
 const navigate = useNavigate()

 const {favouriteMovies} = useAppContext();

 const handleSearch = (event) => {
   event.preventDefault()
   const search = searchText.trim()
   navigate(search ? `/movies?search=${encodeURIComponent(search)}` : '/movies')
   setIsSearchOpen(false)
   setSearchText('')
 }

  return (
    <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5'>
      
      <Link to='/' className='max-md:flex-1'>
        <img src={assets.logo} alt="" className='w-45 h-15'/>
      </Link>

      <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-10 md:px-12 py-3 max-md:h-screen md:rounded-full backdrop:blur bg-black/70 md:bg-white/10  overflow-hidden transition-[width] duration-300 md:text-[20px] ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>
        
        <XIcon className='md:hidden absolute top-6 right-6 w-8 h-8 cursor-pointer ' onClick={() => setIsOpen(prev => !prev)}/>
 
        <Link onClick={() => { window.scrollTo(0, 0); setIsOpen(false) }} to='/' >Home</Link>
        <Link onClick={() => { window.scrollTo(0, 0); setIsOpen(false) }} to='/movies' >Movies</Link>
        {/* <Link onClick={() => { window.scrollTo(0, 0); setIsOpen(false) }} to='/' >Theaters</Link> */}
        <Link onClick={() => { window.scrollTo(0, 0); setIsOpen(false) }} to='/releases' >Releases</Link>
        {favouriteMovies.length > 0 && <Link onClick={() => { window.scrollTo(0, 0); setIsOpen(false) }} to='/favourites' >Favourites</Link>}
      </div>

      <div className='flex items-center gap-8'>
        {isSearchOpen ? (
          <form onSubmit={handleSearch} className='max-md:hidden flex items-center gap-2 border-b border-gray-400 px-2 py-1'>
            <input
              autoFocus
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder='Search movies'
              aria-label='Search movies'
              className='w-40 bg-transparent outline-none text-sm'
            />
            <XIcon onClick={() => { setIsSearchOpen(false); setSearchText('') }} className='w-5 h-5 cursor-pointer' />
          </form>
        ) : (
          <SearchIcon onClick={() => setIsSearchOpen(true)} aria-label='Search movies' className='max-md:hidden w-7 h-7 cursor-pointer'/>
        )}
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