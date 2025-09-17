// src/pages/BusinessPageTemplate.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const slideLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0 },
};

const slideRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0 },
};

const BusinessPageTemplate = ({
  title,
  breadcrumbs,
  sections,
  formTitle,
  formDescription,
  formFields,
}) => {
  const filteredBreadcrumbs = breadcrumbs.filter(crumb => crumb.name !== "For Business");

  return (
    <div className="bg-white text-gray-900 font-inter min-h-screen">
      <Header isLandingPage={false} />
      <Hero
        title={title}
        breadcrumbs={filteredBreadcrumbs}
        // No specific background image for this template
      />

      <main className="container mx-auto px-6 lg:px-12 py-20 space-y-28">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            className="grid md:grid-cols-2 gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            variants={index % 2 === 0 ? slideLeft : slideRight}
          >
            {index % 2 === 0 ? (
              <>
                <motion.div
                  className="flex justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {section.image && (
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full max-w-lg rounded-2xl shadow-xl object-cover"
                    />
                  )}
                </motion.div>

                <div className="text-left">
                  <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                    {section.title}
                  </h2>
                  <p className="text-lg text-gray-700 mb-8">
                    {section.description}
                  </p>
                  {section.list && (
                    <ul className="space-y-4 text-gray-800 font-medium">
                      {section.list.map((item, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition"
                          whileHover={{ scale: 1.03, x: 5 }}
                        >
                          <span className="w-8 h-8 mr-3 flex items-center justify-center rounded-full bg-purple-600 text-white font-bold">
                            ✓
                          </span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="text-left order-2 md:order-1">
                  <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                    {section.title}
                  </h2>
                  <p className="text-lg text-gray-700 mb-8">
                    {section.description}
                  </p>
                  {section.list && (
                    <ul className="space-y-4 text-gray-800 font-medium">
                      {section.list.map((item, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition"
                          whileHover={{ scale: 1.03, x: 5 }}
                        >
                          <span className="w-8 h-8 mr-3 flex items-center justify-center rounded-full bg-purple-600 text-white font-bold">
                            ✓
                          </span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>

                <motion.div
                  className="flex justify-center order-1 md:order-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {section.image && (
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full max-w-lg rounded-2xl shadow-xl object-cover"
                    />
                  )}
                </motion.div>
              </>
            )}
          </motion.div>
        ))}
      </main>

      <div className="relative bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-700 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-purple-900/20 mix-blend-overlay"></div>
        <motion.div
          className="container relative mx-auto px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          transition={{ duration: 1 }}
        >
          <div className="bg-white/95 backdrop-blur-md p-12 rounded-2xl shadow-2xl max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-extrabold text-gray-900 mb-6">
              {formTitle}
            </h3>
            <p className="text-lg text-gray-600 mb-12">{formDescription}</p>

            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {formFields.map((field, i) => (
                  <div key={i} className="flex flex-col text-left">
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        rows="4"
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      />
                    ) : field.type === "select" ? (
                      <select
                        id={field.name}
                        name={field.name}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      >
                        {field.options.map((option, j) => (
                          <option key={j}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold py-3 px-12 rounded-full shadow-lg hover:opacity-90 transition"
                >
                  Submit Request
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default BusinessPageTemplate;