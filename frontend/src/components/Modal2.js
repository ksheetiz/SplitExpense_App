import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState } from 'react';

const Modal2 = ({id, name, getRequests}) => {

    const [amount , setAmount] = useState("");

    const handleClick = async() =>{
        const response = await fetch(`http://localhost:5000/api/request/create_request`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
            },
            body: JSON.stringify({id : id, name : name, amount : parseInt(amount)}),
        });

        const json = await response.json();

        if(json.success){
            getRequests();
        }
    }

    return(
        <>
          <Popup
            trigger={<button className="profile-search-result">Request</button>}
            modal
            nested
            >
            {close => (
            <div className="modal">
                <button className="close" onClick={close}>
                &times;
                </button>
                <div className="modal-header">Add Payment</div>
                <div className="content">
                <p>Name</p>
                <input type="text" name="name" defaultValue={name}/>
                <p>Amount</p>
                <input type="text" name="amount" value={amount} onChange={(e) =>{setAmount(e.target.value)}}/>
                <div className="modal-buttons-group">
                    <button onClick={handleClick}>Request</button>
                    <button onClick={close}>CLOSE</button>
                </div>
                </div>
            </div>
            )}
        </Popup>  
        </>
    )
}

export default Modal2;