import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import NotFoundImg from "@/assets/404-illustration.png";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img
          alt="404 Not Found Illustration"
          className="w-full h-72 object-contain mb-8 rounded-3xl"
          src={NotFoundImg}
        />
      </motion.div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight">
          Lost in Space?
        </h1>
        <p className="text-lg text-gray-500 max-w-md mx-auto">
          The page you&apos;re looking for was either deleted, had its name
          changed or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            className="h-12 px-10 rounded-xl text-base font-semibold text-white shadow-lg hover:shadow-primary/30 transition-all duration-300"
            color="primary"
            onPress={() => navigate("/")}
          >
            Back to Home
          </Button>
          <Button
            className="h-12 px-10 rounded-xl text-base font-semibold border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-300"
            variant="bordered"
            onPress={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
