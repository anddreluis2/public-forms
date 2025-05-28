"use client";

import { motion } from "framer-motion";
import { IconOnly } from "./Logo";

interface LogoWithTextProps {
  className?: string;
  logoSize?: "sm" | "md" | "lg";
  animated?: boolean;
}

export default function LogoWithText({
  className = "",
  logoSize = "md",
  animated = true,
}: LogoWithTextProps) {
  const logoSizeClasses = {
    sm: "h-12 w-12",
    md: "h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24",
    lg: "h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32",
  };

  const textSizeClasses = {
    sm: {
      subtitle: "text-xs",
      title: "text-lg font-bold",
      byline: "text-xs",
    },
    md: {
      subtitle: "text-xs sm:text-sm lg:text-base",
      title: "text-xl sm:text-2xl lg:text-3xl font-bold",
      byline: "text-xs sm:text-sm",
    },
    lg: {
      subtitle: "text-sm sm:text-base lg:text-lg",
      title: "text-2xl sm:text-3xl lg:text-4xl font-bold",
      byline: "text-sm sm:text-base",
    },
  };

  const LogoContent = () => (
    <>
      <div
        className={`${
          animated
            ? "group-hover:rotate-12 transition-transform duration-300"
            : ""
        }`}
      >
        <IconOnly className={logoSizeClasses[logoSize]} />
      </div>
      <div className="text-left">
        <p
          className={`${
            textSizeClasses[logoSize].subtitle
          } text-black leading-tight
                     ${
                       animated
                         ? "group-hover:text-[#7375FC] transition-colors duration-300"
                         : ""
                     }`}
        >
          Biblioteca de
        </p>
        <h1
          className={`${
            textSizeClasses[logoSize].title
          } text-[#2C2C3F] leading-tight -mt-1
                     ${
                       animated
                         ? "group-hover:text-[#7375FC] transition-colors duration-300"
                         : ""
                     }`}
        >
          instrumentos
        </h1>
        <p
          className={`${
            textSizeClasses[logoSize].byline
          } text-black leading-tight
                     ${
                       animated
                         ? "group-hover:text-[#7375FC] transition-colors duration-300"
                         : ""
                     }`}
        >
          by human<span className="font-bold">track</span>
        </p>
      </div>
    </>
  );

  if (animated) {
    return (
      <motion.div
        className={`flex justify-center items-center space-x-3 sm:space-x-4
                   cursor-pointer group transition-all duration-300 ease-in-out ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <LogoContent />
      </motion.div>
    );
  }

  return (
    <div
      className={`flex justify-center items-center space-x-3 sm:space-x-4 ${className}`}
    >
      <LogoContent />
    </div>
  );
}
