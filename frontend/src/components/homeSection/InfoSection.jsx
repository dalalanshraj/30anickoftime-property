
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

            <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-6 md:p-8 mt-0 md:mt-70">

              <p className="text-xs tracking-widest text-gray-500 uppercase mb-3">
                Important Information
              </p>

              <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                What you need to know
              </h2>

              <ul className="space-y-4 text-gray-700 text-sm md:text-base">
                <li className="flex gap-3">
                  <span className="mt-2 w-2 h-2 bg-black rounded-full"></span>
                  Additional people may incur additional fees depending on policy.
                </li>

                <li className="flex gap-3">
                  <span className="mt-2 w-2 h-2 bg-black rounded-full"></span>
                  Government-issued ID required at check-in.
                </li>

                <li className="flex gap-3">
                  <span className="mt-2 w-2 h-2 bg-black rounded-full"></span>
                  Special requests subject to availability.
                </li>

                <li className="flex gap-3">
                  <span className="mt-2 w-2 h-2 bg-black rounded-full"></span>
                  Parties or group events are prohibited.
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