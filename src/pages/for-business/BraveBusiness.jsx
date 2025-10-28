import React from "react";
import BusinessPageTemplate from "../BusinessPageTemplate";

// --- IMAGE IMPORTS (Added based on user request) ---
import bns1 from '../../assets/bns-1.jpg';
import bns2 from '../../assets/bns-2.jpg';
import bns3 from '../../assets/bns-3.jpg';
import bns4 from '../../assets/bns-4.jpg';
// --------------------------------------------------

// --- WHATSAPP CONFIGURATION ---
const WHATSAPP_NUMBER = '+919618108329'; // The target number
// ------------------------------

const pageData = {
  title: "BraveBusiness",
  tagline: "DigitallyBrave For Corporations, Co-Ops & Solopreneurs",
  breadcrumbs: [
    { name: "For Business", path: "/for-business" },
    { name: "BraveBusiness" },
  ],
  sections: [
    {
      title: "Project Fulfillment",
      description:
        "Bring us your backlog, and we’ll build you a Brave team to execute. From UX design to product development, data dashboards to full-stack builds—BraveBusiness assembles vetted talent to deliver quality results.",
      list: [
        "Custom team simulations based on your tools & workflows",
        "Project-based learning for faster retention",
        "Role-based skill development with portfolio outcomes",
      ],
      image: bns1, // UPDATED: Changed from random URL to imported asset bns1
    },
    {
      title: "Mentorship-as-a-Service",
      description:
        "Our mentorship solutions provide expert guidance to your employees. We offer dedicated mentors, weekly sessions, and custom learning paths.",
      list: [
        "Dedicated mentor for every employee or team.",
        "Weekly one-on-one sessions.",
        "Customized learning paths and tracking.",
      ],
      image: bns2, // UPDATED: Changed from random URL to imported asset bns2
    },
    {
      title: "Workforce Upskilling & Simulation Labs",
      description:
        "Access our extensive library of courses and custom training modules tailored to your business needs, including simulation labs for hands-on practice.",
      list: [
        "Access to our library of courses.",
        "Custom training modules.",
        "Simulation labs for real-world practice.",
      ],
      image: bns3, // UPDATED: Changed from random URL to imported asset bns3
    },
    {
      title: "Talent Pipelines",
      description:
        "Gain exclusive access to our certified talent pool with custom screening and vetting, and partnerships for intern and new hire programs.",
      list: [
        "Exclusive access to our certified talent pool.",
        "Custom screening and vetting.",
        "Partnerships for intern and new hire programs.",
      ],
      image: bns4, // UPDATED: Changed from random URL to imported asset bns4
    },
  ],
  formTitle: "BraveBusiness Inquiry - WhatsApp Chat", // UPDATED title
  formDescription:
    "Fill out a few quick details, and upon clicking 'Send WhatsApp Message', a chat will open with your inquiry pre-filled.", // UPDATED description
  
  // --- WHATSAPP CONFIGURATION ---
  whatsappNumber: WHATSAPP_NUMBER, // Pass the WhatsApp number to the template
  
  // Simplified fields for a better WhatsApp initial message
  formFields: [
    { label: "Your Name", type: "text", name: "yourName", required: true },
    { label: "Company Name", type: "text", name: "companyName", required: true },
    { 
      label: "Primary Service Interest", 
      type: "select", 
      name: "serviceInterest", 
      required: true,
      options: ["Project Fulfillment", "Mentorship-as-a-Service", "Workforce Upskilling", "Talent Pipelines", "Other"]
    },
    { label: "Contact Email", type: "email", name: "contactEmail", required: true },
  ],
  // --------------------------------
};

const BraveBusiness = ({ isLoggedIn, onLogout, cartItemsCount }) => (
  <BusinessPageTemplate {...pageData} isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount} />
);

export default BraveBusiness;