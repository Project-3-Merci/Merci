import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import apiService from "../services/api.service";
import NumericInput from 'react-numeric-input';

export default function CreateFavour() {
    const { user } = useContext(AuthContext)
    
    const [fetching, setFetching] = useState(true);
    const [profile, setProfile] = useState([])

    useEffect(() => {
        apiService.getOne("profile", user?._id).then((response) => {
          setProfile(response.data);
          setFetching(false);
        });
      }, []);

    return(
        <div>
        <form>
            <label> New favour
                <textarea></textarea>
            </label>
            <h1>Token credit: {profile.token}</h1>
            <NumericInput className="form-control"></NumericInput> 
            <input type="submit" value="Submit" />
        </form>
        </div>
    )
}