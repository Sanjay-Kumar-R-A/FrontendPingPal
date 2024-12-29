import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import CreateChat from "./Components/createChat";
import SendMessage from "./Components/sendMessage";
import ChatDetails from "./Components/chatDetails";
import ChatsList from "./Components/chatsList";
import GroupManagement from "./Pages/group";




const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
    <Router>
      <div>
        <Navbar />
      </div>

        <Routes>
          
          <Route path='/' element={<Home />} />
          <Route path='/Home' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={< ResetPassword/>} />
          <Route path="/createChat" element={< CreateChat/>} />
          <Route path="/sendMessage" element={< SendMessage/>} />
          <Route path="/chatDetails" element={< ChatDetails/>} />
          <Route path="/chatsList" element={< ChatsList/>} />
          <Route path="/groupManagement" element={< GroupManagement/>} />
         
        
        </Routes>

       <div>
       <Footer />
       </div>
    </Router>
    </div>
  );
};
export default App;
