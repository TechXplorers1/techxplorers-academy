import React from 'react';
import StacksPageTemplate from '../StacksPageTemplate';
import { coursesData } from '../../data/coursesData';

const CybersecurityCompliance = () => {
  const courses = coursesData.cybersecurityCompliance;
  return (
    <StacksPageTemplate
      title="Cybersecurity & Compliance"
      breadcrumb="Cybersecurity & Compliance"
      courses={courses}
    />
  );
};

export default CybersecurityCompliance;