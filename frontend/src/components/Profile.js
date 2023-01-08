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
import Modal from 'react-modal';

const Profile = () =>{
    const navigate = useNavigate();

    const [modalIsOpen, setIsOpen] = useState(false);
    const [paymentDetail, setpaymentDetail] = useState({name : "", amount : ""});

    const [user, setUser] = useState({name : ""});
    const [payments, setpayments] = useState([]);
    const [friends, setfriends] = useState([]);
    const [requests, setrequests] = useState([]);
    const [CurrTab, setCurrTab] = useState("payments");

    const handleLogout = () =>{
        localStorage.removeItem("token");
        toast.success("Logged Out Successfully !");
        setTimeout(() => {}, 2000);
        navigate("/login");
    }

    useEffect(() => {
        if(!localStorage.getItem("token")){
            navigate("/login");
        }
        fetchUser();
        getPayments();
        getFriends();
        getRequests();
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
        setPayments(pay);
    }

    function openModal() {
        setIsOpen(!modalIsOpen);
    }

    const handlePayment = () =>{
        openModal();
        setPayments();
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    let subtitle;
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    };
    
    const onChange = (e) => {
        setpaymentDetail({ ...paymentDetail, [e.target.name]: e.target.value });
    };

    return(
        <>
        <Toaster/>
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={openModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div className="modal-body">
                <div className="modal-heading">Add Payment</div>
                <p>Name</p>
                <input type="text" name="name" value={paymentDetail.name} onChange={onChange}/>
                <p>Amount</p>
                <input type="text" name="amount" value={paymentDetail.amount} onChange={onChange}/>
                <div className="modal-buttons-group">
                    <button onClick={handlePayment}>ADD</button>
                    <button onClick={openModal}>CLOSE</button>
                </div>
            </div>
        </Modal>
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
                            <div className="profile-transaction">Current Budget : Rs {user.budget} <button className='profile-budget-change'><BsFillPenFill/></button></div>
                            <div className="profile-transaction">Total Spending : Rs {user.spend}</div>
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
                                                        <div className="profile-display-payment-image">
                                                                <button className='profile-search-result' onClick={openModal}><AiFillFileAdd/></button>
                                                        </div>
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
                                                                <FaSearch/><input type="text" name="ID" className='profile-search-bar'/>
                                                                <div className="profile-friend-search-button">
                                                                    <button className='profile-search-button'>Search</button>
                                                                </div>
                                                            </div>
                                                            <div className="profile-display-payment-name">Samsung Note 10</div>
                                                            <div className="profile-display-payment-image">
                                                                <button className='profile-search-result'><AiOutlineUserAdd/></button>
                                                            </div>
                                                        </div>
                                                        {friends.map((item)=>{
                                                            return(
                                                                <Friends key = {item._id} id = {item.id} name = {item.name} amount = {item.amount}/>
                                                            )
                                                        })}
                                                    </>: 
                                                    <Lenders/> }
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;