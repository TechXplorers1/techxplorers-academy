import React from 'react';
import StacksPageTemplate from '../StacksPageTemplate';
import { coursesData } from '../../data/coursesData';

const Marketing = ({ isLoggedIn, onLogout, cartItemsCount }) => {
  const courses = coursesData.marketing;
  return (
    <StacksPageTemplate
      title="Marketing"
      breadcrumb="Marketing"
      courses={courses}
      isLoggedIn={isLoggedIn} 
      onLogout={onLogout} 
      cartItemsCount={cartItemsCount}
    />
  );
};

export default Marketing;