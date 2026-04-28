import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo/LOGO.png"

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const timeoutRef = useRef(null);

  // scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // hover handlers (NO FLICKER)
  const handleEnter = () => {
    clearTimeout(timeoutRef.current);
    setDropdown(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdown(false);
    }, 200); // delay prevents flicker
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "Photos", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contect-us" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-md shadow-lg"
          : ""
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-4 text-white">
        
        {/* Logo */}
        <div className="w-25">
          <img src={logo} alt="logo" srcset="" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center">

          {links.map((link, i) => (
            <li key={i} className="relative group text-xl">
              <Link to={link.path}>{link.name}</Link>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}

          {/* 🔥 BEST DROPDOWN */}
          {/* <li
            className="relative"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div className="flex items-center gap-1 cursor-pointer">
              Amenities <ChevronDown size={16} />
            </div>

           
            <div className="absolute top-full left-0 w-full h-4"></div>

        
            <div
              className={`absolute top-10 left-0 w-48 bg-white text-black rounded-xl shadow-xl py-2 transition-all duration-300 ${
                dropdown
                  ? "opacity-100 translate-y-0 visible"
                  : "opacity-0 -translate-y-2 invisible"
              }`}
            >
              <Link to="/pool" className="block px-4 py-2 hover:bg-gray-100">
                Pool
              </Link>
              <Link to="/gym" className="block px-4 py-2 hover:bg-gray-100">
                Gym
              </Link>
              <Link to="/spa" className="block px-4 py-2 hover:bg-gray-100">
                Spa
              </Link>
            </div>
          </li> */}

        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-96" : "max-h-0"
        } `}
      >
        <div className="px-6 py-4 space-y-4 text-white">
          {links.map((link, i) => (
            <Link key={i} to={link.path} className="block border-b pb-2">
              {link.name}
            </Link>
          ))}

          {/* Mobile Dropdown (click-based) */}
          {/* <div>
            <p className="mb-2">Amenities</p>
            <div className="pl-4 space-y-2 text-sm text-gray-300">
              <Link to="/pool">Pool</Link>
              <Link to="/gym">Gym</Link>
              <Link to="/spa">Spa</Link>
            </div>
          </div> */}
        </div>
      </div>
    </nav>
  );
}