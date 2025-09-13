import React from 'react';
import StacksPageTemplate from '../StacksPageTemplate';
import { coursesData } from '../../data/coursesData';

const ProductStrategy = () => {
  const courses = coursesData.productStrategy;
  return (
    <StacksPageTemplate
      title="Product & Strategy"
      breadcrumb="Product & Strategy"
      courses={courses}
    />
  );
};

export default ProductStrategy;