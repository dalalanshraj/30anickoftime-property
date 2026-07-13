import { useEffect, useState } from "react";
import api from "../api/axios";
import AboutSection from "../components/homeSection/About";
import { Link } from "react-router-dom";

export default function About({ listingId }) {
  const [images, setImages] = useState([]);
  const [listing, setListing] = useState(null);

  const getImageUrl = (photo) => {
  const base =
    import.meta.env.VITE_API_URL || "";

  // new object format
  if (photo?.url) {
    if (photo.url.startsWith("http")) {
      return photo.url;
    }

    return (
      base.replace(/\/$/, "") +
      "/" +
      photo.url.replace(/^\//, "")
    );
  }

  // old string fallback
  if (typeof photo === "string") {
    if (photo.startsWith("http")) {
      return photo;
    }

    return (
      base.replace(/\/$/, "") +
      "/" +
      photo.replace(/^\//, "")
    );
  }

  return "https://via.placeholder.com/600x400";
};

  useEffect(() => {
    api
      .get("/gallery/published")
      .then((res) => {
        const data = res.data || [];

        const formatted = data.map((img) => getImageUrl(img.image));

        setImages(formatted);
      })
      .catch(console.log);
  }, []);

 const image =
      listing?.photos?.length > 0
        ? getImageUrl(listing.photos[0])
        : "https://via.placeholder.com/600x400";
  
    // 👉 fallback images (important)
    const image1 =
      images[0] || "https://images.unsplash.com/photo-1505691938895-1758d7feb511";
  
    const image2 =
      images[1] || "https://images.unsplash.com/photo-1560185007-cde436f6a4d0";
  
    const image3 = images[4];
  
    const heroImage = images[2] || image1;

  return (
    <>
      {/* 🔥 HERO */}
      <section className="relative h-[50vh] flex items-center justify-center text-white">
        <div
          className="absolute inset-0 bg-fixed bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About Us</h1>
          <p className="text-gray-200 max-w-xl mx-auto">
            Discover comfort, luxury, and unforgettable stays with us.
          </p>
        </div>
      </section>

      {/* 🔥 SECTION 1 */}
      <section className="py-16 px-6 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* IMAGE */}
          <div className="overflow-hidden rounded-2xl group">
            <img
              src={image1}
              className="w-full h-[300px] md:h-[450px] object-cover transition duration-700 group-hover:scale-110"
            />
          </div>

          {/* CONTENT */}
          <div>
            <h3 className="text-3xl md:text-5xl font-semibold text-gray-800 mb-8">
              Refined Comfort & Modern Living
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Enjoy a stay that blends comfort, style, and thoughtful design in
              every detail. This property offers spacious interiors, elegant
              furnishings, and a relaxing atmosphere that feels like a true home
              away from home. Whether you’re unwinding in the cozy living areas,
              preparing meals in the fully equipped kitchen, or enjoying quality
              time with family and friends, every moment is designed for ease
              and enjoyment. With modern amenities and a convenient location
              close to dining, shopping, and entertainment, this space provides
              everything you need for a smooth and memorable stay tailored to
              your lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* 🔥 SECTION 2 */}
      <section className="py-16 px-6 md:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* CONTENT */}
          <div>
            <h3 className="text-3xl md:text-5xl font-semibold text-gray-800 mb-8">
              Designed for Comfort & Style
            </h3>

            <p className="text-gray-600 leading-relaxed">
              This thoughtfully designed space offers the perfect balance of comfort and modern style, making it ideal for both short and extended stays. Every detail, from the cozy furnishings to the open and inviting layout, is crafted to create a relaxing and welcoming atmosphere. Enjoy a fully equipped kitchen, spacious living areas, and well-appointed bedrooms that ensure a restful experience. Whether you’re spending time with family or simply unwinding after a long day, this property provides everything you need for a smooth and enjoyable stay, all in a convenient location close to dining, shopping, and entertainment.
            </p>
          </div>

          {/* IMAGE */}
          <div className="overflow-hidden rounded-2xl group">
            <img
              src={image2}
              className="w-full h-[300px] md:h-[450px] object-cover transition duration-700 group-hover:scale-110"
            />
          </div>
        </div>
      </section>
    </>
  );
}
