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
            <h3 className="text-3xl md:text-5xl font-semibold text-gray-800 mb-8">
              Luxury Living Experience
            </h3>

            <p className="text-gray-600 leading-relaxed">
             Luxury Living Experience offers the perfect blend of elegance, comfort, and modern convenience. Designed for those who appreciate refined living, it features stylish interiors, premium furnishings, and thoughtfully curated amenities. Enjoy spacious layouts, high-end finishes, and a peaceful atmosphere that enhances relaxation. Whether you are unwinding after a long day or entertaining guests, every detail is crafted to elevate your lifestyle. From scenic views to seamless services, this experience ensures a stay that feels both indulgent and effortless. Discover a new standard of living where sophistication meets comfort, creating unforgettable moments in a truly luxurious environment.
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
             Designed for Comfort & Style, our space offers a perfect blend of modern elegance and relaxing ambiance. Every detail has been thoughtfully curated to ensure a pleasant and hassle-free stay. From cozy furnishings to spacious interiors, guests can enjoy a warm and inviting atmosphere throughout their visit. High-quality amenities, clean surroundings, and tasteful decor create a sense of luxury and ease. Whether you're unwinding after a long day or enjoying peaceful moments indoors, this space provides everything you need. Ideal for both short and extended stays, it ensures comfort, convenience, and a stylish experience that truly feels like home.
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