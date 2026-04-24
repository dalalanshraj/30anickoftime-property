import { useEffect, useState } from "react";
import AboutSection from "../components/homeSection/About";
import InfoSection from "../components/homeSection/InfoSection";
import Properties from "./Properties";
import GallerySection from "../components/gallarySection";
import bgImage from "../assets/img.png";
import bgImagetwo from "../assets/img2.png";
import imgthree from "../assets/img4.png";
import AmenitiesSection from "../components/homeSection/amenitiesSection";
import api from "../api/axios.js";

export default function Hero({ listing }) {
  const [offset, setOffset] = useState(0);
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    api
      .get("/listings/published")
      .then((res) => {
        const data = res.data || [];

        // 👉 first listing (या featured logic बाद में)
        setFeatured(data[0]);
      })
      .catch(console.log);
  }, []);
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const image = featured?.photos?.[0]
    ? `${BASE_URL}${featured.photos[7]}`
    : bgImagetwo;

  const title = featured?.property?.title || "Luxury Villa";

  const beds = featured?.property?.beds || 4;
  const baths = featured?.property?.baths || 3;

  const price =
    featured?.deal?.discountedRate || featured?.rates?.[0]?.nightly || 320;

  // smooth parallax (controlled)
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.3);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section className="relative h-[90vh] w-full overflow-hidden">
        {/* 🔥 Background Layer */}
        <div
          className="absolute inset-0 scale-110"
          style={{
            transform: `translateY(${offset}px) scale(1.1)`,
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* 🔥 Gradient Overlay (depth feel) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

        {/* 🔥 Noise / texture feel */}
        <div className="absolute inset-0 backdrop-blur-[1px]" />

        {/* 🔥 Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-6 md:px-16">
          {/* LEFT CONTENT */}
          <div className="max-w-xl text-white mt-24 md:mt-0">
            <p className="uppercase tracking-widest text-yellow-400 text-xs mb-4">
              Luxury Vacation Homes
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6">
              Experience Coastal Living Like Never Before
            </h1>

            <p className="text-gray-300 text-sm md:text-lg mb-8">
              Premium vacation homes designed for comfort, style, and
              unforgettable memories.
            </p>

            <div className="flex gap-4 flex-wrap">
              <button className="px-6 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:scale-105 transition">
                Book Now
              </button>

              {/* <button className="px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition">
              Explore →
            </button> */}
            </div>
          </div>

          {/* 🔥 FLOATING CARD (NOT BASIC IMAGE) */}
          <div className="hidden md:flex relative">
            <div className="absolute -inset-4 bg-yellow-400/20 blur-2xl rounded-3xl"></div>

            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-4 shadow-2xl animate-float">
              {/* IMAGE */}
              <img
                src={image}
                alt="villa"
                className="rounded-2xl w-[420px] h-[260px] object-cover"
              />

              {/* CONTENT */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-xl p-3 flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold">{title}</p>

                  <p className="text-xs text-gray-500">
                    {beds} Beds • {baths} Baths
                  </p>
                </div>

                <span className="text-sm font-bold">${price}/night</span>
              </div>
            </div>
          </div>
        </div>

        {/* 🔥 Bottom Fade */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />

        {/* 🔥 Custom Animation */}
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
      <AboutSection listingId="69e92090f574cf8f9e1a555d" />
      <InfoSection />
      <Properties />
      <section className="w-full py-16 md:py-24 px-6 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* 🔥 IMAGE (LEFT) */}
          <div className="relative group overflow-hidden rounded-2xl">
            <img
              src={imgthree}
              alt="property"
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover transition duration-700 group-hover:scale-105"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition"></div>
          </div>

          {/* 🔥 CONTENT (RIGHT) */}
          <div>
            <p className="uppercase tracking-widest text-yellow-500 text-xs mb-4">
              About Property
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 leading-tight">
              Beachfront Rental Properties
            </h2>

            <p className="text-gray-600 leading-relaxed mb-8">
              Welcome to <strong className="text-green-500">Just Beachy</strong>{" "}
              , your perfect escape to a stunning beachfront paradise where
              comfort meets coastal charm. Nestled right along the shoreline,
              this beautiful rental property offers breathtaking ocean views,
              soothing sea breezes, and direct access to golden sandy beaches.
              Whether you're planning a relaxing getaway, a romantic retreat, or
              a fun-filled family vacation,{" "}
              <strong className="text-green-500">Just Beachy</strong> is
              designed to make every moment unforgettable.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              The property features modern interiors, spacious living areas, and
              thoughtfully designed amenities to ensure a comfortable and
              luxurious stay. Wake up to the sound of waves, enjoy your morning
              coffee with a sea view, and unwind in the evening with mesmerizing
              sunsets right from your balcony.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              At <strong className="text-green-500">Just Beachy</strong>, every
              detail is crafted to give you a true beachfront living experience
              — peaceful, refreshing, and truly memorable.
            </p>

            {/* <button className="px-6 py-3 rounded-full bg-black text-white hover:bg-gray-800 transition">
              Explore More →
            </button> */}
          </div>
        </div>
      </section>
      <AmenitiesSection />

      <GallerySection listingId={listing?._id} />
    </>
  );
}
