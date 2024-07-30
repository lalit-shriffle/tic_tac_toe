import React from 'react'

type Props = {
    children : React.ReactNode;
}

const Model = ({children}: Props) => {
  return (
    <div className='fixed h-screen bg-[rgba(255,255,255,.6)] left-0 top-0 w-full flex justify-center items-center'>
        <div className='bg-white p-4 shadow-sm shadow-black rounded-lg'>
            {children}
        </div>
    </div>
  )
}

export default Model