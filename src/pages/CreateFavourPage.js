import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import CreateFavour from "../components/CreateFavour";

export default function CreateFavourPage() {
  const { isLoggedIn } = useContext(AuthContext);
  if (isLoggedIn) {
    return (
      <div>
        <h1>CREATE NEW FAVOUR PAGE</h1>
        <CreateFavour />
      </div>
    );
  } else {
    return <Navigate to="/login"></Navigate>;
  }
}
