import React from 'react';
import StacksPageTemplate from '../StacksPageTemplate';
import { coursesData } from '../../data/coursesData';

const ProductStrategy = ({ isLoggedIn, onLogout, cartItemsCount }) => {
  const courses = coursesData.productStrategy;
  return (
    <StacksPageTemplate
      title="Product & Strategy"
      breadcrumb="Product & Strategy"
      courses={courses}
      isLoggedIn={isLoggedIn} 
      onLogout={onLogout} 
      cartItemsCount={cartItemsCount}
    />
  );
};

export default ProductStrategy;