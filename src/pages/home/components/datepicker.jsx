import React,{ useState, useRef, useEffect } from "react";

import DatePicker from "react-datepicker";
import { CiCalendar } from "react-icons/ci";
import "react-datepicker/dist/react-datepicker.css";

export default function ButtonDatePicker () {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef} className="position-relative d-inline-block">
      <button
        type="button"
        class="btn btn-outline-light d-flex px-4 py-1 gap-3"
        onClick={() => setOpen(!open)}
      >
        <CiCalendar fontSize={30} />
        <span className="d-flex align-items-center ml-2">
          {startDate ? startDate.toLocaleDateString() : "Start"} -{" "}
          {endDate ? endDate.toLocaleDateString() : "End"}
        </span>
      </button>

      {open && (
        <div
          className=" mt-2 shadow bg-white rounded p-2"
          style={{ zIndex: 1050, minWidth:"100%" }}
        >
          <DatePicker
            selected={startDate}
            onChange={(dates) => {
              const [start, end] = dates;
              setStartDate(start);
              setEndDate(end);
            }}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
        </div>
      )}
    </div>
  );
};

