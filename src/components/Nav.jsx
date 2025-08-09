import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className='flex flex-row p-3 relative'>
      <section>
        <Link to="/"><img src="/logo.jpeg" alt="Page Logo" className='w-16 rounded-md'/></Link>
        {/* <Link to="/"><img src="/an_logo.jpeg" alt="Page Logo" className='w-16 rounded-full'/></Link> */}
      </section>

      {/* <section className='absolute top-0 right-0 mt-3 mr-3'>
        <Link to="/"><img src="/subeb_logo.png" alt="Page Logo" className='w-16 rounded-md'/></Link>
      </section> */}
    </div>
  )
}

export default Nav
