import { Facebook, Twitter, Instagram, Github } from "lucide-react";
 import { MdOutlineGroup } from "react-icons/md";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <a href="/" className="flex items-center gap-2">
              {/* <img src={logo} alt="HobbyHub Logo" className="h-8 w-8" /> */}
              <p><MdOutlineGroup className="text-4xl"></MdOutlineGroup></p>
             
              <span className="text-xl font-bold text-gray-900 dark:text-white">HobbyHub</span>
            </a>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Connect with local enthusiasts and build communities around your passions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>


          <div>
            <h3 className="text-sm font-medium mb-4 text-gray-900 dark:text-white">Explore</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li><a href="/groups" className="hover:text-gray-900 dark:hover:text-white">All Groups</a></li>
              <li><a href="/create-group" className="hover:text-gray-900 dark:hover:text-white">Create a Group</a></li>
              <li><a href="/my-groups" className="hover:text-gray-900 dark:hover:text-white">My Groups</a></li>
            </ul>
          </div>


          <div>
            <h3 className="text-sm font-medium mb-4 text-gray-900 dark:text-white">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">Community Guidelines</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">Blog</a></li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-sm font-medium mb-4 text-gray-900 dark:text-white">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-sm text-gray-600 dark:text-gray-300">
          <p>&copy; {currentYear} HobbyHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
