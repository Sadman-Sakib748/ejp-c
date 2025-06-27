import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router'; // ✅ Correct import

const HeroSlider = () => {
  return (
    <div className="w-full h-screen relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="h-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="w-full h-full relative">
            <img
              src="https://i.ibb.co/pjt5ZdN6/photo-1529156069898-49953e39b3ac.jpg"
              alt="Make New Friends"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            <div className="absolute top-1/2 left-12 transform -translate-y-1/2 z-10 max-w-lg text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Make New Friends</h2>
              <p className="mb-6 text-lg">
                Meet like-minded people and build lasting connections.
              </p>
              <Link to="">
                <button className="bg-purple-600 px-6 py-3 rounded-full hover:bg-purple-700 transition">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="w-full h-full relative">
            <img
              src="https://i.ibb.co/RTvvqfpm/photo-1582213782179-e0d53f98f2ca.jpg"
              alt="Explore Hobbies"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            <div className="absolute top-1/2 left-12 transform -translate-y-1/2 z-10 max-w-lg text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Explore New Hobbies</h2>
              <p className="mb-6 text-lg">
                Discover and share your passions with local groups.
              </p>
              <Link to="/dashboard/createGroup">
                <button className="bg-purple-600 px-6 py-3 rounded-full hover:bg-purple-700 transition">
                  Join Now
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="w-full h-full relative">
            <img
              src="https://i.ibb.co/bgw9FhQf/photo-1511632765486-a01980e01a18.jpg"
              alt="Attend Events"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            <div className="absolute top-1/2 left-12 transform -translate-y-1/2 z-10 max-w-lg text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Attend Local Events</h2>
              <p className="mb-6 text-lg">
                Stay updated and never miss fun activities near you.
              </p>
              <Link to="/allHobby">
                <button className="bg-purple-600 px-6 py-3 rounded-full hover:bg-purple-700 transition">
                  Browse Events
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSlider;
