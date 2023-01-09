import Modal2 from "./Modal2";

const Friends = ({name,id, getRequests}) =>{


    return(
        <>
                            <div className="profile-display-payment-card">
                                <div className="profile-display-payment-name">{name}</div>
                                <div className="profile-display-payment-status">
                                    Profile ID : {id}
                                </div>
                                <div className="profile-display-payment-image">
                                    <Modal2 name = {name} id = {id} getRequests= {getRequests}/>
                                </div>
                            </div>
        </>
    )
}

export default Friends;