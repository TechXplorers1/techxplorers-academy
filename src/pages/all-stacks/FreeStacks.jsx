import React from 'react';
import StacksPageTemplate from '../StacksPageTemplate';
import { coursesData } from '../../data/coursesData';

const FreeStacks = ({ isLoggedIn, onLogout, cartItemsCount }) => {
  const courses = coursesData.freeStacks;
  return (
    <StacksPageTemplate
      title="Free Stacks"
      breadcrumb="Free Stacks"
      courses={courses}
      isLoggedIn={isLoggedIn} 
      onLogout={onLogout} 
      cartItemsCount={cartItemsCount}
    />
  );
};

export default FreeStacks;