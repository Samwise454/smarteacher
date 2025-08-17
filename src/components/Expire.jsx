import React from 'react';
import Nav from './Nav';

const Expire = () => {
  return (
    <div className='mainForm1'>
      <Nav></Nav>

      <div className='bg-gray-100 shadow-sm flex text-center h-auto flex-col m-5 p-3'>
            <h2 className='text-xl text-red-600 mb-10'>
                <b>Form Submission Suspended!!</b>
            </h2>

            <div className='mb-80'>
              <p className='leading-loose text-left'>
                Form submission has been suspended, to get 
                more information about this development, contact the 
                coordinator.
              </p>

              {/* <section className='mt-15'>
                <button className='bg-green-700 text-white py-3 px-8 rounded-md text-lg'>
                    Complain
                </button>
              </section> */}
            </div>
      </div>
    </div>
  )
}

export default Expire
