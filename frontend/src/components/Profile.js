import '../css/profile.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillPenFill } from "react-icons/bs";
import toast, { Toaster } from 'react-hot-toast';
import Payments from './Payments';
import Requests from './Requests';
import Lenders from './Lenders';
import Friends from './Friends';
import { FaSearch } from "react-icons/fa";
import { AiOutlineUserAdd, AiFillFileAdd } from "react-icons/ai";
import Modal1 from './Modal1';
import Modal3 from './Modal3';


const Profile = () =>{
    const navigate = useNavigate();
    
    const [paymentDetail, setpaymentDetail] = useState({name : "", amount : ""});

    const [user, setUser] = useState({name : ""});
    const [payments, setpayments] = useState([]);
    const [friends, setfriends] = useState([]);
    const [requests, setrequests] = useState([]);
    const [lenders, setLenders] = useState([]);
    const [CurrTab, setCurrTab] = useState("payments");
    const [Name, setName] = useState("");
    const [SearchResult, setResult] = useState({name : "Name Will appear Here !"});

    const handleLogout = () =>{
        localStorage.removeItem("token");
        toast.success("Logged Out Successfully !");
        setTimeout(() => {}, 2000);
        navigate("/");
    }

    useEffect(() => {
        if(!localStorage.getItem("token")){
            navigate("/login");
        }
        fetchUser();
        getPayments();
        getFriends();
        getRequests();
        getLends();
    },[]);

    async function fetchUser() {
            const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
                },
            });
            const json = await response.json();
            setUser(json);
    }

    const getPayments = async()=>{
        const response = await fetch(`http://localhost:5000/api/profile/fetchallpayments`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
        });
        const json = await response.json();
        setpayments(json);
    }

    const getFriends = async()=>{
        const response = await fetch(`http://localhost:5000/api/profile/fetchallfriends`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
        });
        const json = await response.json();
        setfriends(json);
    }

    const getRequests = async() =>{
        const response = await fetch(`http://localhost:5000/api/request/fetchallrequests`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
        });
        const json = await response.json();
        setrequests(json);
    }

    const getLends = async() =>{
        const response = await fetch(`http://localhost:5000/api/request/fetch_all_lends`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
        });
        const json = await response.json();
        setLenders(json);
    }

    const deletePayment = async(id)=>{
        console.log(id);
        const response = await fetch(`http://localhost:5000/api/profile/delete_payment`, {
            method: "DELETE", 
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
            body: JSON.stringify({ id }),
        });

        console.log("Deleting the Payment with id " + id + " !");
        const newPayments = payments.filter((pay) =>{
            return pay._id !== id;
        })
        setpayments(newPayments);
    }

    const setPayments = async() =>{
        const response = await fetch(`http://localhost:5000/api/profile/set_payment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
            },
            body: JSON.stringify({name : paymentDetail.name, amount : parseInt(paymentDetail.amount)}),
        });

        const pay = await response.json();
        getPayments();
        fetchUser();
    }

    const handlePayment = () =>{
        setPayments();
    }

    const changeBudget = async() =>{
        
    }

    const changeSpend = () =>{

    }

    const SearchFriend = async()=>{
        const response = await fetch(`http://localhost:5000/api/auth/search_user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
            },
            body: JSON.stringify({email : Name}),
        });
        const json = await response.json();

        if(!json.success){
            toast.error("User Not Found !!");
        }
        else{
            setResult(json.user[0]);
            console.log(json.user[0]);
        }
    }

    const handleFriend = async() =>{
        const response = await fetch(`http://localhost:5000/api/profile/set_friends`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
            },
            body: JSON.stringify({email : Name}),
        });

        const json = await response.json();

        if(!json.success){
            toast.error(json.error)
        }else{
            toast.success(json.query);
            getFriends();
        }
    }

    return(
        <>
        <Toaster/>
            <div className="profile-background">
                <div className="profile-section-header">Money Tracker</div>
                <div className="profile-body">
                    <div className="profile-section1">
                        <div className="profile-details">
                            <div className="profile-name">{user.name}</div>
                            <div className="profile-address">Profile ID : {user._id}</div>
                            <div className="profile-address">Dehradun, India</div>
                        </div>
                        <div className="profile-details">
                            <div className="profile-transaction">Current Budget : Rs {user.budget} <Modal3 fetchUser = {fetchUser} update = {"update_budget"}/></div>
                            <div className="profile-transaction">Total Spending : Rs {user.spend} <Modal3 fetchUser = {fetchUser} update = {"update_spend"}/></div>
                        </div>
                        <div className="profile-button">
                            <button className="profile-signout" onClick={handleLogout}>Signout</button>
                        </div>
                    </div>
                    <div className="profile-section2">
                        <div className="profile-tabs">
                            <button className={`profile-tabs-option ${CurrTab === "payments" ? "profile-current-tab" : ""}`} onClick={()=>{setCurrTab("payments")}}>PAYMENTS</button>
                            <button className={`profile-tabs-option ${CurrTab === "requests" ? "profile-current-tab" : ""}`} onClick={()=>{setCurrTab("requests")}}>REQUESTS</button>
                            <button className={`profile-tabs-option ${CurrTab === "friends" ? "profile-current-tab" : ""}`} onClick={()=>{setCurrTab("friends")}}>FRIENDS</button>
                            <button className={`profile-tabs-option ${CurrTab === "lenders" ? "profile-current-tab" : ""}`} onClick={()=>{setCurrTab("lenders")}}>LENDERS</button>
                        </div>
                        <div className="profile-display">
                            {CurrTab === "payments" ? <>
                                                        <div className="profile-display-payment-heading">PAYMENTS</div>
                                                        <Modal1 handleClick={handlePayment} paymentDetail = {paymentDetail} setpaymentDetail = {setpaymentDetail}/>
                                                        {payments.map((item)=>{
                                                            return(
                                                                <Payments key = {item._id} id = {item._id} name = {item.name} amount = {item.amount} deletePayment={deletePayment}/>
                                                            )
                                                        })}
                                                    </>:  
                            CurrTab === "requests" ?<>
                                                    <div className="profile-display-payment-heading">REQUESTS</div> 
                                                    {requests.map((item) =>{
                                                        return(
                                                            <Requests name = {item.name} amount = {item.amount} key = {item.id}/>
                                                        )
                                                    })}
                                                    </> : 
                            CurrTab === "friends" ? <>
                                                        <div className="profile-display-payment-heading">FRIENDS</div>
                                                        <div className="profile-display-payment-card">
                                                            <div className="profile-friend-search">
                                                                <FaSearch/><input type="text" name="ID" className='profile-search-bar' value={Name} onChange = {(e)=>{setName(e.target.value)}}/>
                                                                <div className="profile-friend-search-button">
                                                                    <button className='profile-search-button' onClick={SearchFriend}>Search</button>
                                                                </div>
                                                            </div>
                                                            <div className="profile-display-payment-name">{SearchResult.name}</div>
                                                            <div className="profile-display-payment-image">
                                                                <button className='profile-search-result' onClick={handleFriend}><AiOutlineUserAdd/></button>
                                                            </div>
                                                        </div>
                                                        {friends.map((item)=>{
                                                            return(
                                                                <Friends key = {item._id} id = {item._id} getRequests={getLends} name = {item.name}/>
                                                            )
                                                        })}
                                                    </>: 
                                                    <>
                                                    <div className="profile-display-payment-heading">LENDERS</div>
                                                    {lenders.map((item) =>{
                                                        return(
                                                            <Lenders key = {item._id} name = {item.name} amount = {item.amount}/>
                                                        )
                                                    })}
                                                    </>
                                                     }
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;