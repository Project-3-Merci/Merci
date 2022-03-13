import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import IsAnon from "./IsAnon";
import IsPrivate from "./IsPrivate";


function FavorPreview({ title, _id }) {

    const {user} = useContext(AuthContext)


    return user?._id ? (
        <div className="favour-preview card">
                <h2>{title}</h2>
                <Link to={`/favour/${_id}`}>

                    <button>See details</button>
                     
                </Link>
                <button onChange={acceptFavor(_id,user._id)}>Accept</button>
            </div>
    ):(
        <div className="favour-preview card">
        <h2>{title}</h2>
        <Link to={`/favour/${_id}`}>
            
            <button>See details</button>
             
        </Link>
    </div>
    );
}

const acceptFavor = (favourId, userId)=>{

}
export default FavorPreview;
