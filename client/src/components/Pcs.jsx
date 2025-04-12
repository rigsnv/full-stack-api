import React, {useState, useEffect} from 'react'
import Contract from './Contract';
import getDepth from './getJsonDepth';

const Pcs = () => {
    const [pcsData, setPcsData] = useState(null);
    const [error, setError] = useState(null);
    const url = "rigsnvapi-acdzcsh7a0fcf0dw.uksouth-01.azurewebsites.net/pcs_contracts";
    const [contractsNum, setContractsNum] = useState(null);
    const [contracts, setContracts] = useState(null);
    
    console.log("Component rendered");

    useEffect(() => {
        async function fetchPCSContracts() {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (!data) {
                    throw new Error('No data received');
                }
                console.log("PCS data fecthed");
                setPcsData(data);
                setContractsNum(data.releases.length);
                console.log(data.version);
                console.log(getDepth(data));
                console.log(data.releases.length);
                try {
                    if (data) {
                        setContracts(
                            <div>
                                <div className="forecast">
                                    <div className="forecast-data">
                                        <div className="data-container">
                                            <h3>Location:</h3>
                                            <p>Scotland</p>
                                        </div>
                                        <div className="data-container">
                                            <h3>Published Date:</h3>
                                            <p>{new Date(data.publishedDate).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="contracts">
                                    {(() => {
                                        const contractElements = [];
                                        for (let index = 0; index < data.releases.length; index++) {
                                            contractElements.push(
                                                <div key={`contract-${index}`} className="contract">
                                                    <Contract
                                                        key={`contract-${index}`}
                                                        releases={data.releases[index]}
                                                        num={index + 1}
                                                    />
                                                </div>
                                            );
                                        }
                                        return contractElements;
                                    })()}
                                </div>
                            </div>
                        );
                        return null
                    }
                    else {
                        console.log("No data");
                    }         
                }
                catch (error) {
                    console.log("Error getting depth of releases[0]:", error);
                }
                    
            } catch (error) {
                setError(error);
            }
        }
        fetchPCSContracts();
    }, []);

    return (
        <div>
            {error && <div>Unable to display Contracts data: {error.message}</div>}
            {!pcsData ? <div>Loading...</div> : contracts}
        </div>
    );
}

export default Pcs;