import React from 'react'

const Title = ({ text1,text2 }) => {
  return (
    <h1 className='font-medium text-[30px] pt-10'>
        {text1} <span className="underline text-primary">
        {text2}</span>
    </h1>
  )
}

export default Title