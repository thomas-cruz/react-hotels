import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/property-List/PropertyList";
import getHotels from "../../api/hotels";
import "./home.css";

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  useEffect(()=>{
    async function fetch (){
      const h = await getHotels();
      setHotels(h);
      setFilteredHotels(h);
    }
    fetch();
  },[])

  return (
    <>
      <Navbar />
      <Header setHotels={setFilteredHotels} hotels={hotels}/>
      <div className="homeContainer">
        <PropertyList hotels={filteredHotels}/>
      </div>
    </>
  );
};

export default Home;
