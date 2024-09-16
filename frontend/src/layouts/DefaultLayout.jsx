import React from 'react'
import {Outlet} from 'react-router-dom';
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import {MainContainer, MainContent} from "../styles/defaultLayout.js";



export default function DefaultLayoutPage() {
    return (
        <MainContainer>
            <Header/>
            <MainContent>
                <Sidebar/>
                <Outlet/>
            </MainContent>
        </MainContainer>
    )
}
