
import infoImge from "../../assets/Images/1 2.jpg"

export default function InfoSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">

      {/* 🔥 FULL WIDTH IMAGE */}
      <div className="relative w-full">

        {/* IMAGE */}
        <div className="w-full h-[320px] sm:h-[420px] md:h-[520px] overflow-hidden">
          <img
            src={infoImge}
            alt="room"
            className="w-full h-full object-cover animate-slowZoom"
          />
        </div>

        {/* 🔥 CONTENT WRAPPER (aligned, not stretched) */}
        <div className="max-w-7xl mx-auto px-6 md:px-16">

          {/* 🔥 OVERLAP CARD */}
          <div className="
            mt-6 
            md:mt-0
            md:absolute 
            md:top-1/2 
            md:right-[8%] 
            md:-translate-y-1/2
            w-full 
            md:w-[420px]
          ">

          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-6 md:p-8 mt-6 md:mt-30 border border-gray-100 transition hover:shadow-[0_25px_80px_rgba(0,0,0,0.25)]">

  {/* TOP LABEL */}
  <p className="text-xs tracking-[3px] text-yellow-500 uppercase mb-2 font-medium">
    INFORMATION
  </p>

  {/* HEADING */}
  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
    Extra Charges <span className="text-yellow-500">(Mandatory)</span>
  </h2>

  {/* LIST */}
  <ul className="space-y-4">

    {/* ITEM */}
    <li className="flex items-center justify-between bg-gray-50 hover:bg-yellow-50 transition p-4  rounded-xl group">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 bg-yellow-500 rounded-full group-hover:scale-125 transition"></div>
        <span className="text-gray-800 font-medium">Deposit</span>
      </div>
      <span className="text-md font-semibold text-gray-600">$300 Fixed</span>
    </li>

    <li className="flex items-center justify-between bg-gray-50 hover:bg-yellow-50 transition p-4 rounded-xl group">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 bg-yellow-500 rounded-full group-hover:scale-125 transition"></div>
        <span className="text-gray-800 font-medium">Bed Tax</span>
      </div>
      <span className="text-md font-semibold text-gray-600">5%</span>
    </li>

    <li className="flex items-center justify-between bg-gray-50 hover:bg-yellow-100 transition p-4 rounded-xl group">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 bg-yellow-500 rounded-full group-hover:scale-125 transition"></div>
        <span className="text-gray-800 font-medium">Sales Tax</span>
      </div>
      <span className="text-md font-semibold text-gray-600">7%</span>
    </li>

    <li className="flex items-center justify-between bg-gray-50 hover:bg-yellow-50 transition p-4 rounded-xl group">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 bg-yellow-500 rounded-full group-hover:scale-125 transition"></div>
        <span className="text-gray-800 font-medium">City Tax</span>
      </div>
      <span className="text-md font-semibold text-gray-600">1%</span>
    </li>

  </ul>
</div>
          </div>

        </div>

      </div>

      {/* 🔥 SLOW ZOOM */}
      <style>
        {`
          .animate-slowZoom {
            animation: slowZoom 18s ease-in-out infinite alternate;
          }

          @keyframes slowZoom {
            0% { transform: scale(1); }
            100% { transform: scale(1.08); }
          }
        `}
      </style>

    </section>
  );
}