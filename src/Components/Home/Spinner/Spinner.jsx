import React from "react";
import { motion } from "framer-motion";

const Spinner = () => {
  const speed = 1;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 left-0 w-full h-full"
            style={{ transformOrigin: "center", rotate: `${i * 120}deg` }}
          >
            <motion.div
              className="mx-auto"
              style={{
                width: 0,
                height: 0,
                borderLeft: "20px solid transparent",
                borderRight: "20px solid transparent",
                borderBottom: `40px solid ${
                  i === 0
                    ? "rgba(239, 68, 68, 0.8)" // Red
                    : i === 1
                    ? "rgba(59, 130, 246, 0.8)" // Blue
                    : "rgba(16, 185, 129, 0.8)" // Green
                }`,
                filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))",
                transformOrigin: "center bottom",
              }}
              animate={{
                rotateZ: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotateZ: {
                  duration: 3 / speed,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: {
                  duration: 2 / speed,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            />
          </motion.div>
        ))}

        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2 / speed,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
    </div>
  );
};

export default Spinner;
