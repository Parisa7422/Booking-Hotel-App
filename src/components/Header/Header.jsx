import { useRef, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import useOutsideClick from "../../Hooks/useOutsideClick";

function Header() {
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  return (
    <div className="header">
      <div className="headerSearch">
        {/* Search Input */}
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="where to go?"
            className="headerSearchInput"
            name="destionation"
            id="destination"
          />
          <span className="seperator"></span>
        </div>
        {/* Date Calender */}
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div className="dateDropDown" onClick={() => setOpenDate(!openDate)}>
            {`${format(date[0].startDate, "MM/dd/yyyy")}`} to{" "}
            {`${format(date[0].endDate, "MM/dd/yyyy")}`}
          </div>
          {openDate && (
            <DateRange
              className="date"
              ranges={date}
              onChange={(item) => setDate([item.selection])}
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
            />
          )}
          <span className="seperator"></span>
        </div>
        {/* Option Box */}
        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
            {options.adult} adult &bull; {options.children} children &bull;{" "}
            {options.room} room
          </div>
          {openOptions && (
            <GuestOpitonList
              setOpenOptions={setOpenOptions}
              handleOptions={handleOptions}
              options={options}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn">
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default Header;

function GuestOpitonList({ options, handleOptions, setOpenOptions }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false));
  return (
    <div className="guestOptions" ref={optionsRef}>
      <OptionItem
        type="adult"
        options={options}
        handleOptions={handleOptions}
        minLimit={1}
      />
      <OptionItem
        type="children"
        options={options}
        handleOptions={handleOptions}
        minLimit={0}
      />
      <OptionItem
        type="room"
        options={options}
        handleOptions={handleOptions}
        minLimit={1}
      />
    </div>
  );
}

function OptionItem({ type, options, handleOptions, minLimit }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button className="optionCounterBtn">
          <HiMinus
            className="icon"
            disabled={options[type] <= minLimit}
            onClick={() => {
              handleOptions(type, "dec");
            }}
          />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button className="optionCounterBtn">
          <HiPlus
            className="icon"
            onClick={() => {
              handleOptions(type, "inc");
            }}
          />
        </button>
      </div>
    </div>
  );
}
