import { AiFillDelete } from "react-icons/ai";
const Payments = ({name, amount, deletePayment, id})=>{

    return (
        <>
                <div className="profile-display-payment-card">
                    <div className="profile-display-payment-name">{name}</div>
                    <div className="profile-display-payment-status">
                        <div className="profile-display-payment-status-color"></div> Processed
                    </div>
                    <div className="profile-display-payment-image">
                        <div className="profile-payment-amount">Rs. {amount}</div>
                    </div>
                    <div className="profile-display-payment-image">
                        <button className='profile-search-result' onClick={()=>{deletePayment(id)}}><AiFillDelete/></button>
                    </div>
                </div>

        </>
    )
}

export default Payments;

