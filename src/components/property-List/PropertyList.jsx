import React, { useState } from "react";
import "./propertyList.css";
const PropertyList = ({hotels}) => {
  const [openDivs, setOpenDivs] = useState([]);

  const toggleDiv = (i) => {
    setOpenDivs((divs) =>
      divs.includes(i) ? divs.filter((d) => d !== i) : [...divs, i]
    );
  };
  if(!hotels || !hotels.length) {
    return (
    <div className="pList">
      <h1>Your search did not match any accommodations</h1>
    </div>
  )}
  return (
    <>
      <div className="pList">
        {
          hotels.map((item, index)=>(
            <div className="pListItems" id={item.id} key={item.id} onClick={() => toggleDiv(index)}>
              <img
                src="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="
                alt=""
                className="pListImg"
              />
              <h1 className="pListTitle">{item.name}</h1>
              <div className="pListTiles">
                <div className={`${openDivs.includes(index) ? "" : "close"} box`}>
                  <p className="area">Maximum {item.maximumPax} guests</p>
                  <p className="area">Floor area: {item.floorArea}</p>
                  <p className="desc">{item.description}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default PropertyList;
