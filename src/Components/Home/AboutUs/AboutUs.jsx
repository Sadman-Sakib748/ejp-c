import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white py-16 px-4 md:px-10">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="text-lg leading-relaxed">
          HobbyHub is a platform where individuals can create, join, and discover groups
          that match their interests. Whether you love coding, painting, gaming, or gardening — 
          there's a community waiting for you. <br />
          <br />
          Our mission is to connect hobbyists and help people find joy in shared passions.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
