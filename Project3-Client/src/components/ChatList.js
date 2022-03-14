import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import apiService from "../services/api.service";
import Socket from "./Socket";
import socket from "./Socket";

export default function ChatList() {

    socket.emit('conectado', "hi from client")
    return (
        <div>This is the chatLits</div>
    )
}


