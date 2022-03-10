import { Link, useNavigate } from "react-router-dom";


function HomePage() {
  return (
    <div>
      <Link to={"/favours/create"}> Ask For a Favor</Link>
      <Link to={"/favours"}> Do a Favor</Link>
    </div>
  );
}

export default HomePage;