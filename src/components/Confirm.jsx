import React from 'react';
import Nav from './Nav';

const Confirm = () => {
  return (
    <div className='mainForm1'>
      <Nav></Nav>

      <div className='bg-gray-100 shadow-sm flex text-center h-auto flex-col m-5 p-3'>
            <h2 className='text-xl text-red-600 mb-10'>
                <b>Confirm Submission Status</b>
            </h2>

            <div className='mb-80'>
              <div className='leading-loose text-left'>
                <input type="tel"
                    className='' />
              </div>

              <section className='mt-15'>
                <button className='bg-green-700 text-white py-3 px-8 rounded-md text-lg'>
                    Confirm
                </button>
              </section>
            </div>
      </div>
    </div>
  )
}

export default Confirm
