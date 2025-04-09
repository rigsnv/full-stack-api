import React from "react";
import Weather from "./Weather";
import PCS from "./Pcs";

const MainContent = ({page}) => {
    const renderPageTitle = () => {
        switch (page) {
            case "weather":
                return <h2>Weather Component</h2>;
            case "contracts":
                return <h2>Contracts Component</h2>;
            default:
                return <h2>Welcome to my Portfolio!</h2>;
        }
    }

    const renderPageContent = () => {
        switch (page) {
            case "weather":
                return <Weather />;
            case "contracts":
                return <PCS />;
            default:
                return (
                    <div>
                        <p>This website demonstrates a Full-stack Web Application featuring a Frontend built with JavaScript and React, 
                            and a Backend built with Python and FastAPI.</p>
                    </div>
                );
        }
        
    }

    return (
        <div className="main">
            {renderPageTitle()}
            {renderPageContent()}
        </div>
    );
}

export default MainContent;