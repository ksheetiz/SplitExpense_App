import profileContext from "./profileContext";
import React from "react";
import { useState } from "react";

const ProfileState = () =>{
    const host = "http://localhost:5000";
    
    const paymentInitial = [];

    const [friends, setfriends] = useState([]);
    const [payments, setpayments] = useState(paymentInitial);
    const [requests, setrequests] = useState([]);

    const getFriends = async()=>{
        const response = await fetch(`${host}/api/profile/fetchallfriends`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
        });
        const json = await response.json();
        setfriends(json);
    }

    const getPayments = async()=>{
        const response = await fetch(`${host}/api/profile/fetchallpayments`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
        });
        const json = await response.json();
        setpayments(json);
    }

    const setPayments = async(name, amount) =>{
        const response = await fetch(`${host}/api/profile/set_payment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
            },
            body: JSON.stringify({name, amount}),
        });

        const pay = await response.json();
        setPayments(payments.concat(pay));
    }

    const deletePayment = async(id)=>{
        const response = await fetch(`${host}/api/profile/delete_payment`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
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

    const getRequests = async() =>{
        const response = await fetch(`${host}/api/profile/fetchallrequests`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
        });
        const json = await response.json();
        setrequests(json);
    }

    const addRequest = () =>{

    }

    return (
        <profileContext.Provider
          value={{ friends, getFriends, payments, getPayments, setPayments, deletePayment, requests, getRequests}}
        >
          {props.children}
        </profileContext.Provider>
    );
}

export default ProfileState;