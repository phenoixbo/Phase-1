import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <motion.div
      initial={{ y: "100vh" }}
      animate={{ y: 0 }}
      exit={{ y: "-100vh" }}
      transition={{ type: "spring", stiffness: 50 }}
    >
      <h2>Contact Page</h2>
      <p>Get in touch with us through this page.</p>
    </motion.div>
  );
};

export default Contact;
