import React from "react";
import BusinessPageTemplate from "../BusinessPageTemplate";

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
      image: "https://picsum.photos/600/400?random=6",
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
      image: "https://picsum.photos/600/400?random=7",
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
      image: "https://picsum.photos/600/400?random=8",
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
      image: "https://picsum.photos/600/400?random=9",
    },
  ],
  formTitle: "BraveBusiness Inquiry Form",
  formDescription:
    "Please provide us with some details and a member of our team will be in touch shortly.",
  formFields: [
    { label: "Company Information", type: "text", name: "companyInfo" },
    { label: "Services of Interest", type: "text", name: "servicesInterest" },
    { label: "Project or Support Needs", type: "textarea", name: "projectNeeds" },
    {
      label: "Budget & Engagement Style",
      type: "select",
      name: "budgetStyle",
      options: ["< $5K", "$5K - $10K", "$10K - $50K", "> $50K"],
    },
    { label: "Additional Info (Optional)", type: "textarea", name: "additionalInfo" },
  ],
};

const BraveBusiness = () => <BusinessPageTemplate {...pageData} />;

export default BraveBusiness;
