import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState } from 'react';
import { BsFillPenFill } from "react-icons/bs";

const Modal3 = ({fetchuser, update}) =>{

    const [amount, setamount] = useState("");

    const handleClick = async() =>{
        const response = await fetch(`http://localhost:5000/api/profile/${update}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
            },
            body: JSON.stringify({budget : parseInt(amount)}),
        });

        const json = await response.json();

        fetchuser();
        
    }

    return(
        <>
          <Popup
            trigger={<button className="profile-search-result"><BsFillPenFill/></button>}
            modal
            nested
            >
            {close => (
            <div className="modal">
                <button className="close" onClick={close}>
                &times;
                </button>
                <div className="modal-header">Change Budget/Spend</div>
                <div className="content">
                <p>Amount</p>
                <input type="text" name="amount" value={amount} onChange={(e) =>{setamount(e.target.value)}}/>
                <div className="modal-buttons-group">
                    <button onClick={handleClick}>Change</button>
                    <button onClick={close}>CLOSE</button>
                </div>
                </div>
            </div>
            )}
        </Popup>  
        </>
    )
}

export default Modal3;