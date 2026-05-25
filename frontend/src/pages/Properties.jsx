import React, { useEffect, useState } from "react";
import api from "../api/axios.js";
import PropertyCard from "../components/PropertyCard";

const Properties = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/listings/published")
      .then((res) => {
        setListings(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>

      {/* LISTINGS */}
      <div className="p-10 bg-gray-100 ">
         <p className="uppercase text-xs text-center tracking-[3px] text-[#2f9bad]
  mb-3">Properties</p>
        <h2 className="text-3xl md:text-5xl text-center font-semibold text-gray-800 mb-8">
          Our Properties
        </h2>

        {loading && (
          <p className="text-center text-gray-500">
            Loading properties...
          </p>
        )}

        {!loading && listings.length === 0 && (
          <p className="text-center text-red-500">
            No properties available
          </p>
        )}

        <div className="flex flex-col gap-10">
  {listings.map((listing) => (
    
    <div
      key={listing._id}
      className="grid grid-cols-1 lg:grid-cols-[35%_55%] gap-10 items-start"
    >
      
      {/* LEFT SIDE PROPERTY CARD */}
      <PropertyCard listing={listing} />

      {/* RIGHT SIDE VIDEOS */}
      <div className="flex flex-col gap-6">

        {/* YOUTUBE VIDEO */}
        {/* {listing.video?.youtube && (
          <div className="rounded-3xl overflow-hidden shadow-xl bg-white p-2">
            <iframe
              width="100%"
              height="320"
              src={
                listing.video.youtube.includes("watch?v=")
                  ? listing.video.youtube.replace(
                      "watch?v=",
                      "embed/"
                    )
                  : listing.video.youtube
              }
              title="YouTube video"
              frameBorder="0"
              allowFullScreen
              className="rounded-2xl"
            ></iframe>
          </div>
        )} */}

        {/* VIRTUAL TOUR */}
        {listing.video?.virtualTour && (
          <div className="rounded-3xl overflow-hidden shadow-xl bg-white p-2">
            <iframe
              src={listing.video.virtualTour}
              width="100%"
              height="320"
              className="rounded-2xl border-0"
              allowFullScreen
              loading="lazy"
              title="Virtual Tour"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  ))}
</div>
      </div>
    </>
  );
};

export default Properties;
