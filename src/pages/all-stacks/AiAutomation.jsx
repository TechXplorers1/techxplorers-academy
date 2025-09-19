import React from 'react';
import StacksPageTemplate from '../StacksPageTemplate';
import { coursesData } from '../../data/coursesData';

const AiAutomation = ({ isLoggedIn, onLogout, cartItemsCount }) => {
  const courses = coursesData.aiAutomation;
  return (
    <StacksPageTemplate
      title="AI & Automation"
      breadcrumb="AI & Automation"
      courses={courses}
      isLoggedIn={isLoggedIn} 
      onLogout={onLogout} 
      cartItemsCount={cartItemsCount}
    />
  );
};

export default AiAutomation;