import React from "react";
import Navbar from "./Navbar";

const Header = ({handleClick}) => {

    return (
        <div className="header">
            <Navbar handleClick={handleClick}/>
            <h1>Awesome Projects</h1>
        </div>
    );
}
export default Header;