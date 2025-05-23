import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "HobbyHub helped me find a local photography group that's transformed my weekends. I've made great friends and improved my skills!",
    name: "Sarah Johnson",
    title: "Photography Enthusiast",
    avatar: "https://i.ibb.co/s9bzKDHZ/photo-1494790108377-be9c29b29330.jpg",
  },
  {
    quote:
      "I started a book club through HobbyHub and now we have 15 regular members. The platform made it so easy to organize and grow our community.",
    name: "Michael Chen",
    title: "Book Club Organizer",
    avatar: "https://i.ibb.co/XxskpWsy/photo-1507003211169-0a1dd7228f2d.jpg",
  },
  {
    quote:
      "After moving to a new city, HobbyHub helped me connect with fellow hikers. It's been amazing exploring trails with my new friends!",
    name: "Emma Rodriguez",
    title: "Hiking Group Member",
    avatar: "https://i.ibb.co/TDR9z9zx/photo-1573496359142-b8d87734a5a2.jpg",
  },
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-16 md:py-24 min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Community Says</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Hear from people who have found their community through HobbyHub
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-lg shadow-lg p-6 flex flex-col h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
            >
              <Quote className="h-8 w-8 text-white opacity-70 mb-4" />
              <p className="flex-1 mb-6 italic">"{testimonial.quote}"</p>

              <div className="flex items-center">
                {testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-10 w-10 rounded-full mr-4 object-cover border-2 border-white"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-white bg-opacity-30 mr-4 flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm opacity-80">{testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
