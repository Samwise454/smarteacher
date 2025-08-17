import React, { useState } from 'react';
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';

const Control = () => {
    const url = 'https://smart.esbatech.org/control.php';
    
    const [formInput, setFormInput] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleFormInput = (e) => {
        let userId = e.target.id;
        let userData = e.target.value;

        if (userId === "uname") {
            setFormInput({...formInput, username : userData});
        }
        else if (userId === "pword") {
            setFormInput({...formInput, password : userData});
        }
    }

    const handleFormError = () => {
        let controlMsg = document.querySelector("#controlMsg");
        controlMsg.style.display = "flex";
        setTimeout(() => {
            controlMsg.style.display = "none";
        }, 4000);
    }

    const handleForm = (e) => {
        e.preventDefault();
        let loader = document.querySelector("#loader4");
        loader.style.display = "flex";

        if (formInput.username.length !== 0 && formInput.password.length !== 0) {
            //process data
            fetch(url, {
                method: "POST",
                body: JSON.stringify(formInput)
            })
            .then(response => {
                if (!response.ok) {
                    handleFormError();
                }
                return response.json(); 
            })
            .then(data => {
                // Process the fetched image first and then send the form
                let code = data.code;
                let pKey = data.msg;
                
                if (code === "sw200") {
                    //success
                    //let's split msg
                    navigate('/Admin');
                    localStorage.setItem("adForm", pKey);
                }
                else {
                    //error
                    handleFormError();
                }
            })
            .catch(error => {
                handleFormError();
            });
            loader.style.display = "none";
        }
        else {
            handleFormError();
        }
    }

  return (
    <div className='mainForm'>
        <Nav></Nav>

        <div className='bg-gray-100 shadow-sm flex text-center h-auto flex-col m-5 p-3'>
            <h2 className='text-xl text-red-600 mb-10 mt-8'>
                <b>Teacher's Data Dashboard</b>
            </h2>

            <div className='mb-80'>
                <p className='leading-loose text-center mt-5'>
                    Sign in with authorized login details.
                </p>

                <form onSubmit={handleForm} className='bg-gray-100 flex justify-center items-center h-auto py-2 flex-col m-3 mb-20'>
                    <section>
                        <input type="text" name='uname' id='uname' 
                            placeholder='Username'
                            className='mainFormInput bg-white mb-7 shadow-md' 
                            onChange={handleFormInput}   
                        />

                        <input type="password" name='pword' id='pword' 
                            placeholder='Password'
                            className='mainFormInput bg-white mb-7 shadow-md' 
                            onChange={handleFormInput}   
                        />
                    </section>

                    <div id="controlMsg" className='text-red-600 text-sm mb-3'>
                        Contact Developer
                    </div>

                    <section id='loader4' className='mt-2 mb-6 flex align-center justify-center'>
                        <span className="loader"></span>
                    </section>

                    <button className='bg-green-700 text-white py-3 px-8 rounded-md text-lg cursor-pointer'>
                        Login
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Control
