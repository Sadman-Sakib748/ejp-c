import { Facebook, Twitter, Instagram, Github } from "lucide-react";
import { MdOutlineGroup } from "react-icons/md";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main grid with 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Logo & About */}
          <div className="space-y-4">
            <a href="/" className="flex items-center gap-2 text-primary-foreground">
              <MdOutlineGroup className="text-4xl" />
              <span className="text-xl font-bold">HobbyHub</span>
            </a>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Connect with local enthusiasts and build communities around your passions.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-sky-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-gray-800 dark:hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/allHobby" className="hover:text-blue-600 transition-colors">All Groups</a></li>
              <li><a href="/createGroup" className="hover:text-blue-600 transition-colors">Create a Group</a></li>
              <li><a href="/myGroup/user@example.com" className="hover:text-blue-600 transition-colors">My Groups</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/helpCenter" className="hover:text-blue-600 transition-colors">Help Center</a></li>
              <li><a href="/communityGuidelines" className="hover:text-blue-600 transition-colors">Community Guidelines</a></li>
              <li><a href="/blog" className="hover:text-blue-600 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacyPolicy" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
              <li><a href="/termsOfService" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
              <li><a href="/cookiePolicy" className="hover:text-blue-600 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom - outside the grid */}
        <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; {currentYear} HobbyHub. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="/privacyPolicy" className="hover:text-blue-600 transition-colors">Privacy</a>
              <a href="/termsOfService" className="hover:text-blue-600 transition-colors">Terms</a>
              <a href="/cookiePolicy" className="hover:text-blue-600 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
