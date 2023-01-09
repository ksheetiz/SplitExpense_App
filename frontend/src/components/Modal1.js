import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { AiFillFileAdd } from "react-icons/ai";

const Modal1 = ({handleClick, paymentDetail, setpaymentDetail}) => {

    
    const onChange = (e) => {
        setpaymentDetail({ ...paymentDetail, [e.target.name]: e.target.value });
    };

    return(
        <>
          <Popup
            trigger={<button className="profile-search-result"><AiFillFileAdd/></button>}
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
                <input type="text" name="name" value={paymentDetail.name} onChange={onChange}/>
                <p>Amount</p>
                <input type="text" name="amount" value={paymentDetail.amount} onChange={onChange}/>
                <div className="modal-buttons-group">
                    <button onClick={handleClick}>ADD</button>
                    <button onClick={close}>CLOSE</button>
                </div>
                </div>
            </div>
            )}
        </Popup>  
        </>
    )
}

export default Modal1;