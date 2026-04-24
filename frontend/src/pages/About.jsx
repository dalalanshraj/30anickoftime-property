import { useEffect, useState } from "react";
import api from "../api/axios";

export default function About() {
  const [images, setImages] = useState([]);

  const BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:4000";

  useEffect(() => {
    api.get("/gallery/published")
      .then((res) => {
        const data = res.data || [];

        const formatted = data.map((img) => {
          const path = img.image.startsWith("/")
            ? img.image
            : "/" + img.image;

          return `http://localhost:4000${path}`;
        });

        setImages(formatted);
      })
      .catch(console.log);
  }, []);

  // 👉 fallback images (important)
  const image1 =
    images[0] ||
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511";

  const image2 =
    images[1] ||
    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0";

  const heroImage = images[2] || image1;

  return (
    <>
      {/* 🔥 HERO */}
      <section className="relative h-[60vh] flex items-center justify-center text-white">

        <div
          className="absolute inset-0 bg-fixed bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            About Our Property
          </h1>
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
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Luxury Living Experience
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Our premium gallery showcases the finest visuals of our
              property, giving you a glimpse of comfort, design, and
              lifestyle.
            </p>
          </div>

        </div>
      </section>

      {/* 🔥 SECTION 2 */}
      <section className="py-16 px-6 md:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          {/* CONTENT */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Designed for Comfort & Style
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Each image reflects thoughtful design, spacious living,
              and premium amenities crafted to give you the perfect stay.
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