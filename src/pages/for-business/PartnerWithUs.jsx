import React from "react";
import BusinessPageTemplate from "../BusinessPageTemplate";

const pageData = {
  title: "Partner With Us",
  tagline: "Empowering The Future, Building The Future",
  breadcrumbs: [
    { name: "For Business", path: "/for-business" },
    { name: "Partner With Us" },
  ],
  sections: [
    {
      title: "Why Partner With DigitallyBrave?",
      description:
        "We partner with leading organizations to create innovative learning solutions. Let’s build the future together by leveraging our expertise and community.",
      list: [
        "Access our talent pipeline to find skilled graduates.",
        "Leverage our curriculum tailored to your workforce.",
        "Work with our expert mentors for unparalleled support.",
        "Join our vibrant learning community.",
        "Receive marketing and branding support.",
      ],
      image: "https://picsum.photos/600/400?random=4",
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
      image: "https://picsum.photos/600/400?random=5",
    },
  ],
  formTitle: "DigitallyBrave Partnership Interest Form",
  formDescription:
    "Tell us about your organization and how you envision a partnership with us.",
  formFields: [
    { label: "Company Information", type: "text", name: "companyInfo" },
    { label: "Contact Person", type: "text", name: "contactPerson" },
    { label: "Partnership Type", type: "textarea", name: "partnershipType" },
    { label: "Tell Us More", type: "textarea", name: "tellUsMore" },
  ],
};

const PartnerWithUs = () => <BusinessPageTemplate {...pageData} />;

export default PartnerWithUs;
