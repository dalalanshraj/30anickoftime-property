import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../api/axios";
import { IoLocation } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import imgthree from "../assets/4-2.jpg";

export default function Contact({listingId}) {
 const [calendarDates, setCalendarDates] = useState([]);
 const [listing, setListing] = useState(null);
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

  useEffect(() => {

  if (!listingId) return;

  api
    .get(`/listings/${listingId}`)

    .then((res) => {

    

      setListing(res.data);

    })

    .catch(console.log);

}, [listingId]);

const locationName =
  listing?.location?.address ||
  "Location not available";

const email =
 

   listing?.property?.email ||
  "Email not available";

const phone =
  listing?.property?.phone ||
  "Phone not available";

  // 🔥 FETCH BLOCKED DATES (ICAL API)
  const LISTING_ID = "69f0c3cd2203c21d5f9f323f";

useEffect(() => {

  api
    .get(`/calendar/${LISTING_ID}/calendar`)
    .then((res) => {

      setCalendarDates(
        res.data.calendar || []
      );

    })
    .catch(console.log);

}, []);


 const normalizeDate = (date) => {

  const d = new Date(date);

  return `${d.getFullYear()}-${
    d.getMonth()
  }-${d.getDate()}`;

};
  // 🔥 DAY STYLE
  const getDateType = (date) => {

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const currentDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  // PAST
  if (currentDate < today) {
    return "past-day";
  }

  const currentKey =
    normalizeDate(currentDate);

  const currentItems =
    calendarDates.filter(
      (item) =>
        normalizeDate(item.date)
        === currentKey
    );

  const statuses =
    currentItems.map(
      (i) => i.status
    );

  const hasCIN =
    statuses.includes("CIN");

  const hasCOUT =
    statuses.includes("COUT");

  const hasR =
    statuses.includes("R");

  const hasH =
    statuses.includes("H");

  // TURNOVER
  if (hasCIN && hasCOUT) {
    return "turnover-day";
  }

  // CHECKOUT
  if (hasCOUT) {
    return "checkout-day";
  }

  // CHECKIN
  if (hasCIN) {
    return "checkin-day";
  }

  // BOOKED
  if (hasR) {
    return "blocked-day";
  }

  // HOLD
  if (hasH) {
    return "hold-day";
  }

  return "available-day";

};
 const isDateSelectable = (date) => {
    const type = getDateType(date);

    // ❌ BLOCK THESE
    if (type === "blocked-day" || type === "hold-day" || type === "past-day") {
      return false;
    }

    return true;
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
    const emails = [
  listing?.property?.email,
  listing?.property?.altEmail,
]
  .filter(Boolean)
  .join(",");

console.log("EMAILS:", emails);

const emailPayload = {
  to_email: emails,

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
  const nights =
    form.checkIn && form.checkOut
      ? Math.ceil((form.checkOut - form.checkIn) / (1000 * 60 * 60 * 24))
      : 0;

      const image1 = imgthree;

  return (
    <>
      {/* 🔥 HERO */}
      <section className="relative h-[50vh] flex items-center justify-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
           style={{
            backgroundImage: `url(${image1})`,
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
                  {locationName}
                </p>
              </div>

              <div className="flex items-center gap-3 justify-center md:justify-start">
                <MdEmail size={20} className="text-green-500" />
                <p className="text-sm md:text-base break-all">
                  {email}
                </p>
              </div>

              <div className="flex items-center gap-3 justify-center md:justify-start">
                <FaPhoneAlt size={18} className="text-gray-800" />
                <p className="text-sm md:text-base"> {phone}</p>
              </div>
            </div>

            {/* MAP */}
            <div className="rounded-2xl overflow-hidden shadow-md w-full">
              <iframe
                className="w-full h-[250px] md:h-[350px]"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d910.0912488140774!2d-86.2241231303864!3d30.347998698423265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8893e24e34b3b287%3A0x17987ac8d55902ef!2s80%20Brentwood%20Ln%2C%20Santa%20Rosa%20Beach%2C%20FL%2032459%2C%20USA!5e1!3m2!1sen!2sin!4v1777924128610!5m2!1sen!2sin"
                width="600"
                height="450"
              ></iframe>
            </div>
          </div>

          {/* RIGHT FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              placeholder="Name"
              value={form.name}
              className="w-full border p-3 rounded-lg"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="Email"
              className="w-full border p-3 rounded-lg"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              placeholder="Phone"
              value={form.phone}
              className="w-full border p-3 rounded-lg"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            {/* Guests */}
            <div className="flex gap-3">
              {/* Adults */}
              <div className="w-full">
                <label className="text-sm text-gray-500">Adults</label>
                <input
                  type="number"
                  min="1"
                  value={form.adults}
                  className="w-full border p-3 rounded-lg"
                  onChange={(e) =>
                    setForm({ ...form, adults: Number(e.target.value) })
                  }
                />
              </div>

              {/* Kids */}
              <div className="w-full">
                <label className="text-sm text-gray-500">Kids</label>
                <input
                  type="number"
                  min="0"
                  value={form.kids}
                  className="w-full border p-3 rounded-lg"
                  onChange={(e) =>
                    setForm({ ...form, kids: Number(e.target.value) })
                  }
                />
              </div>
            </div>
            {/* DATE */}
            <div className="flex gap-3">
              <div
                onClick={() => setSelecting("checkIn")}
                className="w-full p-3 border rounded-lg text-center cursor-pointer"
              >
                {form.checkIn ? form.checkIn.toDateString() : "Check-in"}
              </div>

              <div
                onClick={() => setSelecting("checkOut")}
                className="w-full p-3 border rounded-lg text-center cursor-pointer"
              >
                {form.checkOut ? form.checkOut.toDateString() : "Check-out"}
              </div>
            </div>

            {/* CALENDAR */}
            <div className="border rounded-xl p-2 ">
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
                minDate={new Date()}
                dayClassName={getDateType}
                 filterDate={isDateSelectable}
              />
            </div>
            <textarea
              placeholder="Your Message"
               value={form.message}
              className="w-full border p-3 rounded-lg"
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />

            {nights > 0 && (
              <p className="text-sm text-gray-600">{nights} nights selected</p>
            )}
            <p className=" text-sm mt-2 text-black">
              Cleaning Fee - 850 - Mandatory
            </p>
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
           <button
  disabled={loading}
  className="w-full bg-[#FFE8BE] py-3 rounded-lg disabled:opacity-50"
>
  {loading ? "Sending..." : "Send Booking"}
</button>
          </form>
        </div>
      </section>

      {/* 🔥 STYLES */}
      <style>{`

/* MAIN */
.react-datepicker {
  width: 100% !important;
  overflow: hidden;
  position: relative;
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
  background: #5C5CFF !important;
  text-decoration: line-through;
  color: white !important;
}

/* CHECK-IN */
.react-datepicker__day.checkin-day {

  background: linear-gradient(
    135deg,
    #d1fae5 50%,
    #5C5CFF 50%
  ) !important;

  color: black !important;
}

/* CHECK-OUT */
.react-datepicker__day.checkout-day {

  background: linear-gradient(
    315deg,
    #d1fae5 50%,
    #5C5CFF 50%
  ) !important;

  color: black !important;
}

.react-datepicker__day.turnover-day {

  position: relative !important;

  isolation: isolate;

  overflow: hidden !important;

  color: black !important;

  z-index: 10 !important;
}

.react-datepicker__day.turnover-day::before {

  content: "";

  position: absolute;

  inset: 0;

  border-radius: 8px;

  background: linear-gradient(
    to bottom right,
    #5C5CFF 0%,
    #5C5CFF 49%,
    #5C5CFF 51%,
    #5C5CFF 100%
  );

  z-index: -1;
}

.react-datepicker__day.turnover-day::after {

  content: "";

  position: absolute;

  width: 180%;

  height: 3px;

  background: black;

  top: 50%;

  left: -40%;

  transform: rotate(-45deg);

  z-index: 20;
}
  

/* TEXT ABOVE */
.react-datepicker__day.turnover-day span,
.react-datepicker__day.turnover-day {

  position: relative;

  z-index: 10;
}

/* PAST */
.react-datepicker__day.past-day {

  background: #f1f5f9 !important;

  color: #94a3b8 !important;

  opacity: 0.7 !important;

  cursor: not-allowed !important;
}

/* OUTSIDE */
.react-datepicker__day--outside-month {

  visibility: hidden !important;

  pointer-events: none !important;
}

      `}</style>
    </>
  );
}
