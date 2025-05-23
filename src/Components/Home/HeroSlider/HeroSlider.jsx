import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Typewriter } from "react-simple-typewriter";

const slides = [
  {
    id: 1,
    title: "Discover Local Hobby Groups",
    description: "Connect with people who share your interests and passions",
    image: "https://i.ibb.co/pjt5ZdN6/photo-1529156069898-49953e39b3ac.jpg",
    cta: "Find Groups",
    link: "/groups",
  },
  {
    id: 2,
    title: "Create Your Own Community",
    description: "Start a group and bring together enthusiasts in your area",
    image: "https://i.ibb.co/RTvvqfpm/photo-1582213782179-e0d53f98f2ca.jpg",
    cta: "Create a Group",
    link: "/create-group",
  },
  {
    id: 3,
    title: "Join Events & Activities",
    description: "Participate in regular meetups and expand your network",
    image: "https://i.ibb.co/bgw9FhQf/photo-1511632765486-a01980e01a18.jpg",
    cta: "Explore Now",
    link: "/groups",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  if (!mounted) {
    return (
      <div className="relative h-[500px] w-full overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full rounded-md bg-gray-100 dark:bg-gray-800  overflow-hidden">
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative min-w-full min-h-screen flex items-center"
          >
            <div className="absolute inset-0 w-full h-full ">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
            <div className="relative z-10 container mx-auto px-4 text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-2xl">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl mb-6 max-w-xl">{slide.description}</p>
              <div className="h-12 mb-6">
                {currentSlide === 0 && mounted && (
                  <div className="text-xl md:text-2xl font-medium">
                    <span>Find groups for </span>
                    <span className="text-yellow-300 font-semibold">
                      <Typewriter
                        words={["photography", "book clubs", "hiking"]}
                        loop={true}
                        cursor
                        cursorStyle="|"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1500}
                      />
                    </span>
                    <span>...</span>
                  </div>
                )}
              </div>
              <Link to={slide.link}>
                <p className="inline-block bg-white text-black text-lg font-medium px-6 py-3 rounded hover:bg-gray-200 transition">{slide.cta}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 z-20 p-2 rounded-full"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        ←
      </button>

      {/* Next Button */}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 z-20 p-2 rounded-full"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        →
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
