import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar1 from "./components/Navbar";
import HomePage from "./pages/HomePage";

import ChatListPage from "./pages/ChatListPage";
import ChatPage from "./pages/ChatPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";
import AllFavoursPage from "./pages/AllFavoursPage"
import UserFavoursPage from "./pages/UserFavoursPage"
import CreateFavourPage from "./pages/CreateFavourPage"
import EditProfilePage from "./pages/EditProfilePage"
import ProfilePage from "./pages/ProfilePage"
import FavourDetailsPage from "./pages/FavourDetailsPage"


function App() {
  return (
    <div className="App">
      <Navbar1 />

      <Routes>      
        <Route path="/" element={<HomePage />} />
        <Route path="/chats/:id" element={<IsPrivate> <ChatListPage /> </IsPrivate>} />        
        <Route path="/chats/:id/:otherId" element={<IsPrivate> <ChatPage /> </IsPrivate>} />        
        <Route path="/favours" element={<AllFavoursPage />} />
        <Route path="/favours/myList/:userId" element={<UserFavoursPage/>} />
        <Route path="/favours/create" element={<CreateFavourPage/>} />
        <Route path="/profile/:id" element={<ProfilePage/>} />
        <Route path="/profile/edit/:id" element={<EditProfilePage/>} />
        <Route path="/favour/:id" element={<FavourDetailsPage/>} />
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />

      </Routes>
    </div>
  );
}

export default App;
