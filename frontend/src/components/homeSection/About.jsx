import { useEffect, useState } from "react";
import api from "../../api/axios";
import DisplayCalendar from "../miniCalendar";
import { Link } from "react-router-dom";

export default function AboutSection({ listingId }) {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (path) => {
    if (!path || typeof path !== "string") return "";

    const base = import.meta.env.VITE_API_URL || "";

    // already full URL
    if (path.startsWith("http")) return path;

    return base.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
  };

  // ===========================
  // FETCH LISTING
  // ===========================
  useEffect(() => {
    if (!listingId) return;

    api
      .get(`/listings/${listingId}`)
      .then((res) => {
        setListing(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [listingId]);

  // ===========================
  // LOADING UI
  // ===========================
  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">Loading property...</div>
    );
  }

  if (!listing) {
    return (
      <div className="py-20 text-center text-red-500">Property not found</div>
    );
  }

  // ===========================
  // 🔥 ACTIVE RATE LOGIC
  // ===========================
  const today = new Date();

  const activeRate = listing?.rates?.find((rate) => {
    const from = new Date(rate.from);
    const to = new Date(rate.to);
    return today >= from && today <= to;
  });

  const rate = activeRate || listing?.rates?.[0] || {};

  const nightly = rate?.nightly || "N/A";
  const minNights = rate?.minNights || 1;

  // ===========================
  // IMAGE
  // ===========================
  const image =
    listing?.photos?.length > 0
      ? getImageUrl(listing.photos[0])
      : "https://via.placeholder.com/600x400";

  return (
    <section className="w-full bg-[#f8f8f8] py-20 px-6 md:px-16">
      {/* ================= TOP ================= */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* RIGHT CALENDAR */}

        <DisplayCalendar />
        {/* LEFT CONTENT */}
        <div>
          <p className="uppercase text-xs tracking-[3px] mx-1  text-[#2f9bad] mb-3">
            {listing?.property?.title || "Welcome"}
          </p>

          <h2 className="text-3xl md:text-5xl font-semibold text-gray-800">
            {listing?.property?.tagline ||
              "Modern Comfort Meets Relaxing Living"}
          </h2>

          <p className="text-gray-600 text-base mt-2">
            {listing?.property?.summary ||
              "10BR/3BA • Pool • Lagoon Front"}
          </p>
          <Link to={"/booking-policy"}>
            <button className="px-6 py-3 mt-3 bg-[#FFE8BE] text-black rounded-full font-semibold hover:scale-105 transition">
              Booking Policy
            </button>
          </Link>
        </div>

      
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 mt-20 items-center">

          {/* TEXT */}
        <div>
          <p className="uppercase text-xs tracking-[3px] text-[#2f9bad]
  mb-3">
            About us
          </p>
          <h3 className="text-3xl md:text-5xl font-semibold text-gray-800 mb-8">
            About this Property
          </h3>
          <p className="text-gray-600 leading-relaxed ">
           This spacious and beautifully designed vacation home offers the perfect blend of comfort, luxury, and convenience for large groups and families. With multiple bedrooms, modern interiors, and an open living space, it creates a welcoming environment for relaxation and connection. The fully equipped kitchen with premium appliances makes cooking an enjoyable experience, while large windows provide stunning views of the outdoor pool area. Additional features like multiple laundry spaces, private guest accommodation, and ample parking ensure a hassle-free stay. Located close to top dining, shopping, and entertainment spots, this property is an ideal choice for creating unforgettable memories.
          </p>

          {/* <div
            className="text-gray-600 leading-relaxed mb-3"
          
            // dangerouslySetInnerHTML={{
            //   __html: listing?.description || "No description available",
            // }}
           
          /> */}
          <div className="p-3 flex mx-[-12px]">
             <span className="font-bold  uppercase">owner&nbsp; -
            &nbsp;</span><p className="text-[#2f9bad] ">Nick Nuccio</p> 
          </div>

          <Link to={"/about"}>
            {" "}
            <button className="px-6 py-3 bg-[#FFE8BE] text-black rounded-full font-semibold hover:scale-105 transition">
              Know More →
            </button>
          </Link>
        </div>
        {/* IMAGE */}
        <div className="relative group overflow-hidden rounded-2xl">
          <img
            src={image}
            alt="property"
            className="w-full h-[280px] sm:h-[380px] md:h-[450px] object-cover transition duration-700 group-hover:scale-110"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/600x400";
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

          {/* <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium shadow">
            {listing?.property?.tag || "Premium Property"}
          </div> */}
        </div>

      
      </div>
    </section>
  );
}
