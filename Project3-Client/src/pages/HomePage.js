import { Link, useNavigate } from "react-router-dom";


function HomePage() {
  return (
    <div className="home-container">
      <div className="home-card-container">
        <div className="card home-card ask-card">
        <h2 className="card-title">Ask for a favor</h2>
        <img className="card-img-top home-card-img" src="https://www.iconpacks.net/icons/1/free-loud-speaker-icon-1219-thumb.png"></img>
        <p className="card-text">Are you in a hurry or need something to be done quickly? Click the button below and give it a try!</p>
        <Link to={"/favours/create"} className="btn btn-primary"> Ask For a Favor</Link>
        </div>

        <div className="card home-card do-card">
        <h2 className="card-title">Do a favor</h2>
        <img className="card-img-top home-card-img" src="https://icons.veryicon.com/png/o/business/gmh-icon-library/peer-help.png"></img>
        <p className="card-text">Want to help someone? Click the button below to see all you can help with!</p>
        <Link to={"/favours"} className="btn btn-secondary"> Do a Favor</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;