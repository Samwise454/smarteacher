import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from './Nav';

const Complete = () => {
  const [url, setUrl] = useState(window.location.href);
  const [user, setUser] = useState({
    surname: "",
    firstname: ""
  });

  //334712

  useEffect(() => {
    //split url 
    let urlSplit = url.split("?");
    let userData = urlSplit[1].split("_");

    if (!urlSplit[1].includes("_")) {
      setUser({
        surname: "User1",
        firstname: "Data1"
      })
    }
    else {
      setUser({
        surname: userData[0],
        firstname: userData[1]
      })
    }
  }, []);

  return (
    <div>
      <Nav></Nav>

      <div className='bg-gray-100 shadow-sm flex text-center h-auto flex-col m-5 p-3'>
            <h2 className='text-xl text-green-600'>
                <b>Data Submitted Successfully!!</b>
            </h2>

            <div>
              <p className='leading-loose'>
                Hey {user.surname + " " + user.firstname}, kindly screenshot and 
                keep this page for proof. <br />

                Thank You.
              </p>
            </div>
      </div>
    </div>
  )
}

export default Complete

