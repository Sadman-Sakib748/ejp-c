import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Sun, Moon, LogOut, User, LayoutDashboard } from "lucide-react";
import { Link } from "react-router"; // corrected import for react-router-dom
import { MdOutlineGroup } from "react-icons/md";
import useAuth from "../../hook/useAuth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logOut } = useAuth();
  const dropdownRef = useRef(null);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleSignOut = async () => {
    await logOut();
    closeMenu();
  };

  // Updated navLinks with About Us, Contact, Support instead of Create Group & My Groups
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/allHobby", label: "All Groups" },
    { href: "/about", label: "About Us" },
    { href: "/contac", label: "Contact" },
    { href: "/support", label: "Support" },
    ...(user
      ? [
          {
            href: "/dashboard",
            label: "Dashboard",
            icon: <LayoutDashboard size={16} />,
          },
        ]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-blue-500 dark:bg-gray-900/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
          <MdOutlineGroup className="text-4xl" />
          <span className="text-xl font-bold">HobbyHub</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-medium flex items-center gap-1 hover:text-blue-600"
              onClick={closeMenu}
            >
              {link.icon && <span>{link.icon}</span>}
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* User Dropdown */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="h-8 w-8 rounded-full overflow-hidden border hover:ring"
                onClick={toggleDropdown}
              >
                <img src={user?.photoURL} alt="User" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-md rounded z-50">
                  <div className="p-3 border-b flex items-center gap-3">
                    <img
                      src={user?.photoURL || ""}
                      alt="User"
                      className="h-10 w-10 object-cover rounded-full"
                    />
                    <div>
                      <div className="font-medium">{user.displayName || "User"}</div>
                      <div className="text-gray-500 text-xs truncate max-w-[150px]">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  {/* Updated dropdown links with About, Contact, Support */}
                  <Link
                    to="/about"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Contact
                  </Link>
                  <Link
                    to="/support"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Support
                  </Link>
                  <Link
                    to="/dashboard"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <LayoutDashboard size={16} className="mr-2" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut size={16} className="mr-2" />
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <Link
                to="/signIn"
                className="px-4 py-2 text-sm border rounded hover:bg-gray-100"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Sign up
              </Link>
            </div>
          )}

          {/* Mobile Toggle */}
          <button className="md:hidden p-2" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white dark:bg-gray-900">
          <div className="px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-medium flex items-center gap-1 hover:text-blue-600"
                  onClick={closeMenu}
                >
                  {link.icon && <span>{link.icon}</span>}
                  {link.label}
                </Link>
              ))}
            </nav>
            {!user && (
              <div className="pt-4 border-t flex flex-col space-y-2">
                <Link
                  to="/signIn"
                  className="w-full px-4 py-2 border text-center rounded hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="w-full px-4 py-2 text-center bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={closeMenu}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
