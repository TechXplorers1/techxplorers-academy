import React from 'react';
import StacksPageTemplate from '../StacksPageTemplate';
import { coursesData } from '../../data/coursesData';

const UxUiDesign = ({ isLoggedIn, onLogout, cartItemsCount }) => {
  const courses = coursesData.uxUiDesign;
  return (
    <StacksPageTemplate
      title="UX & UI Design"
      breadcrumb="UX & UI Design"
      courses={courses}
      isLoggedIn={isLoggedIn} 
      onLogout={onLogout} 
      cartItemsCount={cartItemsCount}
    />
  );
};

export default UxUiDesign;