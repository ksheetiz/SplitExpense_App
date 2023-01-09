const Lenders = ({name, amount}) =>{
    return(
        <>
        
                            <div className="profile-display-payment-card">
                                <div className="profile-display-payment-name">{name}</div>
                                <div className="profile-display-payment-status">
                                    <div className="profile-display-payment-status-color"></div> Processing
                                </div>
                                <div className="profile-display-payment-image">
                                    <div className="profile-payment-amount">Rs. {amount}</div>
                                </div>
                            </div>
        </>
    )
}

export default Lenders;