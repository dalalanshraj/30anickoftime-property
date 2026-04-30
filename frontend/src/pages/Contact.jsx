import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../api/axios";
import { IoLocation } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [blockedDates, setBlockedDates] = useState([]);
  const [selecting, setSelecting] = useState("checkIn");
  const [status, setStatus] = useState({
    type: "", // success | error
    message: "",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    adults: "1",
    kids: "0",
    checkIn: null,
    checkOut: null,
    message: "",
  });
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (!status.message) return;

    const timer = setTimeout(() => {
      setStatus({ type: "", message: "" });
    }, 4000);

    return () => clearTimeout(timer);
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      alert("Please fill all details ⚠️");
      return;
    }

    if (!form.checkIn || !form.checkOut) {
      alert("Please select dates 📅");
      return;
    }

    try {
      setLoading(true);

      // ✅ VALID PROPERTY ID (IMPORTANT)
      const PROPERTY_ID = "69f0c3c8a123456789abcd12"; // 🔥 replace this

      // ✅ DB PAYLOAD (MATCH BACKEND)
      const dbPayload = {
        property: PROPERTY_ID, // ✅ FIXED
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message || "",

        Arrival: form.checkIn,
        Departure: form.checkOut,

        Adults: form.adults,
        Kids: form.kids,
      };

      console.log("DB PAYLOAD:", dbPayload);

      // ✅ SAVE TO DB
      await api.post("/inquiries", dbPayload);

      // ✅ EMAIL PAYLOAD
      const emailPayload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        checkIn: form.checkIn.toDateString(),
        checkOut: form.checkOut.toDateString(),
        adults: form.adults,
        kids: form.kids,
        message: form.message,
      };

      // ✅ SEND EMAIL
      await emailjs.send(
        "service_x4xnlqz",
        "template_oeep0hc",
        emailPayload,
        "CRTc5BG_9M1t3EjYj",
      );

      setStatus({
        type: "success",
        message: "Booking request sent successfully ✅",
      });
      // ✅ RESET FORM
      setForm({
        name: "",
        email: "",
        phone: "",
        adults: "1",
        kids: "0",
        checkIn: null,
        checkOut: null,
        message: "",
      });
    } catch (err) {
      console.log("ERROR:", err.response?.data || err);
      setStatus({
        type: "error",
        message: err.response?.data?.error || "Something went wrong ❌",
      });
    } finally {
      setLoading(false);
    }
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
                  75 Hidden Lake Way, Santa Rosa Beach, FL 32459, USA
                </p>
              </div>

              <div className="flex items-center gap-3 justify-center md:justify-start">
                <MdEmail size={20} className="text-green-500" />
                <p className="text-sm md:text-base break-all">
                  ngnuccio@gmail.com
                </p>
              </div>

              <div className="flex items-center gap-3 justify-center md:justify-start">
                <FaPhoneAlt size={18} className="text-gray-800" />
                <p className="text-sm md:text-base">+1 (504) 717-6425</p>
              </div>
            </div>

            {/* MAP */}
            <div className="rounded-2xl overflow-hidden shadow-md w-full">
              <iframe
                className="w-full h-[250px] md:h-[350px]"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d352.46573690052213!2d-86.22364914241241!3d30.348044816062036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8893e30032959051%3A0xec3104ef19e7fc3c!2sBeyond%20The%20Sea%20(AirBnB)!5e1!3m2!1sen!2sin!4v1777564597301!5m2!1sen!2sin"
                width="600"
                height="450"
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
              <input
                placeholder="Name"
                className="input"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                placeholder="Email"
                className="input"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            {/* PHONE */}
            <input
              placeholder="Phone"
              className="input"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              {/* ADULTS */}
              <div>
                <label className="text-sm text-gray-600">Adults</label>
                <input
                  type="number"
                  min="1"
                  className="input"
                  value={form.adults}
                  onChange={(e) => setForm({ ...form, adults: e.target.value })}
                />
              </div>

              {/* KIDS */}
              <div>
                <label className="text-sm text-gray-600">Kids</label>
                <input
                  type="number"
                  min="0"
                  className="input"
                  value={form.kids}
                  onChange={(e) => setForm({ ...form, kids: e.target.value })}
                />
              </div>
            </div>

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
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            {/* BUTTON */}
            <button
              disabled={loading}
              className="w-full bg-[#FFE8BE] text-black py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              {loading ? "Sending..." : "Send Booking Request"}
            </button>
            {status.message && (
              <div
                className={`p-3 rounded-lg text-sm font-medium ${
                  status.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {status.message}
              </div>
            )}
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
          background: #5C5CFF !important;
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
