import React from 'react';
import StacksPageTemplate from '../StacksPageTemplate';
import { coursesData } from '../../data/coursesData';

const DataAnalytics = ({ isLoggedIn, onLogout, cartItemsCount }) => {
  const courses = coursesData.dataAnalytics;
  return (
    <StacksPageTemplate
      title="Data & Analytics"
      breadcrumb="Data & Analytics"
      courses={courses}
      isLoggedIn={isLoggedIn} 
      onLogout={onLogout} 
      cartItemsCount={cartItemsCount}
    />
  );
};

export default DataAnalytics;