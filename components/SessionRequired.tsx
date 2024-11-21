import React from 'react'

// This component is a placeholder for a component that requires a session to be present.
const SessionRequired = () => {
  return (
    <section className='main-container !min-h-[calc(100vh-62px)]'>
      <h1 className='heading'>Session Required</h1>
      <p className='text-white text-semibold '>Please sign in to continue</p>
    </section >
  )
}

export default SessionRequired