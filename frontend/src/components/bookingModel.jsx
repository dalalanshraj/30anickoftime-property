import { useEffect, useState, useMemo, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../api/axios";
import emailjs from "@emailjs/browser";
import modelImg from "../assets/img3.jpg";

export default function BookingModalContact({ listingId, onClose }) {
  const [calendarDates, setCalendarDates] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [selecting, setSelecting] = useState("checkIn");

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    adults: 1,
    kids: 0,
    checkIn: null,
    checkOut: null,
    message: "",
  });

  // =====================================
  // FETCH CALENDAR
  // =====================================

  useEffect(() => {
    if (listingId) {
      fetchDates();
    }
  }, [listingId]);

  const fetchDates = async () => {
    try {
      const res = await api.get(`/calendar/${listingId}/calendar`);

      setCalendarDates(res.data.calendar || []);
    } catch (err) {
      console.log(err);
    }
  };

  // =====================================
  // DATE FORMAT
  // =====================================

  // =====================================
  // MAP
  // =====================================

  const formatLocalDate = (date) => {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Chicago",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(date));
  };

  // =====================================
  // BLOCKED MAP
  // =====================================

  const blockedMap = useMemo(() => {
    const map = {};

    calendarDates.forEach((item) => {
      const itemDate = new Date(
        new Date(item.date).toLocaleString("en-US", {
          timeZone: "America/Chicago",
        }),
      );

      const key = formatLocalDate(itemDate);

      if (!map[key]) {
        map[key] = [];
      }

      map[key].push(item.status);
    });

    return map;
  }, [calendarDates]);

  // =====================================
  // DATE TYPE
  // =====================================

  const getDateType = useCallback(
    (date) => {
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      const currentDate = new Date(date);

      currentDate.setHours(0, 0, 0, 0);

      // PAST
      if (currentDate < today) {
        return "past-day";
      }

      // CURRENT KEY
      const currentKey = formatLocalDate(currentDate);

      const statuses = blockedMap[currentKey] || [];

      const hasCIN = statuses.includes("CIN");

      const hasCOUT = statuses.includes("COUT");

      const hasR = statuses.includes("R");

      const hasH = statuses.includes("H");

      // =====================================
      // PREVIOUS DAY
      // =====================================

      const prevDay = new Date(currentDate);

      prevDay.setDate(prevDay.getDate() - 1);

      const prevKey = formatLocalDate(prevDay);

      const prevStatuses = blockedMap[prevKey] || [];

      const prevHasBooking =
        prevStatuses.includes("R") || prevStatuses.includes("COUT");

      // =====================================
      // TURNOVER
      // =====================================

      // SAME DAY
      if (hasCIN && hasCOUT) {
        return "turnover-day";
      }

      // PREVIOUS DAY BOOKED
      // + CURRENT CHECKIN
      if (hasCIN && prevHasBooking) {
        return "turnover-day";
      }

      // CHECK-IN
      if (hasCIN) {
        return "checkin-day";
      }

      // CHECK-OUT
      if (hasCOUT) {
        return "checkout-day";
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
    },
    [blockedMap],
  );

  const isDateSelectable = (date) => {
    const type = getDateType(date);

    // ❌ BLOCK THESE
    if (type === "blocked-day" || type === "hold-day" || type === "past-day") {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const propertyId = listingId || id;

    if (!propertyId) {
      aa;
      alert("Property not found ❌");
      return;
    }

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

      const dbPayload = {
        property: propertyId, // ✅ FIXED
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message || "",

        Arrival: form.checkIn,
        Departure: form.checkOut,

        Adults: form.adults,
        Kids: form.kids,
      };

      console.log("SENDING:", dbPayload);

      await api.post("/inquiries", dbPayload);

      const emailPayload = {
          to_email:
    "pattisnuccio@gmail.com",
        name: form.name,
        email: form.email,
        phone: form.phone,
        checkIn: form.checkIn.toDateString(),
        checkOut: form.checkOut.toDateString(),
        adults: form.adults,
        kids: form.kids,
        message: form.message,
      };

      await emailjs.send(
        "service_x4xnlqz",
        "template_oeep0hc",
        emailPayload,
        "CRTc5BG_9M1t3EjYj",
      );

      alert("Booking request sent ✅");
    } catch (err) {
      console.log("ERROR:", err.response?.data || err);
      alert(err.response?.data?.error || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  const nights =
    form.checkIn && form.checkOut
      ? Math.ceil((form.checkOut - form.checkIn) / (1000 * 60 * 60 * 24))
      : 0;

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[99999] p-4">
        <div className="w-full max-w-5xl h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex">
          {/* LEFT IMAGE */}
          <div className="hidden md:block md:w-1/2 h-48 md:h-full">
            <img src={modelImg} className="w-full h-full object-cover" />
          </div>

          {/* RIGHT */}
          <div className="w-full md:w-1/2 h-full flex flex-col">
            {/* HEADER */}
            <div className="relative p-5">
              <h2 className="text-2xl font-semibold text-center">
                Book Your Stay
              </h2>

              {/* ❌ CLOSE ICON */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-2xl hover:scale-110"
              >
                ✕
              </button>
            </div>

            {/* SCROLL */}
            <div className="flex-1 overflow-y-auto p-5">
              {/* 🔥 MESSAGE */}
              {error && (
                <div className="bg-red-100 text-red-600 p-2 rounded mb-3 text-sm">
                  {error}
                </div>
              )}

              {message && (
                <div className="bg-green-100 text-green-600 p-2 rounded mb-3 text-sm">
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  placeholder="Name"
                  className="w-full border p-3 rounded-lg"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                  placeholder="Email"
                  className="w-full border p-3 rounded-lg"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                  placeholder="Phone"
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
                    // ✅ IMPORTANT
                    filterDate={f}
                  />
                </div>
                <textarea
                  placeholder="Your Message"
                  className="w-full border p-3 rounded-lg"
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />

                {nights > 0 && (
                  <p className="text-sm text-gray-600">
                    {nights} nights selected
                  </p>
                )}
                <p className=" text-sm mt-2 text-black">
                  Cleaning Fee - 850 - Mandatory
                </p>
                <button className="w-full bg-[#FFE8BE] py-3 rounded-lg">
                  Send Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ STYLE FIX */}
      {/* STYLES */}
      <style>{` 
     

.react-datepicker {
  border: none;
  width: 100%;
  max-width: 320px;
  margin: auto;
}

.react-datepicker__header {
  background: white;
  border-bottom: none;
}

.react-datepicker__current-month {
  font-weight: 700;
  margin-bottom: 10px;
}

.react-datepicker__week {
  display: flex;
  justify-content: space-between;
}

.react-datepicker__day,
.react-datepicker__day-name {
  width: 38px;
  height: 38px;
  line-height: 38px;
  margin: 2px;
  border-radius: 8px;
  position: relative;
}

/* AVAILABLE */
.react-datepicker__day.available-day {
  background: #d1fae5 !important;
  color: black !important;
}

/* BOOKED */
.react-datepicker__day.blocked-day {
  background: #5C5CFF !important;
  color: white !important;
}

/* HOLD */
.react-datepicker__day.hold-day {
  background: #facc15 !important;
  color: black !important;
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
