import React from "react";

const Footer = () => {
  return (
    <footer className="mt-4 bg-gradient-to-t from-blue-500 to-purple-500 p-8 text-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Footer Section 1 */}
        <div>
          <h2 className="text-2xl font-bold mb-4">About Us</h2>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            eget urna dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Footer Section 2 */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Products</h2>
          <ul className="list-disc list-inside">
            <li>Product 1</li>
            <li>Product 2</li>
            <li>Product 3</li>
          </ul>
        </div>

        {/* Footer Section 3 */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-sm">Email: contact@example.com</p>
          <p className="text-sm">Phone: +1 123-456-7890</p>
        </div>

        {/* Footer Section 4 */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-300">
              Facebook
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Twitter
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
