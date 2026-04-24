import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AboutSection({ listingId }) {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

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
      ? `${import.meta.env.VITE_API_URL}${listing.photos[0]}`
      : "https://via.placeholder.com/600x400";

  return (
    <section className="w-full bg-[#f8f8f8] py-20 px-6 md:px-16">
      {/* ================= TOP ================= */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-1  gap-12 items-start text-center">
        {/* LEFT */}
        <div>
          <p className="uppercase tracking-widest text-yellow-500 text-xs mb-4">
            {listing?.property?.title || "Welcome"}
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-6">
            {listing?.property?.tagline ||
              "An incredible vacation spot with something for everyone"}
          </h2>

          <p className="text-gray-600 text-base">
            {listing?.property?.summary ||
              "3BR/3BA • Beach • Pool • Lagoon Front • And More"}
          </p>
        </div>

       
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 mt-20 items-center">
        {/* IMAGE */}
        <div className="relative group overflow-hidden rounded-2xl">
          <img
            src={image}
            alt="property"
            className="w-full h-[280px] sm:h-[380px] md:h-[450px] object-cover transition duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium shadow">
            {listing?.property?.tag || "Premium Property"}
          </div>
        </div>

        {/* TEXT */}
        <div>
          <h3 className="text-3xl md:text-4xl font-semibold mb-6">
            About this Property
          </h3>
          <p className="text-gray-600 leading-relaxed ">
            I am semi-retired I live in Panama City Beach. I love PCB and
            decided to move here from Atlanta in 2007. I have several friends
            that also moved here at the same time we all get together on the
            weekend and enjoy the beach or go out on someones boat. There is
            nothing more relaxing than being at the beach every weekend or being
            able to watch the sunsets everyday if possible. The beach is my
            serenity and my happy place. You will not be disappointed if you
            visit Panama City Beach and enjoy the sugar white sand and your stay
            at the Summit with all the amenity.
          </p>

          {/* <div
            className="text-gray-600 leading-relaxed mb-3"
          
            // dangerouslySetInnerHTML={{
            //   __html: listing?.description || "No description available",
            // }}
           
          /> */}
          <div className="p-3 flex">
            <p className="text-green-500">Ann McDaniel Phillips</p> -{" "}
            <span className="font-bold  uppercase">owner</span>
          </div>

          <button className="px-6 py-3 rounded-full bg-black text-white hover:bg-gray-800 transition">
            Know More →
          </button>
        </div>
      </div>
    </section>
  );
}
