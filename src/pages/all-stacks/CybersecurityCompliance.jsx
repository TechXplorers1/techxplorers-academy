import React from 'react';
import StacksPageTemplate from '../StacksPageTemplate';
import { coursesData } from '../../data/coursesData';

const CybersecurityCompliance = ({ isLoggedIn, onLogout, cartItemsCount }) => {
  const courses = coursesData.cybersecurityCompliance;
  return (
    <StacksPageTemplate
      title="Cybersecurity & Compliance"
      breadcrumb="Cybersecurity & Compliance"
      courses={courses}
      isLoggedIn={isLoggedIn} 
      onLogout={onLogout} 
      cartItemsCount={cartItemsCount}
    />
  );
};

export default CybersecurityCompliance;