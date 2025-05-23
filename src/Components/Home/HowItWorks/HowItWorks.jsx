import { useRef } from "react"
import { useInView, motion } from "framer-motion"
import { Search, Users, Calendar, MapPin } from "lucide-react"

const steps = [
    {
        icon: Search,
        title: "Discover",
        description: "Find hobby groups that match your interests and passions in your local area.",
    },
    {
        icon: Users,
        title: "Connect",
        description: "Join groups and connect with like-minded people who share your enthusiasm.",
    },
    {
        icon: Calendar,
        title: "Participate",
        description: "Attend regular meetups and events to engage with your hobby community.",
    },
    {
        icon: MapPin,
        title: "Create",
        description: "Start your own hobby group and build a community around your interests.",
    },
]

const HowItWorks = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    return (
        <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                        How HobbyHub Works
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Join our platform in a few simple steps and start connecting with hobby enthusiasts near you
                    </p>
                </div>

                <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center"
                        >
                            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mb-4">
                                <step.icon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;