import { useEffect, useState } from "react";
import AboutSection from "../components/homeSection/About";
import InfoSection from "../components/homeSection/InfoSection";
import Properties from "./Properties";
import GallerySection from "../components/gallarySection";
import AmenitiesSection from "../components/homeSection/amenitiesSection";
import api from "../api/axios.js";

import bgImage from "../assets/img4.png";
import bgImagetwo from "../assets/img2.png";
import imgthree from "../assets/img4.png";

import BookingModalContact from "../components/bookingModel.jsx";
import FeesTable from "../components/FeesTable.jsx";
import ReviewsSection from "../components/ReviewsSection.jsx";
import { Link } from "react-router-dom";

export default function Hero() {
  const [offset, setOffset] = useState(0);
  const [featured, setFeatured] = useState(null);
  const [open, setOpen] = useState(false);
  // const [listing, setListing] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL;

  // ✅ Helper (safe URL)
  const getImageUrl = (path) => `${BASE_URL?.replace(/\/$/, "")}${path}`;

  // ===========================
  // FETCH FEATURED LISTING
  // ===========================
  useEffect(() => {
    api
      .get("/listings/published")
      .then((res) => {
        const data = res.data || [];
        setFeatured(data[0]); // first listing
      })
      .catch(console.log);
  }, []);

  // ===========================
  // DATA SAFE EXTRACTION
  // ===========================
  const image = featured?.photos?.[0]
    ? getImageUrl(featured.photos[0])
    : bgImagetwo;

  const title = featured?.property?.title || "Luxury Villa";
  const beds = featured?.property?.beds || 4;
  const baths = featured?.property?.baths || 3;

  const price =
    featured?.deal?.discountedRate || featured?.rates?.[0]?.nightly || 320;

  // ===========================
  // PARALLAX
  // ===========================
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.3);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section className="relative h-[75vh] md:h-[90vh] w-full overflow-hidden">
        {/* BG */}
        <div
          className="absolute inset-0 backdrop-blur-[1px] pointer-events-none z-0"
          style={{
            transform: `translateY(${offset}px) scale(1.1)`,
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-transparent" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-6 md:px-16">
          {/* LEFT */}
          <div className="max-w-xl text-white mt-34 md:mt-24">
            <p className="uppercase tracking-widest text-yellow-400 text-xs mb-4">
              Luxury Vacation Homes
            </p>

            <h1 className="text-4xl md:text-7xl font-bold mb-6">
              Experience Coastal Living Like Never Before
            </h1>

            <p className="text-gray-300 mb-8">
              Premium vacation homes designed for comfort, style, and
              unforgettable memories.
            </p>

            <button
              onClick={() => {
                console.log("CLICKED");
                setOpen(true);
              }}
              className="px-6 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:scale-105 transition"
            >
              Book Now
            </button>
          </div>

          {/* FLOATING CARD */}
          <div className="hidden md:flex relative">
            <div className="absolute -inset-4 bg-yellow-400/20 blur-2xl rounded-3xl"></div>

           <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-4 shadow-2xl animate-float">
              <img
                src={image}
                alt="villa"
                className="rounded-2xl w-[420px] h-[260px] object-cover"
              />

              <div className="absolute bottom-4 left-4 right-4 bg-white/90 rounded-xl p-3 flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="text-xs text-gray-500">
                    {beds} Beds • {baths} Baths
                  </p>
                </div>

                {/* <span className="text-sm font-bold">${price}/night</span> */}
              </div>
            </div>
          
          </div>
        </div>

        {/* ANIMATION */}
        <style>
          {`
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          @keyframes float {
            0%,100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
        `}
        </style>
      </section>

      {/* MODAL */}
   {open && featured && (
  <BookingModalContact
    onClose={() => setOpen(false)}
    listingId={featured._id} // ✅ सही
  />
)}
      {/* OTHER SECTIONS */}
      <AboutSection listingId="69e92090f574cf8f9e1a555d" />
      {/* <FeesTable /> */}
      <InfoSection />
      <Properties />

      <section className="py-16 px-6 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <img
            src={imgthree}
            className="rounded-2xl w-full h-[400px] object-cover"
          />

          <div>
             <p className="uppercase text-xs tracking-[3px] text-yellow-500 mb-3">Beachfront</p>
          <h3 className="text-3xl md:text-5xl font-semibold text-gray-800 mb-8">
              Beachfront Rental Properties
            </h3>
            <p className="text-gray-600">
              Just Beachy Rental Properties provide the perfect getaway for those seeking relaxation and scenic beauty by the ocean. Wake up to stunning sunrise views, enjoy the calming sound of waves, and unwind in a peaceful coastal atmosphere. These properties are designed with comfort in mind, offering modern amenities, stylish interiors, and spacious living areas. Guests can take advantage of direct beach access, making it easy to enjoy morning walks, water activities, or simply relax by the shore. Ideal for families, couples, or solo travelers, beachfront rentals create a memorable experience filled with comfort, privacy, and the natural charm of seaside living.

            </p>
          </div>
        </div>
      </section>

      <AmenitiesSection />
      <GallerySection />
      <ReviewsSection  />
    </>
  );
}
