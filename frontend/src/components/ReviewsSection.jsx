import { useState } from "react";

export default function ReviewsSection() {
  const [open, setOpen] = useState(false);

  // 🔥 STATIC REVIEWS
  const reviews = [
  {
    id: 1,
    title: "Excellent Experience!",
    message:
      "I just spent a month at this condo and it was great. Location was perfect...it was clean and very well appointed. I can't wait until next year!!!! Thanks Ann.",
    date: "Jan 7, 2017",
    
  },
  {
    id: 2,
    title: "Great Vacation",
    message:
      "We have used Ann for three years now!!! We love her and her condo! close to everything and on second floor so no elevator!!!",
    date: "Jun 24, 2017",
  },
  {
    id: 3,
    title: "GREAT STAY!",
    message:
      "My family had a great time. Loved being on second floor, easy access to the beach and pool area. Great location, walking distance to lots of restaurants. Most importantly Ann was just a phone call away. Thank you Ann!",
    date: "Jul 15, 2017",
  },
   {
    id: 4,
    title: "Just Peachy",
    message:
      "We thoroughly enjoyed our time in Just Peachy - #2372. It was lovely, comfortable and clean. The kitchen was well stocked with everything we needed. It was conveniently located close to the steps and the elevator. Ann was great to work with. We will stay there again!!!",
    date: "May 28, 2018",
    name
  },
];

  const preview = reviews.slice(0, 3);

  return (
    <section className="bg-[#f5f5f5] py-20 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">

  {/* 🔥 HEADER */}
  <div className="mb-14 text-center">
    <p className="uppercase text-xs tracking-[3px] text-yellow-500 mb-3">
      Testimonials
    </p>

    <h2 className="text-3xl md:text-5xl font-semibold text-gray-800">
      What Our Clients Say
    </h2>

    {/* <div className="w-16 h-[2px] bg-yellow-500 mx-auto mt-4"></div> */}
  </div>

  {/* 🔥 GRID */}
  <div className="grid md:grid-cols-2 gap-8">

    {/* 🔥 LEFT BIG CARD */}
    <div className="relative bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition duration-500">

      {/* glow */}
      <div className="absolute -inset-1 bg-yellow-400/10 blur-xl rounded-3xl"></div>

      <div className="relative">
        {/* ⭐ STARS */}
        <div className="text-yellow-500 text-lg mb-3">
          ★★★★★
        </div>

        {/* TEXT */}
        <p className="text-gray-600 leading-relaxed text-lg">
          {preview[0].message}
        </p>

        {/* USER */}
        <div className="mt-6 flex items-center gap-3">
          {/* <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
            {preview[0].name?.charAt(0)}
          </div> */}
          <p className="font-semibold text-gray-800">
            {preview[0].name}
          </p>
        </div>
      </div>
    </div>

    {/* 🔥 RIGHT STACK */}
    <div className="flex flex-col gap-6">

      {preview.slice(1).map((r) => (
        <div
          key={r.id}
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300"
        >
          {/* ⭐ */}
          <div className="text-yellow-500 mb-2 text-sm">
            ★★★★★
          </div>

          {/* TEXT */}
          <p className="text-gray-600 text-sm">
            {r.message}
          </p>

          {/* USER */}
          <div className="mt-4 flex items-center gap-2">
            {/* <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold">
              {r.name?.charAt(0)}
            </div> */}
            <p className="font-semibold text-gray-800 text-sm">
              {r.name}
            </p>
          </div>
        </div>
      ))}

    </div>

  </div>

  {/* 🔥 BUTTON */}
  <div className="flex justify-center mt-14">
    <button
      onClick={() => setOpen(true)}
      className="px-8 py-3 rounded-full bg-black text-white font-medium shadow-md hover:scale-105 hover:bg-gray-800 transition duration-300"
    >
      View All Reviews →
    </button>
  </div>

</div>

      {/* 🔥 MODAL */}
     {open && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">

    {/* MODAL BOX */}
    <div className="bg-white w-full max-w-3xl rounded-2xl p-6 relative shadow-xl">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold">
          Reviews ({reviews.length})
        </h3>

        <button
          onClick={() => setOpen(false)}
          className="text-2xl text-gray-600 hover:text-black"
        >
          ✕
        </button>
      </div>

      {/* SCROLL AREA */}
      <div className="max-h-[65vh] overflow-y-auto space-y-6 pr-2">

        {reviews.map((r) => (
          <div
            key={r.id}
            className="shadow-xl rounded-2xl p-6 bg-gray-50 hover:shadow-md transition"
          >

            {/* ⭐ STARS */}
            <div className="text-red-500 text-lg mb-2">
              {"★".repeat(5)}
            </div>

            {/* TITLE */}
            <h4 className="font-semibold text-lg mb-1">
              {r.title || "Great Vacation"}
            </h4>

            {/* MESSAGE */}
            <p className="text-gray-600 leading-relaxed">
              {r.message}
            </p>

            {/* DATE */}
            <p className="text-sm text-gray-400 mt-3">
              {r.date || "Jan 7, 2017"}
            </p>

          </div>
        ))}

      </div>
    </div>
  </div>
)}
    </section>
  );
}