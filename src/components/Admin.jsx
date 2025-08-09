import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import { Link, useNavigate } from 'react-router-dom';

const Admin = () => {
    const url = 'https://smart.esbatech.org/admin.php';

    const [who, setWho] = useState("");
    const [fetchWho, setFetchWho] = useState(localStorage.getItem("adForm"));
    const [allData, setAllData] = useState({});
    const navigate = useNavigate();

    //useEffect to fetch data and hide loader afterwards
    useEffect(() => {
        let loader = document.querySelector("#loader5");
        loader.style.display = "flex";

        if (fetchWho === null) {
            navigate("/Control");
        }
        else if (fetchWho === "#Admin#1") {
            setWho("Admin 1");
        }
        else if (fetchWho === "#Admin#_2") {
            setWho("Admin 2");
        }

        let formInput = {
            data: "all"
        };

       fetch(url, {
            method: "POST",
            body: JSON.stringify(formInput)
        })
        .then(response => {
            if (!response.ok) {
                navigate("/Control");
            }
            return response.json(); 
        })
        .then(data => {
            // Process the fetched image first and then send the form
            if (data.code === "sw200") {
                setAllData(data.msg);
                loader.style.display = "none";
            }
            else {
                navigate("/Control");
            }
        })
        .catch(error => {
            navigate("/Control");
        });

    }, []);

    const handleFilter = (e) => {
        let id = e.target.id;
        let filterValue = e.target.value;

        if (id === "lgaAdmin") {
            navigate(`/Dashboard?${id + "=" + filterValue}`);
        }
        else if (id === "genderAdmin") {
            navigate(`/Dashboard?${id + "=" + filterValue}`);
        }
    }

    const logout = () => {
        localStorage.clear("adForm");
        navigate("/Control");
    }

  return (
    <div className='mainForm1'>
        <Nav></Nav>

        <section id='loader5' className='mt-8 relative'>
            <section className='fixed top-0 left-0 bg-white w-full h-screen z-10 flex align-center justify-center'>
                <span className="loader mt-90"></span>
            </section>
        </section>

        <div>
            <section className='bg-blue-900 text-xl text-white mt-4 p-4 relative'>
                <b>Welcome {who.user}</b>

                {/* <Link to={''}> */}
                <button onClick={logout} className='absolute top-0 right-0 bg-white rounded-md py-2 px-3 cursor-pointer text-blue-900 text-sm mt-3 mr-3'>Logout</button>
                {/* </Link> */}
            </section>

            {/* Statistics */}
            <div className='mt-8 p-2 flex flex-wrap align-center justify-center gap-7'>
                <section className='flex align-center justify-center flex-col text-center shadow-md rounded-sm p-3 w-max'>
                    <p className='mb-2'>
                        <b>{allData.reg}</b>
                    </p>
                    <span className='text-sm text-blue-800'>
                        Total Registered
                    </span>
                </section>

                <section className='flex align-center justify-center flex-col text-center shadow-md rounded-sm p-3 w-max'>
                    <p className='mb-2'>
                        <b>{allData.female}</b>
                    </p>
                    <span className='text-sm text-blue-800'>
                        Total Females
                    </span>
                </section>

                <section className='flex align-center justify-center flex-col text-center shadow-md rounded-sm p-3 w-max'>
                    <p className='mb-2'>
                        <b>{allData.male}</b>
                    </p>
                    <span className='text-sm text-blue-800'>
                        Total Males
                    </span>
                </section>

                <section className='flex align-center justify-center flex-col text-center shadow-md rounded-sm p-3 w-max'>
                    <p className='mb-2'>
                        <b>{allData.most}</b>
                    </p>
                    <span className='text-sm text-blue-800'>
                        Prominent LGA
                    </span>
                </section>

                <section className='flex align-center justify-center flex-col text-center shadow-md rounded-sm p-3 w-max'>
                    <p className='mb-2'>
                        <b>{allData.least}</b>
                    </p>
                    <span className='text-sm text-blue-800'>
                        Least LGA
                    </span>
                </section>

                <section className='flex align-center justify-center flex-col text-center shadow-md rounded-sm p-3 w-max'>
                    <p className='mb-2'>
                        <b>{allData.percent} %</b>
                    </p>
                    <span className='text-sm text-blue-800'>
                        % Progress
                    </span>
                </section>
            </div>

            {/* Controls */}
            <div className='mt-10 text-center mx-1 p-2'>
                <h2 className=' bg-blue-950 mx-8 text-blue-50 rounded-md p-3'>
                    Filter Data: 
                </h2>

                <div className='mt-1 p-2 flex flex-wrap align-center justify-center gap-7 shadow-md py-8'>
                    <select name="lga" id="lgaAdmin" className='mb-2 shadow-md p-2 outline-0 border-0' onChange={handleFilter}>
                        <option value="" hidden>By Lga</option>
                        <option value="Aguata">Aguata</option>
                        <option value="Anambra East">Anambra East</option>
                        <option value="Anambra West">Anambra West</option>
                        <option value="Anaocha">Anaocha</option>
                        <option value="Awka North">Awka North</option>
                        <option value="Awka South">Awka South</option>
                        <option value="Ayamelum">Ayamelum</option>
                        <option value="Dunukofia">Dunukofia</option>
                        <option value="Ekwusigo">Ekwusigo</option>
                        <option value="Idemili North">Idemili North</option>
                        <option value="Idemili South">Idemili South</option>
                        <option value="Ihiala">Ihiala</option>
                        <option value="Njikoka">Njikoka</option>
                        <option value="Nnewi North">Nnewi North</option>
                        <option value="Nnewi South">Nnewi South</option>
                        <option value="Ogbaru">Ogbaru</option>
                        <option value="Onitsha North">Onitsha North</option>
                        <option value="Onitsha South">Onitsha South</option>
                        <option value="Orumba North">Orumba North</option>
                        <option value="Orumba South">Orumba South</option>
                        <option value="Oyi">Oyi</option>
                    </select>

                    <select name="gender" id="genderAdmin" className='mb-2 shadow-md p-2 outline-0 border-0' onChange={handleFilter}>
                        <option value="" hidden>By gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Admin
