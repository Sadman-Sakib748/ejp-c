import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Search, FileX2, ArrowLeft } from "lucide-react";


const ErrorPage = () => {
    const [searching, setSearching] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearching(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
            {/* Animated Logo */}
            <motion.div
                className="mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center justify-center w-24 h-24 bg-primary rounded-full">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                        <FileX2 className="w-12 h-12 text-primary-foreground" />
                    </motion.div>
                </div>
            </motion.div>

            {/* Error Message */}
            <motion.h1
                className="text-4xl font-bold mb-2 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                404 - Page Not Found
            </motion.h1>

            {/* Searching Animation or Not Found Message */}
            {searching ? (
                <motion.div
                    className="flex flex-col items-center mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="relative mb-4">
                        <motion.div
                            animate={{ x: [-20, 20, -20] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <Search className="w-16 h-16 text-muted-foreground" />
                        </motion.div>
                        <motion.div
                            className="absolute inset-0 bg-background"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, 1.5, 0], opacity: [0, 0.5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </div>
                    <p className="text-muted-foreground text-lg">Searching for your page...</p>
                </motion.div>
            ) : (
                <motion.div
                    className="flex flex-col items-center mt-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring" }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <FileX2 className="w-16 h-16 text-destructive mb-4" />
                    </motion.div>
                    <p className="text-muted-foreground text-lg text-center max-w-md mb-8">
                        We've looked everywhere, but the page you're searching for couldn't be found.
                    </p>
                    <Link to="/">
                        <button className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </button>
                    </Link>
                </motion.div>
            )}
        </div>
    );
};

export default ErrorPage;