import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../api/axios";
import { IoLocation } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

export default function Contact() {
  const [blockedDates, setBlockedDates] = useState([]);
  const [selecting, setSelecting] = useState("checkIn");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: null,
    checkOut: null,
    message: "",
  });

  // 🔥 FETCH BLOCKED DATES (ICAL API)
  useEffect(() => {
    api
      .get("/calendar/blocked")
      .then((res) => setBlockedDates(res.data))
      .catch(console.log);
  }, []);

  // 🔥 CHECK BLOCKED
  const isBlocked = (date) => {
    return blockedDates.some((r) => {
      const s = new Date(r.start);
      const e = new Date(r.end);
      return date >= s && date < e;
    });
  };

  // 🔥 DAY STYLE
  const getDayClass = (date) => {
    const today = new Date();

    if (date < today) return "past-day";
    if (isBlocked(date)) return "blocked-day";

    return "available-day";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Booking request sent ");
  };

  return (
    <>
      {/* 🔥 HERO */}
      <section className="relative h-[50vh] flex items-center justify-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1505691938895-1758d7feb511')",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative text-center px-6">
          <h1 className="text-3xl md:text-5xl font-semibold mb-4">
            Contact & Booking
          </h1>
        </div>
      </section>

      {/* 🔥 SECTION */}
   <section className="py-10 md:py-16 px-4 sm:px-6 md:px-16 bg-white">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">

    {/* LEFT */}
    <div className="w-full">
      <h2 className="text-3xl md:text-5xl font-semibold text-gray-800">
        Get in Touch
      </h2>

      <p className="text-gray-600 mb-6 text-center md:text-left">
        Plan your stay with live availability calendar.
      </p>

      <div className="space-y-4 text-gray-700 mb-6">
        <div className="flex items-center gap-3 justify-center md:justify-start">
          <IoLocation size={20} className="text-red-500" />
          <p className="text-sm md:text-base">
            8120 Lydia Ln, Panama City, FL
          </p>
        </div>

        <div className="flex items-center gap-3 justify-center md:justify-start">
          <MdEmail size={20} className="text-green-500" />
          <p className="text-sm md:text-base break-all">
            annphillipspcb@yahoo.com
          </p>
        </div>

        <div className="flex items-center gap-3 justify-center md:justify-start">
          <FaPhoneAlt size={18} className="text-gray-800" />
          <p className="text-sm md:text-base">
            +1 850 653 6900
          </p>
        </div>
      </div>

      {/* MAP */}
      <div className="rounded-2xl overflow-hidden shadow-md w-full">
        <iframe
          className="w-full h-[250px] md:h-[350px]"
          src="https://www.google.com/maps/embed?pb=!1m18..."
          loading="lazy"
        ></iframe>
      </div>
    </div>

    {/* RIGHT FORM */}
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl space-y-4 md:space-y-5 border border-gray-100"
    >
      {/* NAME + EMAIL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input placeholder="Name" className="input" />
        <input placeholder="Email" className="input" />
      </div>

      {/* PHONE */}
      <input placeholder="Phone" className="input" />

      {/* DATES */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div
          onClick={() => setSelecting("checkIn")}
          className="input cursor-pointer text-center"
        >
          {form.checkIn ? form.checkIn.toDateString() : "Check-in"}
        </div>

        <div
          onClick={() => setSelecting("checkOut")}
          className="input cursor-pointer text-center"
        >
          {form.checkOut ? form.checkOut.toDateString() : "Check-out"}
        </div>
      </div>

      {/* CALENDAR */}
      <div className="border rounded-lg p-2 overflow-x-auto">
        <DatePicker
          inline
          selectsRange
          startDate={form.checkIn}
          endDate={form.checkOut}
          onChange={(dates) => {
            const [start, end] = dates;

            if (selecting === "checkIn") {
              setForm({
                ...form,
                checkIn: start,
                checkOut: null,
              });
              setSelecting("checkOut");
            } else {
              setForm({
                ...form,
                checkIn: form.checkIn,
                checkOut: end,
              });
            }
          }}
          filterDate={(d) => !isBlocked(d) && d >= new Date()}
          dayClassName={getDayClass}
        />
      </div>

      {/* MESSAGE */}
      <textarea
        rows="4"
        placeholder="Write your message..."
        className="input resize-none"
      />

      {/* BUTTON */}
      <button className="w-full bg-yellow-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
        Send Booking Request
      </button>
    </form>
  </div>
</section>

      {/* 🔥 STYLES */}
      <style>{`
       .input {
  width: 100%;
  border: 1px solid #e5e7eb;
  padding: 14px;
  border-radius: 12px;
  background: #fafafa;
  transition: all 0.3s ease;
  font-size: 14px;
}

.input:focus {
  outline: none;
  border-color: #6366f1;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

        .past-day {
          color: #aaa !important;
          pointer-events: none;
        }

        .blocked-day {
          background: #ff4d4f !important;
          color: white !important;
          text-decoration: line-through;
        }

        .available-day {
          background: #d1fae5;
        }
      `}</style>
    </>
  );
}
