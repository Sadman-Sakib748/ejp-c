import React from "react";

const Support = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white py-16 px-4 md:px-10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
                <h1 className="text-4xl font-bold">Support</h1>
                <p className="text-lg">
                    Need help? We're here for you 24/7.
                </p>
                <ul className="text-left space-y-2">
                    <li>📧 Email: support@hobbyhub.com</li>
                    <li>📞 Phone: +880 1703-174167</li>
                    <li>💬 Live Chat: Available in your dashboard</li>
                </ul>
            </div>
        </div>
    );
};

export default Support;
