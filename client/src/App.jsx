import React, {useState} from "react";
import "./App.css";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";

const App = () => {
  const [page, setPage] = useState("");
  const handleClick = (pageClicked) => {
    setPage(pageClicked);
    console.log(`Clicked on ${pageClicked}`);
  }
console.log("App component rendered");
  return (
    <div>
      <Header handleClick={handleClick} />
      <MainContent page={page}/>
      <Footer />
    </div>
  );
};

export default App;