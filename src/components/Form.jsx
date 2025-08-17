import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from './Nav';

const Form = () => {
    const url = 'https://smart.esbatech.org/form.php';

    const [btnContent, setBtnContent] = useState("Submit");
    const [btnClass, setBtnClass] = useState("bg-gradient-to-b from-yellow-600 to-black px-6 py-3 text-white rounded-md cursor-pointer outline-none border-none");
    const badSubmit = "bg-red-600 px-6 py-3 text-white rounded-md cursor-pointer";
    const [defRes, setDefRes] = useState('mt-6 text-black text-center hidden');
    const errorResClass = useState('mt-6 text-red-600 text-center');
    const sucResClass = useState('mt-6 text-black hidden');
    const [resCont, setResCont] = useState("");
    const [who, setWho] = useState(localStorage.getItem("smart"));
    const [formInput, setFormInput] = useState({
        firstname: "",
        middlename: "",
        surname: "",
        tel: "",
        gender: "",
        address: "",
        dob: "",
        lga: "",
        tCode: ""
    });
    const [imgFile, setImgFile] = useState({});
    const navigate = useNavigate();

    //let's get the session data 
    useEffect(() => {
        if (who == null) {
            navigate("/");
        }
        else {
            setFormInput({...formInput, tCode : who});   
        }
    }, [])

    const handleFormInput = (e) => {
        let formId = e.target.id;
        let formValue = e.target.value;

        switch(formId) {
            case "fname": 
                setFormInput({...formInput, firstname : formValue});
                break;
            case "mname":
                setFormInput({...formInput, middlename : formValue});
                break;
            case "sname":
                setFormInput({...formInput, surname : formValue});
                break;
            case "tel":
                setFormInput({...formInput, tel : formValue});
                break;
            case "address":
                setFormInput({...formInput, address : formValue});
                break;
            case "dob":
                setFormInput({...formInput, dob : formValue});
                break;
            case "lga":
                setFormInput({...formInput, lga : formValue});
                break;
        }
    }

    const handleGender = (e) => {
        let gender = e.target.id;
        setFormInput({...formInput, gender : gender});
    }

    const handleImage = (e) => {
        let imgFormData = new FormData();

        let imgFile = document.querySelector("#imgData");
        let fileData = imgFile.files[0];
        imgFormData.append('image', fileData);
        imgFormData.append('who', who);
        imgFormData.append('tData', 
            formInput.firstname+"~"+
            formInput.middlename+"~"+
            formInput.surname+"~"+
            formInput.tel+"~"+
            formInput.gender+"~"+
            formInput.address+"~"+
            formInput.dob+"~"+
            formInput.lga
            );
        setImgFile(imgFormData);
    }

    const handleFormError = (msg) => {
        setResCont(msg);
        setDefRes(errorResClass);
        setTimeout(() => {
            setDefRes(defRes);
        }, 5000);
    }

    const handleForm = (e) => {
        e.preventDefault();
        let loader = document.querySelector("#loader2");

        const hide_loader = () => {
            loader.style.display = "none";
        }
        loader.style.display = "flex";

        let genderArray = ["male", "female"];

        if (formInput.firstname.length == 0 ||
            formInput.middlename.length == 0 ||
            formInput.surname.length == 0 ||
            formInput.tel.length == 0 ||
            formInput.gender.length == 0 ||
            formInput.address.length == 0 ||
            formInput.dob.length == 0 ||
            formInput.lga.length == 0 ||
            formInput.tCode.length == 0
        ) {
            let msg = "Check for empty field!!";
            hide_loader();
            handleFormError(msg);
        }
        else if (!genderArray.includes(formInput.gender)) {
            let msg = "Invalid selection!!";
            hide_loader();
            handleFormError(msg);
        }
        else {
            //send imgFormData to the backend
            fetch(url, {
                method: "POST",
                body: imgFile
            })
            .then(response => {
                // Check if the response was successful (e.g., status code 200-299)
                if (!response.ok) {
                    let msg = "Error Processing!!";
                    hide_loader();
                    handleFormError(msg);
                }
                // Parse the response body as JSON
                return response.json(); 
            })
            .then(data => {
                // Process the fetched image first and then send the form
                hide_loader();

                let code = data.code;
                let msg = data.msg;
                
                if (code === "sw200") {
                    //success
                    //let's split msg
                    navigate('/Complete?'+data.msg);
                    localStorage.clear("smart");
                }
                else {
                    //error
                    handleFormError(msg);
                }
            })
            .catch(error => {
                // Handle any errors during the fetch operation
                let msg = "Error Processing!!";
                hide_loader();
                handleFormError(msg);
            });
        }
    }
  return (
    <div className='mainForm'>
      <Nav></Nav>

        <h1 className='text-center bg-green-800 m-8 text-white p-5 text-xl'>
            <b>
                SMART TEACHERS REGISTRATION FORM
            </b>
        </h1>

        <form onSubmit={handleForm} action="#" id='tForm' className='tForm bg-gray-100 flex justify-center items-center h-auto py-15 flex-col m-8 mb-20'>

            <div className='text-left flex-col'>
                <p className='formLabel'>Firstname: </p>
                <input type="text" name='fname' id='fname' 
                    placeholder='Eg Chukwuma'
                    className='mainFormInput bg-white mb-7 shadow-md' 
                    onChange={handleFormInput}   
                />

                <p className='formLabel'>Middlename: </p>
                <input type="text" name='mname' id='mname' 
                    placeholder='Eg Olivia'
                    className='mainFormInput bg-white mb-7 shadow-md' 
                    onChange={handleFormInput}   
                />

                <p className='formLabel'>Surname: </p>
                <input type="text" name='sname' id='sname' 
                    placeholder='Eg Okoye'
                    className='mainFormInput bg-white mb-7 shadow-md' 
                    onChange={handleFormInput}   
                />

                <p className='formLabel'>Phone Number: </p>
                <input type="text" name='tel' id='tel' 
                    placeholder='Eg 08035566000'
                    className='mainFormInput bg-white mb-7 shadow-md' 
                    onChange={handleFormInput}   
                />

                <p className='formLabel'>Gender: </p>
                <div className='flex flex-row align-center justify-center mb-7'>
                    <p className="genderLabel">Male</p>
                    <input type="radio" name='gender' id='male' 
                        className='mainFormInput bg-white'    
                        onChange={handleGender}
                    />

                    <p className="genderLabel">Female</p>
                    <input type="radio" name='gender' id='female' 
                        className='mainFormInput bg-white' 
                        onChange={handleGender}   
                    />
                </div>

                <p className='formLabel'>Address: </p>
                <input type="address" name='address' id='address' 
                    placeholder='N0 00 Ziks Avenue, Awka'
                    className='mainFormInput bg-white mb-7 shadow-md'  
                    onChange={handleFormInput}  
                />

                <p className='formLabel'>Date of Birth: </p>
                <input type="date" name='dob' id='dob' 
                    className='mainFormInput bg-white mb-7 shadow-md' 
                    onChange={handleFormInput}   
                />

                <p className='formLabel'>LGA: </p>
                <select name="lga" id="lga" className='mb-7 shadow-md' onChange={handleFormInput}>
                    <option value="" hidden>Choose LGA</option>
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

                <p className="formLabel">Upload Image: </p>
                <div>
                    <input type="file" 
                        onChange={handleImage} 
                        placeholder='Choose an Image' 
                        id='imgData'
                        className='w-50 bg-gray-600 text-white mt-1 rounded-sm p-2 shadow-md'
                    />
                </div>

                <div id='resDiv' className={defRes}>
                    {resCont}
                </div>

                <section id='loader2' className='mt-8 flex align-center justify-center'>
                    <span className="loader"></span>
                </section>

                <p className='mt-10 text-center'>
                    <button id='submitForm' className={btnClass}>{btnContent}</button>
                </p>
            </div>
        </form>
    </div>
  )
}

export default Form
