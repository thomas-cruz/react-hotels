import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./header.css";
import { format } from "date-fns";

const Header = ({ type, setHotels, hotels }) => {
  const [searchInput, setSearchInput] = useState('');
  const [openDate, setOpenDate] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOption, setOpenOption] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOnChange = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const filter = useCallback(() => {
    const filtered = hotels.filter((el)=>{
      const { name, maximumPax = 0 } = el;
      const inName = searchInput != "" ? name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()) : false;
      //options.adult+options.children compare to maximumPax
      const totalPax = options.adult + options.children;
      if (totalPax <= maximumPax) {
        if(inName){
          return true;
        }else if(searchInput == ""){
          return true;
        }else{
          return false;
        }
      }
      return false;
    });
    setHotels(filtered);
  }, [searchInput, options]);
  return (
    <>
      <div className="header">
        <div className={type == "list" ? "listMode" : "headerContainer"}>
          <div className="headerList">
            <div className="headerListItem active">
              <FontAwesomeIcon icon={faBed} />
              <span>stays</span>
            </div>

            <div className="headerListItem">
              <FontAwesomeIcon icon={faPlane} />
              <span>Flights</span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon icon={faCar} />
              <span>Car rentals</span>
            </div>

            <div className="headerListItem">
              <FontAwesomeIcon icon={faBed} />
              <span>Attractions</span>
            </div>

            <div className="headerListItem">
              <FontAwesomeIcon icon={faTaxi} />
              <span>Airport Taxis</span>
            </div>
          </div>
          {type !== "list" && (
            <>
              <div className="headerSearch">
                <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faBed} className="headerIcon" />
                    <input
                      type="text"
                      placeholder="Where are you going?"
                      className="headerSearchInput"
                      id='searchInput'
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
                <div className="headerSearchItem">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="headerIcon"
                  />
                  <span
                    onClick={() => {
                      setOpenDate(!openDate);
                      setOpenOption(false);
                    }}
                    className="headerSearchText"
                  >{`${format(
                    dateRange[0].startDate,
                    "MM/dd/yyyy"
                  )} to ${format(dateRange[0].endDate, "MM/dd/yyyy")}`}</span>
                  {openDate && (
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDateRange([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={dateRange}
                      className="dateRangePicker"
                    />
                  )}
                </div>

                <div className="headerSearchItem">
                  <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                  <span
                    className="headerSearchText"
                    onClick={() => {
                      setOpenOption(!openOption);
                      setOpenDate(false);
                    }}
                  >
                    {`${options.adult} adult .
                ${options.children} children . ${options.room}
                room`}
                  </span>
                  {openOption && (
                    <div className="options">
                      <div className="optionItem">
                        <span className="optionText">Adult</span>
                        <div className="optionCounter">
                          <button
                            disabled={options.adult <= 1}
                            className="optionCounterBtn"
                            onClick={() => handleOnChange("adult", "d")}
                          >
                            -
                          </button>
                          <span className="optionCounterNo">
                            {options.adult}
                          </span>
                          <button
                            className="optionCounterBtn"
                            onClick={() => handleOnChange("adult", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="optionItem">
                        <span className="optionText">Children</span>
                        <div className="optionCounter">
                          <button
                            disabled={options.children <= 0}
                            className="optionCounterBtn"
                            onClick={() => handleOnChange("children", "d")}
                          >
                            -
                          </button>
                          <span className="optionCounterNo">
                            {options.children}
                          </span>
                          <button
                            className="optionCounterBtn"
                            onClick={() => handleOnChange("children", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="optionItem">
                        <span className="optionText">Room</span>
                        <div className="optionCounter">
                          <button
                            disabled={options.room <= 1}
                            className="optionCounterBtn"
                            onClick={() => handleOnChange("room", "d")}
                          >
                            -
                          </button>
                          <span className="optionCounterNo">
                            {options.room}
                          </span>
                          <button
                            className="optionCounterBtn"
                            onClick={() => handleOnChange("room", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="headerSearchItem">
                  <button className="headerBtn headerSearchBtn" onClick={filter}>Search</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
