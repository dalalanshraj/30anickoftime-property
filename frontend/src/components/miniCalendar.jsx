import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../api/axios";

export default function DisplayCalendar() {
  const [blockedDates, setBlockedDates] = useState([]);

  useEffect(() => {
    fetchDates();
  }, []);

  const fetchDates = () => {
    api.get("/calendar/blocked")
      .then((res) => setBlockedDates(res.data))
      .catch(console.log);
  };

  const isBlocked = (date) => {
    return blockedDates.some((r) => {
      const s = new Date(r.start);
      const e = new Date(r.end);
      return date >= s && date < e;
    });
  };

const getDayClass = (date) => {
  const today = new Date();

  if (date < today) return "past-day";
  if (isBlocked(date)) return "blocked-day";

  return "available-day";
};


  return (
    <div className="w-full flex justify-center px-1 sm:px-6 py-10">

      {/* CARD */}
    <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 p-2 md:p-15 sm:p-6">

        {/* HEADING */}
       <h2 className="text-lg sm:text-xl font-semibold text-center mb-5 tracking-wide">
  Availability Calendar
</h2>

        {/* CALENDAR */}
        <DatePicker
          inline
          selected={null}
          onChange={() => {}}
          minDate={new Date()}
          dayClassName={getDayClass}
          showOtherMonths={false}
          fixedHeight
          filterDate={(date) => {
  const today = new Date();
  return date >= today && !isBlocked(date);
}}
        />

        {/* LEGEND */}
        <div className="flex justify-center gap-4 mt-5 text-sm flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-300 rounded"></span>
            Available
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded"></span>
            Booked
          </div>
        </div>

      </div>

      {/* ✅ STYLES */}
     <style>{`

/* MAIN */
.react-datepicker {
  width: 100% !important;
  max-width: 320px;
  margin: auto;
  border: none;
  font-family: inherit;
}

/* HEADER */
.react-datepicker__header {
  background: transparent;
  border-bottom: none;
}

/* MONTH */
.react-datepicker__current-month {
  font-weight: 600;
  margin-bottom: 10px;
}

/* KEEP DEFAULT ROW STRUCTURE (IMPORTANT) */
.react-datepicker__week {
  display: flex;
  justify-content: space-between;
}

/* DAY */
.react-datepicker__day,
.react-datepicker__day-name {
  width: 36px;
  height: 36px;
  line-height: 36px;
  margin: 2px;
  border-radius: 8px;
}

/* SMALL MOBILE */
@media (max-width: 400px) {
  .react-datepicker__day,
  .react-datepicker__day-name {
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
  }
}

/* DESKTOP */
@media (min-width: 768px) {
  .react-datepicker__day,
  .react-datepicker__day-name {
    width: 40px;
    height: 40px;
    line-height: 40px;
  }
}

/* COLORS */
.react-datepicker__day.past-day {
  background: #f1f1f1 !important;
  color: #aaa !important;
}

.react-datepicker__day.blocked-day {
  background: #ff4d4f !important;
  color: white !important;
}

.react-datepicker__day.available-day {
  background: #d1fae5;
}

/* HOVER */
.react-datepicker__day:hover {
  background: #6366f1 !important;
  color: white !important;
}
  .react-datepicker__day--outside-month {
  opacity: 0;
  pointer-events: none;
}

`}</style>
    </div>
  );
}