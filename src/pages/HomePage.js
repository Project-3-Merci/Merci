import { Link, useNavigate } from "react-router-dom";


function HomePage() {
  return (
    <div>
      <Link to={"/favours/create"} className="btn btn-primary"> Ask For a Favor</Link>
      <Link to={"/favours"} className="btn btn-secondary"> Do a Favor</Link>
    </div>
  );
}

export default HomePage;