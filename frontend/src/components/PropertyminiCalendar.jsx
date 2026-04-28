import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../api/axios";

export default function PropertyminiCalendar() {
  const [blockedDates, setBlockedDates] = useState([]);

  useEffect(() => {
    fetchDates();
  }, []);

  const fetchDates = () => {
    api
      .get("/calendar/blocked")
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
    <div className="w-full">
      {/* HEADING */}
      <h3 className="text-lg font-semibold text-center mb-4">
        Availability Calendar
      </h3>

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
      <div className="flex justify-center gap-4 mt-4 text-xs flex-wrap">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-300 rounded"></span>
          Available
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded"></span>
          Booked
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .react-datepicker {
          width: 100% !important;
          border: none;
        }

        .react-datepicker__header {
          background: transparent;
          border-bottom: none;
        }

        .react-datepicker__current-month {
          font-weight: 600;
          margin-bottom: 10px;
        }

        .react-datepicker__week {
          display: flex;
          justify-content: space-between;
        }

        .react-datepicker__day,
        .react-datepicker__day-name {
          width: 36px;
          height: 36px;
          line-height: 36px;
          margin: 2px;
          border-radius: 8px;
        }

        @media (max-width: 400px) {
          .react-datepicker__day,
          .react-datepicker__day-name {
            width: 30px;
            height: 30px;
            line-height: 30px;
            font-size: 12px;
          }
        }

        @media (min-width: 768px) {
          .react-datepicker__day,
          .react-datepicker__day-name {
            width: 40px;
            height: 40px;
            line-height: 40px;
          }
        }

        .react-datepicker__day.past-day {
          background: #f3f4f6 !important;
          color: #9ca3af !important;
        }

        .react-datepicker__day.blocked-day {
          background: #ef4444 !important;
          color: white !important;
        }

        .react-datepicker__day.available-day {
          background: #bbf7d0;
        }

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
