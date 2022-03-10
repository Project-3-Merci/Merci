import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";


import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";
import AllFavoursPage from "./pages/AllFavoursPage"
import UserFavoursPage from "./pages/UserFavoursPage"
import CreateFavourPage from "./pages/CreateFavourPage"


function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>      
        <Route path="/" element={<HomePage />} />
        

        <Route path="/favours" element={<AllFavoursPage />} />
        <Route path="/favours/myList" element={<UserFavoursPage/>} />
        <Route path="/favours/create" element={<CreateFavourPage/>} />
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />

      </Routes>
    </div>
  );
}

export default App;
