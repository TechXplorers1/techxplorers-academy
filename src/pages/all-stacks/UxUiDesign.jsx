import React from 'react';
import StacksPageTemplate from '../StacksPageTemplate';
import { coursesData } from '../../data/coursesData';

const UxUiDesign = () => {
  const courses = coursesData.uxUiDesign;
  return (
    <StacksPageTemplate
      title="UX & UI Design"
      breadcrumb="UX & UI Design"
      courses={courses}
    />
  );
};

export default UxUiDesign;