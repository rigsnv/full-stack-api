import React from "react";

const Navbar = ({handleClick}) => {

    return (
        <div className="navbar">
            <ul>
                <li  className="nav-item active">
                    <a className="nav-link" onClick={()=>handleClick("weather")}>
                        Weather
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={()=>handleClick("contracts")}>
                        PCS Contracts
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;