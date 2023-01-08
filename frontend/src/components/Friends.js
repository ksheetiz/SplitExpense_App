
const Friends = ({name, amount, id}) =>{


    return(
        <>
                            <div className="profile-display-payment-card">
                                <div className="profile-display-payment-name">{name}</div>
                                <div className="profile-display-payment-status">
                                    Profile ID : {id}
                                </div>
                                <div className="profile-display-payment-image">
                                    <div className="profile-payment-amount">Rs. {amount}</div>
                                </div>
                            </div>
        </>
    )
}

export default Friends;