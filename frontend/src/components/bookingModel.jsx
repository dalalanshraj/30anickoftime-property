import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../api/axios";
import emailjs from "@emailjs/browser";
import modelImg from "../assets/img3.png";

export default function BookingModalContact({ listingId, onClose }) {
  const [blockedDates, setBlockedDates] = useState([]);
  const [selecting, setSelecting] = useState("checkIn");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: null,
    checkOut: null,
    message: "",
  });

  const fetchDates = () => {
    api
      .get("/calendar/blocked")
      .then((res) => setBlockedDates(res.data))
      .catch(console.log);
  };

  useEffect(() => {
    fetchDates();
  }, []);

  const isBlocked = (date) => {
    return blockedDates.some((r) => {
      const s = new Date(r.start);
      const e = new Date(r.end);
      return date >= s && date < e;
    });
  };

  const isRangeValid = (start, end) => {
    if (!start || !end) return false;

    return !blockedDates.some((r) => {
      const s = new Date(r.start);
      const e = new Date(r.end);
      return start < e && end > s;
    });
  };

  const getDayClass = (date) => {
    const today = new Date();

    if (date < today) return "past-day";
    if (isBlocked(date)) return "blocked-day";

    if (
      form.checkIn &&
      form.checkOut &&
      date >= form.checkIn &&
      date <= form.checkOut
    ) {
      return "selected-range";
    }

    return "available-day";
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setMessage("");

  if (!form.name || !form.email || !form.phone) {
    setError("Please fill all details ⚠️");
    return;
  }

  if (!form.checkIn || !form.checkOut) {
    setError("Please select dates 📅");
    return;
  }

  if (!isRangeValid(form.checkIn, form.checkOut)) {
    setError("Selected dates already booked ❌");
    return;
  }

  try {
    // ✅ 1. SAVE TO DB
   await api.post("/inquiries", {
  propertyId: listingId, // ✅ FIX

  name: form.name,
  email: form.email,
  phone: form.phone,

  Arrival: form.checkIn?.toISOString(),
  Departure: form.checkOut?.toISOString(),

  message: form.message || "",

  Adults: "",
  Kids: "",
});

    // ✅ 2. SEND EMAIL
    await emailjs.send(
      "service_abc123",
      "template_xyz456",
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        checkIn: form.checkIn.toDateString(),
        checkOut: form.checkOut.toDateString(),
        message: form.message, // ✅ ADD
      },
      "public_ABCDEF"
    );

    setMessage("Booking request sent 🚀");

    setTimeout(() => {
      onClose();
    }, 1500);

  } catch (err) {
    setError("Something went wrong ❌");
    console.log(listingId)
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
                    dayClassName={getDayClass}
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

                <button className="w-full bg-yellow-400 py-3 rounded-lg">
                  Send Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ STYLE FIX */}
      <style>{`
      .react-datepicker__day.past-day {
        background: #eee !important;
        color: #999 !important;
        pointer-events: none;
      }

      .react-datepicker__day.blocked-day {
        background: #ff4d4f !important;
        color: white !important;
        text-decoration: line-through;
        border-radius: 6px;
      }

      .react-datepicker__day.available-day {
        background: #e6fffb !important;
        border-radius: 6px;
      }

      .react-datepicker__day.selected-range {
        background: #1890ff !important;
        color: white !important;
        border-radius: 6px;
      }

      .react-datepicker__day:hover {
        background: #6366f1 !important;
        color: white !important;
      }
    `}</style>
    </>
  );
}
