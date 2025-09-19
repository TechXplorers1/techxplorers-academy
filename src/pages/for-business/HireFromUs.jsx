import React from "react";
import BusinessPageTemplate from "../BusinessPageTemplate";

const pageData = {
  title: "Hire From Us",
  tagline: "Build Your Dream Team With Proven, Job-Ready Talent",
  breadcrumbs: [
    { name: "For Business", path: "/for-business" },
    { name: "Hire From Us" },
  ],
  sections: [
    {
      title: "Why Hire From DigitallyBrave?",
      description:
        "Our graduates are equipped with real-world skills and are ready to contribute from day one. They are trained in our project-based ecosystem, ensuring they have practical experience.",
      list: [
        "Proven talent and job-ready skills.",
        "Diverse pool of candidates from various backgrounds.",
        "Flexible hiring models, including contract-to-hire.",
        "Expert support throughout the process, from screening to placement.",
        "Access to our alumni network for ongoing talent needs.",
      ],
      image: "https://picsum.photos/600/400?random=1",
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
      image: "https://picsum.photos/600/400?random=2",
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
      ],
      image: "https://picsum.photos/600/400?random=3",
    },
  ],
  formTitle: "Talent Request Form",
  formDescription:
    "Tell us about the roles you need to fill and we will match you with the best candidates.",
  formFields: [
    { label: "Company Information", type: "text", name: "companyInfo" },
    { label: "Role Requirements", type: "textarea", name: "roleRequirements" },
    { label: "Budget & Hiring Process", type: "text", name: "budgetHiring" },
    { label: "Final Details", type: "textarea", name: "finalDetails" },
  ],
};

const HireFromUs = ({ isLoggedIn, onLogout, cartItemsCount }) => (
  <BusinessPageTemplate {...pageData} isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount} />
);

export default HireFromUs;