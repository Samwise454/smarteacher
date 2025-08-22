import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from './Nav';

const Home = () => {
    const url = 'https://smart.esbatech.org/login.php';
    const [tCode, setTcode] = useState({
        code1: "04",
        code2: "",
        code3: "",
        code4: ""
    });
    const [btnContent, setBtnContent] = useState("Submit");
    const [btnClass, setBtnClass] = useState("bg-gradient-to-b from-yellow-600 to-black px-6 py-3 mt-10 mb-20 text-white rounded-md cursor-pointer outline-none border-none");
    const badSubmit = "bg-red-600 px-6 py-3 mt-10 mb-20 text-white rounded-md cursor-pointer";
    const [diffTime, setDiffTime] = useState({
        day: "-",
        hour: "-",
        min: "-",
        sec: "-"
    });

    const [teCode, setTeCode] = useState(localStorage.getItem("smart"));
    const navigate = useNavigate();

    const resetBtn = (btncontent, btnclass) => {
        setBtnContent(btncontent);
        setBtnClass(btnclass);

        setTimeout(() => {
            setBtnContent("Submit");
            setBtnClass("bg-gradient-to-b from-yellow-600 to-black px-6 py-3 mt-10 mb-20 text-white rounded-md cursor-pointer outline-none border-none");
        }, 5000);
    }
    const [expire, setExpire] = useState(false);

    const handleInput = (e) => {
        let id = e.target.id;
        // let tid1 = document.querySelector("#tid1");
        let tid2 = document.querySelector("#tid2");
        let tid3 = document.querySelector("#tid3");
        let tid4 = document.querySelector("#tid4");

        if (id === "tid2" && tid2.value.length === 2) {
            tid3.focus();
            setTcode({...tCode, code2 : tid2.value});
        }
        else if (id === "tid3" && tid2.value.length === 2 && tid3.value.length === 2) {
            tid4.focus();
            setTcode({...tCode, code3 : tid3.value});
        }
        else if (id === "tid4" && tid2.value.length === 2 && tid3.value.length === 2 && tid4.value.length > 2) {
            setTcode({...tCode, code4 : tid4.value});
        }
    }

    const handle_form = (e) => {
        e.preventDefault();
        localStorage.clear("smart");
        let loader = document.querySelector("#loader1");
        loader.style.display = "flex";

        const hide_loader = () => {
            loader.style.display = "none";
        }

        //check code to match this 02-17-20-008
        if (tCode.code1.length === 0 || tCode.code2.length === 0 || tCode.code3.length === 0 || tCode.code4.length === 0) {
            resetBtn("Empty or invalid data!!", badSubmit);
            hide_loader();
        }
        else {
            //let's gather the code together
            let allCode = tCode.code1 + "-" + tCode.code2 + "-" + tCode.code3 + "-" +tCode.code4;

            //validate data and navigate appriopriately
            if (allCode.length < 12) {
                resetBtn("Invalid code!!", badSubmit);
            }
            else {
                //let's break down the voter code into and array
                let vCodeArray = allCode.split("-");//use later

                if (vCodeArray.length !== 4) {
                    //means - was not used therefore, invalid array
                    resetBtn("Invalid code!!", badSubmit);
                }
                else {
                    // 09-08-23-008
                    //send to server

                    // if (teCode == null) {
                        //no code yet in localtorage
                        fetch(url, {
                            method: "POST",
                            body: JSON.stringify(allCode)
                        })
                        .then(response => {
                            // Check if the response was successful (e.g., status code 200-299)
                            if (!response.ok) {
                                hide_loader();
                                resetBtn("Error Processing!!", badSubmit);
                            }
                            // Parse the response body as JSON
                            return response.json(); 
                        })
                        .then(data => {
                            // Process the fetched data
                            let tCode = data.msg;
                            //store in local storage
                            hide_loader();
                            localStorage.setItem("smart", tCode);//session data
                            navigate('/Form');
                        })
                        .catch(error => {
                            // Handle any errors during the fetch operation
                            hide_loader(loader);
                            resetBtn("Error Processing!!", badSubmit);
                        });
                    // }
                    // else {
                    //     //code in localStorage
                    //     navigate('/Form');
                    // }
                }
            }
        }
    }

    useEffect(() => {
        let pageLoader = document.querySelector('#loader3');
        pageLoader.style.display = "flex";

        if (expire === true) {
            navigate("/Expire");
        }
        else {
            let targetDate = new Date("Aug 31, 2025 23:00:00").getTime();

            //update the countdown every second 
            let update = setInterval(() => {
                //today's date 
                let now = new Date().getTime();
                let distance = targetDate - now;

                //time calculations for days, hours, minutes and seconds
                let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);

                //push result to state
                setDiffTime({
                    day: days,
                    hour: hours,
                    min: mins,
                    sec: seconds
                });

                //disable form when timer runs out
                if (distance < 0) {
                    clearInterval(update);
                    setExpire(true);
                }
                pageLoader.style.display = "none";
            }, 1000);
        }
    }, [expire]);
    

  return (
    <div className='mainForm1 relative'>
      <Nav></Nav>

        {/* <section className='absolute top-0 right-0 bg-green-800 rounded-md text-white mt-5 mr-4 py-2 px-5'>
            <Link to={"/Confirm"}><button>Confirm Status</button></Link>
        </section> */}

        <section id='loader3' className='mt-8 relative'>
            <section className='fixed top-0 left-0 bg-white w-full h-screen z-10 flex align-center justify-center'>
                <span className="loader mt-90"></span>
            </section>
        </section>

        <p className='flex align-center justify-center mt-8 text-black text-xl'>
            The form closes in
        </p>
      <div className="flex align-center justify-center flex-row mt-2 mx-2" id='countdownTimer'>
        <p id="days" className='relative shadow-md rounded-md py-2 pb-6 px-4 w-max mr-3'>
            <b className='text-xl text-red-600'>{diffTime.day}</b>
            <i className='absolute top-0 left-0 mt-9 flex ml-1 text-sm'>
                {diffTime.day > 1 ?
                    "Days"
                :
                    "Day"
                }
            </i>
        </p>
        
        <p id="hours" className='relative shadow-md rounded-md py-2 pb-6 px-4 w-max mr-3'>
            <b className='text-xl text-red-600'>{diffTime.hour}</b>
            <i className='absolute top-0 left-0 mt-9 ml-4 text-sm'>
                {diffTime.hour > 1 ?
                    "Hrs"
                :
                    "Hr"
                }
            </i>
        </p>

        <p id="minutes" className='relative shadow-md rounded-md py-2 pb-6 px-4 w-max mr-3'>
            <b className='text-xl text-red-600'>{diffTime.min}</b>
            <i className='absolute top-0 left-0 mt-9 ml-3 text-sm'>
                {diffTime.min > 1 ?
                    "Mins"
                :
                    "Min"
                }
            </i>
        </p>
        
        <p id="seconds" className='relative shadow-md rounded-md py-2 pb-6 px-4 w-max'>
            <b className='text-xl text-red-600'>{diffTime.sec}</b>
            <i className='absolute top-0 left-0 mt-9 ml-3 text-sm'>Sec</i>
        </p>
      </div>

      <form onSubmit={handle_form} action="#" className='bg-gray-200 flex justify-center items-center h-auto flex-col mt-10 mb-20 mx-3'>
        <h1 className='text-lg py-3 px-4'>
            Fill in your Voter's Code in the box below.
        </h1>

        <div className='px-4 my-8 flex algn-center justify-center'>
            <img src="/vCard.png" alt="Sample" className='rounded-md w-3/4'/>
        </div>

        <label htmlFor="tid1" className='mb-15'>Enter Voter's Card Code:</label>
        
        <section className='relative'>
            <input 
                type="text" 
                id='tid1'
                placeholder="04"
                className='mb-6 py-4 pl-5 pr-3 w-15 text-l 
                rounded-lg shadow-md bg-white outline-none'
                value={"04"}
                disabled
                onChange={handleInput}
            />

            <span className='mx-2'>-</span>

            <span className='absolute top-0 -mt-5 ml-2 text-sm text-red-600'>Eg: 08</span>
            <input 
                type="text" 
                id='tid2'
                // placeholder="17"
                className='mb-6 py-4 pl-5 pr-3 w-15 text-l 
                rounded-lg shadow-md bg-white outline-none'
                onChange={handleInput}
            />

            <span className='mx-2'>-</span>

            <span className='absolute top-0 -mt-5 ml-2 text-sm text-red-600'>Eg: 12</span>
            <input 
                type="text" 
                id='tid3'
                // placeholder="08"
                className='mb-6 py-4 pl-5 pr-3 w-15 text-l 
                rounded-lg shadow-md bg-white outline-none'
                onChange={handleInput}
            />

            <span className='mx-2'>-</span>

            <span className='absolute top-0 -mt-5 ml-2 text-sm text-red-600'>Eg: 009</span>
            <input 
                type="text" 
                id='tid4'
                // placeholder="008"
                className='mb-6 py-4 pl-5 pr-3 w-17 text-l 
                rounded-lg shadow-md bg-white outline-none'
                onChange={handleInput}
            />
        </section>

        <section id='loader1' className='mt-8'>
            <span className="loader"></span>
        </section>

        <input 
            type="submit" 
            id='submitTid'
            className={btnClass}
            value={btnContent}
        />
      </form>
    </div>
  )
}

export default Home
