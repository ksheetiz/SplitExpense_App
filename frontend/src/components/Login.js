import '../css/login.css';
import pic from "../assets/chilling.png";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const Home = () =>{
    const navigate = useNavigate();

    const [credentials, setcredentials] = useState({email : "", password : ""});

    const handleSubmit = async() =>{
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            }),
        });
        const json = await response.json();
        
        if(json.success){
            toast.success("Loggedin Successfully !");
            localStorage.setItem("token",json.token);
            setTimeout(() => {
                navigate("/profile");
            }, 2000);
        }
        else{
            toast.error(json.error);
        }
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return(
        <>
            <Toaster/>
            <div className='home-background'>
                <div className="home-section1">
                    <img src={pic} alt="" />
                </div>
                <div className="home-section2">
                    <div className="home-login-container">
                        <p className='home-heading-1'>🎉Login🎉</p>
                        <p className='home-form-type'>UserName</p>
                        <input type='email' name = 'email' className = "home-form-input" value={credentials.email} onChange={onChange}/>
                        <p className='home-form-type'>Password</p>
                        <input type='password' name = 'password' className = "home-form-input" value={credentials.password} onChange={onChange}/>
                        <div className="home-form-buttons">
                            <input type="button" value="Login" className='home-button'onClick={handleSubmit} />
                            <input type="button" value="Back" className='home-button' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;