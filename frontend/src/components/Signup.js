import pic from "../assets/chilling.png";
import '../css/signup.css';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () =>{
    const navigate = useNavigate();

    const [credentials, setcredentials] = useState({name : "",email : "", password : ""});

    const handleSubmit = async() =>{
        const response = await fetch(`http://localhost:5000/api/auth/create_user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name : credentials.name,
                email: credentials.email,
                password: credentials.password,
            }),
        });
        const json = await response.json();

        if(json.success){
            toast.success("Created Successfully !");
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
            <Toaster />
            <div className='signup-background'>
                <div className="signup-section1">
                    <img src={pic} alt="" />
                </div>
                <div className="signup-section2">
                    <div className="signup-login-container">
                        <p className='signup-heading-1'>😎Signup😎</p>
                        <p className='signup-form-type'>Name</p>
                        <input type='text' name = 'name' className = "signup-form-input" value={credentials.name} onChange={onChange}/>
                        <p className='signup-form-type'>UserName</p>
                        <input type='email' name = 'email' className = "signup-form-input" value={credentials.email} onChange={onChange} />
                        <p className='signup-form-type'>Password</p>
                        <input type='password' name = 'password' className = "signup-form-input" value={credentials.password} onChange={onChange}/>
                        <div className="signup-form-buttons">
                            <input type="button" value="Signup" className='signup-button' onClick={handleSubmit}/>
                            <input type="button" value="Back" className='signup-button' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;