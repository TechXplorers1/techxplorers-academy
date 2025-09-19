import React from 'react';
import StacksPageTemplate from '../StacksPageTemplate';
import { coursesData } from '../../data/coursesData';

const EngineeringDevelopment = ({ isLoggedIn, onLogout, cartItemsCount }) => {
  const courses = coursesData.engineeringDevelopment;
  return (
    <StacksPageTemplate
      title="Engineering & Development"
      breadcrumb="Engineering & Development"
      courses={courses}
      isLoggedIn={isLoggedIn} 
      onLogout={onLogout} 
      cartItemsCount={cartItemsCount}
    />
  );
};

export default EngineeringDevelopment;