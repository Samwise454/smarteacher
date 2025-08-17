import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const urlData = 'https://smart.esbatech.org/dash.php';
    const urlLg = 'https://smart.esbatech.org/count.php';
    const searchUrl = 'https://smart.esbatech.org/search.php';
    const imgUrl = 'https://smart.esbatech.org/uploads/';

    const [url, setUrl] = useState(window.location.href);
    const [fetchWho, setFetchWho] = useState(localStorage.getItem("adForm"));
    const [queryVal, setQueryVal] = useState({
        qKey: "", // query key
        qVal: "" //query value
    });
    const [fetchBy, setFetchBy] = useState("");
    const [load, setLoad] = useState(20);
    const [searchParam, setSearchParam] = useState({
        search: "",
        sKey: "", // search key
        sKeyVal: "" // value to be searched in its column
    });

    const [allData, setAllData] = useState([]);
    const [tempData, setTempData] = useState(false);
    const [regNum, setRegNum] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        let loader = document.querySelector("#loader6");
        // loader.style.display = "none";
        if (fetchWho === null) {
            navigate("/Control");
        }

        if (url.length == 0 || !url.includes("?") || !url.includes("=")) {
            navigate("/Admin");
        }
        else {
            //let's get data to be used to fetch
            let filterUrl = url.split("?")[1];// eg lgaAdmin=Ekwusigo
            let newFilter = "";
            
            if (filterUrl.includes("%20")) {
                newFilter = filterUrl.replace("%20", " ");
            }
            else {
                newFilter = filterUrl;
            }

            let filterUrlSplit = newFilter.split("=");

            let filterKey = filterUrlSplit[0];
            let filterValue = filterUrlSplit[1];

            let quKey = "";

            if (filterKey === "lgaAdmin") {
                filterKey = "LGA"
                quKey = "lga";

                let lgaCount = {
                    tCol: quKey,
                    tData: filterValue
                }

                //query to fetch number of people registered per local govt
                fetch(urlLg, {
                    method: "POST",
                    body: JSON.stringify(lgaCount)
                })
                .then(response => {
                    if (!response.ok) {
                        setRegNum("0");
                    }
                    return response.json(); 
                })
                .then(data => {
                    // console.log(data)
                    if (data.code === "sw200") {
                        setRegNum(data.msg);
                    }
                    else {
                        setRegNum("0");
                    }
                })
                .catch(error => {
                    setRegNum("0");
                });
            }
            else if (filterKey === "genderAdmin") {
                filterKey = "Gender";
                quKey = "gender";
            }

            setQueryVal({
                qKey: filterKey,
                qVal: filterValue
            })

            setFetchBy(filterKey);

            let payLoad = {
                pKey: quKey,
                pVal: filterValue,
                pCount: load
            }

            //query to fetch data by quKey value
            fetch(urlData, {
                method: "POST",
                body: JSON.stringify(payLoad)
            })
            .then(response => {
                if (!response.ok) {
                    navigate("/Admin");
                    setTempData(false);
                }
                return response.json(); 
            })
            .then(data => {
                // console.log(data.msg)
                if (data.code === "sw200") {
                    setTempData(true);
                    setAllData(data.msg);
                    loader.style.display = "none";
                }
                else {
                    navigate("/Admin");
                    setTempData(false);
                }
            })
            .catch(error => {
                navigate("/Admin");
                setTempData(false);
            });
        }
    }, [load]);

    const loadMore = () => {
        setLoad(load + 10);
    }

    const setSearchData = (e) => {
        setSearchParam({
            search: e.target.value,
            sKey: queryVal.qKey,
            sKeyVal: queryVal.qVal
        })
    }

    const handleSearch = () => {
        let loader = document.querySelector("#loader6");
        let searchMsg = document.querySelector("#searchMsg");

        loader.style.display = "flex";

        const handle_searchMsg = () => {
            searchMsg.style.display = "flex";
            loader.style.display = "none";
            setTimeout(() => {
                searchMsg.style.display = "none";
            }, 4000);
        }

         //query to fetch data by quKey value
        fetch(searchUrl, {
            method: "POST",
            body: JSON.stringify(searchParam)
        })
        .then(response => {
            if (!response.ok) {
                setTempData(false);
                handle_searchMsg();
            }
            return response.json(); 
        })
        .then(data => {
            // console.log(data.msg)
            // Process the fetched image first and then send the form
            if (data.code === "sw200") {
                setAllData(data.msg);
                loader.style.display = "none";
                setTempData(true);
            }
            else {
                setTempData(false);
                handle_searchMsg();
            }
        })
        .catch(error => {
            handle_searchMsg();
        });
    }

  return (
   <div className='mainForm1'>
        <Nav></Nav>

        <section id='loader6' className='mt-8 relative'>
            <section className='fixed top-0 left-0 bg-white w-full h-screen z-10 flex align-center justify-center'>
                <span className="loader mt-90"></span>
            </section>
        </section>

        <div>
            <section className='bg-green-900 text-xl text-white mt-4 p-4 relative'>
                {queryVal.qKey == "LGA" ?
                    <b>{queryVal.qVal + " " + fetchBy}</b>
                :
                    <>
                        Registered <b>{queryVal.qVal} Teachers</b>
                    </>
                }

                <Link to={'/Admin'}>
                    <button className='absolute top-0 right-0 bg-white rounded-md py-2 px-3 cursor-pointer text-blue-900 text-sm mt-3 mr-3'>Back</button>
                </Link>
            </section>

            <section className='relative mt-4 text-center'>
                <section id='searchMsg' className='text-red-600 my-2 text-sm text-center ml-4'>No data found</section>
                <input 
                    type="text" placeholder='Search name' 
                    id='searchDash'
                    className='outline-none border-0 shadow-md rounded-md py-2 px-4 mr-2'
                    onChange={setSearchData}
                />
                <button onClick={handleSearch} className='text-sm bg-blue-950 text-white py-2 px-3 rounded-md cursor-pointer'>Search</button>
            </section>

            {queryVal.qKey === "LGA"?
                <section className='text-center text-sm mt-4 text-green-900'>
                    <b>{regNum}</b> Teachers Registered
                </section>
            :   
                <></>
            }

            <div className='cardContainer mt-5 p-2'>
                {tempData === false ?
                        <div className='card shadow-md p-2 gap-4 relative mb-5'>
                            <section>
                                <img src="/subeb_logo.png" alt="Default Pic" className='dashImg rounded-md' />
                            </section>

                            <section className='text-sm leading-6 mt-2'>
                                <p>No data!</p>
                                <p></p>
                                <p></p>
                                <p></p>
                            </section>

                            <span className='absolute top-0 right-0 mr-1 -mt-3 shadow-sm py-1 px-2 rounded-sm text-sm'>
                                1
                            </span>
                        </div>
                    :
                        allData.map((data, dataIndex) => {
                            return (
                                <div className='card shadow-md p-2 gap-4 relative mb-5' key={dataIndex}>
                                    <section>
                                        {/* <img src={imgUrl + data.img} alt="Teacher Pic" className='dashImg rounded-md' /> */}
                                        <img src="" alt="Teacher Pic" className='dashImg rounded-md' />
                                    </section>

                                    <section className='text-sm leading-6 mt-2'>
                                        <p>{data.name}</p>
                                        <p>{data.tel}</p>
                                        <p>{data.gender}</p>
                                        <p>{data.code}</p>
                                    </section>

                                    <span className='absolute top-0 right-0 mr-1 -mt-3 shadow-sm py-1 px-2 rounded-sm text-sm'>
                                        {parseInt(dataIndex) + 1}
                                    </span>
                                </div>
                            );
                        })
                }
            </div>

            <section className='text-center mb-10'>
                <button className='bg-blue-900 text-white py-2 px-3 rounded-md cursor-pointer' onClick={loadMore}>
                    More
                </button>
            </section>
        </div>
    </div>
  )
}

export default Dashboard
