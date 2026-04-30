import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FiMail, FiPhone } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { Link, Links } from "react-router-dom";
import logo from "../assets/logo/LOGO.png";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* BRAND */}
          <div>
            <div className=" w-30 mb-0">
              <img src={logo} alt="" srcset="" />
            </div>
            <p className="text-gray-400 text-sm mt-6">
              Luxury vacation rentals designed for comfort and unforgettable
              experiences.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <Link to={"/"}>
                {" "}
                <li className="hover:text-white cursor-pointer">Home</li>
              </Link>
              {/* <li className="hover:text-white cursor-pointer">Properties</li> */}
              <Link to={"/about"}>
                {" "}
                <li className="hover:text-white cursor-pointer">About-us</li>
              </Link>
              <Link to={"/contect-us"}>
                {" "}
                <li className="hover:text-white cursor-pointer">Contact</li>
              </Link>
              <Link to={"/booking-Policy"}>
                {" "}
                <span className="hover:text-white cursor-pointer">
                  Booking Policy
                </span>
              </Link>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <FiPhone />
                <span>+1 (504) 717-6425</span>
              </div>

              <div className="flex items-center gap-2">
                <FiMail />
                <span>ngnuccio@gmail.com</span>
              </div>
            </div>
          </div>

          {/* SOCIAL */}
          <div>
          <h3 className="font-semibold mb-4">Our Location</h3>
             <iframe
          className="w-full h-[250px] md:h-[220px]"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d352.46573690052213!2d-86.22364914241241!3d30.348044816062036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8893e30032959051%3A0xec3104ef19e7fc3c!2sBeyond%20The%20Sea%20(AirBnB)!5e1!3m2!1sen!2sin!4v1777564597301!5m2!1sen!2sin" width="600" height="450">
         
        </iframe>
            {/* <Link to="/admin/login">
              <button className="bg-[#FFE8BE] hover:bg-[#2f9bad] text-sm font-medium px-4 py-2 rounded shadow flex items-center gap-2 mt-1">
                <MdEmail />
                Admin Login
              </button>
            </Link> */}

            {/* <div className="flex gap-4">
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
            </div> */}
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
            {/* <span className="hover:text-white cursor-pointer">Terms</span> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
