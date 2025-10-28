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
  isLoggedIn,
  onLogout,
  cartItemsCount,
  title,
  breadcrumbs,
  sections,
  formTitle,
  formDescription,
  formFields,
  coursesData,
  whatsappNumber // NEW: Accept whatsappNumber prop
}) => {
  const filteredBreadcrumbs = breadcrumbs.filter(crumb => crumb.name !== "For Business");

  // --- WHATSAPP SUBMISSION HANDLER ---
  const handleWhatsAppSubmit = (event) => {
    event.preventDefault(); // Stop the default form submission

    if (!whatsappNumber) {
      alert("WhatsApp number is not configured.");
      return;
    }

    const formData = new FormData(event.target);
    let message = `*${formTitle}*\n\n`; // Start with the form title as a heading

    // Iterate over form fields to build the message with headings
    formFields.forEach(field => {
      const value = formData.get(field.name) || 'N/A';
      // Format each field as a heading and its value
      message += `*${field.label}:*\n${value}\n\n`;
    });

    // Remove the country code '+' for the wa.me URL, as it expects digits only.
    const cleanNumber = whatsappNumber.replace(/\+/g, '').replace(/\s/g, '');
    
    // URL-encode the message
    const encodedMessage = encodeURIComponent(message);
    
    // Construct the WhatsApp URL
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    
    // Open the WhatsApp chat in a new tab
    window.open(whatsappUrl, '_blank');
  };
  // -----------------------------------


  return (
    // CHANGED: Background to white, text to dark gray
    <div className="bg-white text-gray-900 font-inter min-h-screen">
      <Header isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount} coursesData={coursesData} />
      <Hero
        title={title}
        breadcrumbs={filteredBreadcrumbs}
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
                          {/* CHANGED: List icon background color to blue-400 */}
                          <span className="w-8 h-8 mr-3 flex items-center justify-center rounded-full bg-blue-400 text-white font-bold">
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
                          {/* CHANGED: List icon background color to blue-400 */}
                          <span className="w-8 h-8 mr-3 flex items-center justify-center rounded-full bg-blue-400 text-white font-bold">
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

      {/* Contact Form CTA Section */}
      {/* CHANGED: Background gradient to blue/cyan */}
      <div className="relative bg-gradient-to-br from-blue-400 via-blue-600 to-cyan-400 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>
        <motion.div
          className="container relative mx-auto px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          transition={{ duration: 1 }}
        >
          {/* CHANGED: Form background to white/95 */}
          <div className="bg-white/95 backdrop-blur-md p-12 rounded-2xl shadow-2xl max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-extrabold text-gray-900 mb-6">
              {formTitle}
            </h3>
            <p className="text-lg text-gray-600 mb-12">{formDescription}</p>

            {/* UPDATED: Added onSubmit handler */}
            <form onSubmit={handleWhatsAppSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {formFields.map((field, i) => (
                  <div key={i} className="flex flex-col text-left">
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      {field.label}
                      {/* ADDED: Required indicator */}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        rows="4"
                        required={field.required} // Added required attribute
                        // CHANGED: Focus ring color to blue-400
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                      />
                    ) : field.type === "select" ? (
                      <select
                        id={field.name}
                        name={field.name}
                        required={field.required} // Added required attribute
                        // CHANGED: Focus ring color to blue-400
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                      >
                        {/* ADDED: Default empty/placeholder option */}
                        <option value="" disabled selected>Select an option</option>
                        {field.options.map((option, j) => (
                          <option key={j} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        required={field.required} // Added required attribute
                        // CHANGED: Focus ring color to blue-400
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-400 focus:ring-blue-400"
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
                  // CHANGED: Submit button gradient to blue/cyan
                  className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white text-lg font-semibold py-3 px-12 rounded-full shadow-lg hover:opacity-90 transition flex items-center"
                >
                   {/* UPDATED: Button text to be more explicit */}
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.16 2.76a1.18 1.18 0 00-.77-.77A9.85 9.85 0 0010 0C4.48 0 0 4.48 0 10s4.48 10 10 10c1.78 0 3.47-.48 4.93-1.3l.35.1.75.22.46.12.33.09c.14.04.29.06.43.06.3 0 .58-.09.83-.23l.1-.06.07-.04.06-.04.05-.04.04-.03.04-.03.03-.02c.07-.05.13-.11.19-.17.13-.13.23-.28.32-.45.09-.17.15-.35.18-.54.03-.19.04-.38.04-.58V10A9.85 9.85 0 0017.16 2.76zM10 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8c0 2.21-1.2 4.15-3.03 5.37l-.05.04-1.32.74-2.27.76-.09.03-.2.07c-.12.04-.25.06-.38.06h-.1c-.13 0-.25-.03-.37-.06l-.2-.07-.09-.03-2.27-.76L5 15.65l-.05-.04C3.82 14.15 3 12.19 3 10c0-3.86 3.14-7 7-7s7 3.14 7 7-3.14 7-7 7zM14.65 11.23c-.15-.15-.35-.22-.56-.22-.2 0-.4.07-.55.22l-1.36 1.36-1.07-1.07c-.3-.3-.7-.47-1.13-.47s-.83.17-1.13.47l-1.07 1.07-1.36-1.36c-.3-.3-.7-.47-1.13-.47s-.83.17-1.13.47c-.62.62-.62 1.63 0 2.25l1.36 1.36 1.07 1.07c.3.3.7.47 1.13.47s.83-.17 1.13-.47l1.07-1.07 1.36-1.36c.62-.62.62-1.63 0-2.25z"/></svg>
                  Send WhatsApp Message
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