import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FiMail, FiPhone } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Just Beachy</h2>
            <p className="text-gray-400 text-sm">
              Luxury vacation rentals designed for comfort and unforgettable
              experiences.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Properties</li>
              <li className="hover:text-white cursor-pointer">Amenities</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <FiPhone />
                <span>+1 (123) 456-7890</span>
              </div>

              <div className="flex items-center gap-2">
                <FiMail />
                <span>info@sawgrass.com</span>
              </div>
            </div>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>

            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 bg-white/10 rounded-full hover:bg-blue-600 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="p-2 bg-white/10 rounded-full hover:bg-pink-500 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="p-2 bg-white/10 rounded-full hover:bg-sky-500 transition"
              >
                <FaTwitter />
              </a>
            </div>

            <Link to="/admin/login">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-sm font-medium px-4 py-2 rounded shadow flex items-center gap-2 mt-10">
                <MdEmail />
                Admin Login
              </button>
            </Link>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm gap-4">
          <p>
            © {new Date().getFullYear()}{" "}
            <a href="https://digifyamerica.com/">Digify America</a>. All rights
            reserved.
          </p>

          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
