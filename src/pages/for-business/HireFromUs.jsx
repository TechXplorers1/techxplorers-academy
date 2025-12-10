import React from "react";
import BusinessPageTemplate from "../BusinessPageTemplate";

// --- IMAGE IMPORTS (Added based on user request) ---
import bns8 from '../../assets/bns-8.jpg';
import bns9 from '../../assets/bns-9.jpg';
import bns10 from '../../assets/bns-10.jpg';
// --------------------------------------------------

// --- WHATSAPP CONFIGURATION ---
const WHATSAPP_NUMBER = '+919618108329'; // The target number
// ------------------------------

const pageData = {
  title: "Hire From Us",
  tagline: "Build Your Dream Team With Proven, Job-Ready Talent",
  breadcrumbs: [
    { name: "For Business", path: "/for-business" },
    { name: "Hire From Us" },
  ],
  sections: [
    {
      title: "Why Hire From TX Academy?",
      description:
        "Our graduates are equipped with real-world skills and are ready to contribute from day one. They are trained in our project-based ecosystem, ensuring they have practical experience.",
      list: [
        "Proven talent and job-ready skills.",
        "Diverse pool of candidates from various backgrounds.",
        "Flexible hiring models, including contract-to-hire.",
        "Expert support throughout the process, from screening to placement.",
        "Access to our alumni network for ongoing talent needs.",
      ],
      image: bns8, // UPDATED: Replaced random URL with imported asset bns8
    },
    {
      title: "Ways To Hire",
      description:
        "We offer a range of flexible hiring models to fit your company’s needs, from direct placements to mentorship-based programs.",
      list: [
        "Direct Hire: Find the perfect fit for a permanent position.",
        "Project-Based Staffing: Hire talent for specific, short-term projects.",
        "Try Before You Hire: Engage a candidate on a trial basis.",
        "Mentorship-to-Hire: Work with a student through a mentorship program.",
      ],
      image: bns9, // UPDATED: Replaced random URL with imported asset bns9
    },
    {
      title: "Roles We Offer",
      description:
        "Our talent pool is skilled in a wide range of roles and technologies, ready to contribute to your team.",
      list: [
        "Product Manager",
        "Business Analyst",
        "UX/UI Designer",
        "Software Developer",
        "Data Scientist",
        "On-Demand Roles",
      ],
      image: bns10, // UPDATED: Replaced random URL with imported asset bns10
    },
  ],
  formTitle: "Talent Request - WhatsApp Chat", // UPDATED title
  formDescription:
    "Fill out a few quick details, and upon clicking 'Send WhatsApp Message', a chat will open with your inquiry pre-filled.", // UPDATED description

  // --- WHATSAPP CONFIGURATION ---
  whatsappNumber: WHATSAPP_NUMBER, // Pass the WhatsApp number to the template

  // Simplified fields for a better WhatsApp initial message
  formFields: [
    { label: "Contact Person", type: "text", name: "contactPerson", required: true },
    { label: "Company Name", type: "text", name: "companyName", required: true },
    { label: "Role(s) Needed", type: "text", name: "rolesNeeded", required: true },
    { label: "Hiring Timeline (e.g., 3 months)", type: "text", name: "hiringTimeline", required: true },
  ],
};

const HireFromUs = ({ isLoggedIn, onLogout, cartItemsCount }) => (
  <BusinessPageTemplate {...pageData} isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount} />
);

export default HireFromUs;