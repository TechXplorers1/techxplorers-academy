import React from "react";
import BusinessPageTemplate from "../BusinessPageTemplate";

// --- IMAGE IMPORTS (Added based on user request) ---
import bns6 from '../../assets/bns-6.jpg';
import bns7 from '../../assets/bns-7.jpg';
// --------------------------------------------------

// --- WHATSAPP CONFIGURATION ---
const WHATSAPP_NUMBER = '+919618108329'; // The target number
// ------------------------------

const pageData = {
  title: "Partner With Us",
  tagline: "Empowering The Future, Building The Future",
  breadcrumbs: [
    { name: "For Business", path: "/for-business" },
    { name: "Partner With Us" },
  ],
  sections: [
    {
      title: "Why Partner With TX Academy?",
      description:
        "We partner with leading organizations to create innovative learning solutions. Let’s build the future together by leveraging our expertise and community.",
      list: [
        "Access our talent pipeline to find skilled graduates.",
        "Leverage our curriculum tailored to your workforce.",
        "Work with our expert mentors for unparalleled support.",
        "Join our vibrant learning community.",
        "Receive marketing and branding support.",
      ],
      image: bns6, // UPDATED: Replaced random URL with imported asset bns6
    },
    {
      title: "Partnership Opportunities",
      description:
        "We offer a range of partnership models designed to fit your unique business objectives, from content sharing to co-marketing initiatives.",
      list: [
        "Content & Curriculum Partnership",
        "Sponsorship & Co-Marketing",
        "Talent Pipeline Partnership",
        "Affiliate & Reseller Partnerships",
      ],
      image: bns7, // UPDATED: Replaced random URL with imported asset bns7
    },
  ],
  formTitle: "Partnership Inquiry - WhatsApp Chat", // UPDATED title
  formDescription:
    "Fill out a few quick details, and upon clicking 'Send WhatsApp Message', a chat will open with your inquiry pre-filled.", // UPDATED description
  
  // --- WHATSAPP CONFIGURATION ---
  whatsappNumber: WHATSAPP_NUMBER, // Pass the WhatsApp number to the template

  // Simplified fields for a better WhatsApp initial message
  formFields: [
    { label: "Contact Person", type: "text", name: "contactPerson", required: true },
    { label: "Company Name", type: "text", name: "companyName", required: true },
    { label: "Partnership Type (e.g., Sponsorship)", type: "text", name: "partnershipType", required: true },
    { label: "Contact Email", type: "email", name: "contactEmail", required: true },
  ],
};

const PartnerWithUs = ({ isLoggedIn, onLogout, cartItemsCount }) => (
  <BusinessPageTemplate {...pageData} isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount} />
);

export default PartnerWithUs;