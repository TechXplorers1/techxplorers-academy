import React from 'react';
import StacksPageTemplate from '../StacksPageTemplate';
import { coursesData } from '../../data/coursesData';

const EngineeringDevelopment = () => {
  const courses = coursesData.engineeringDevelopment;
  return (
    <StacksPageTemplate
      title="Engineering & Development"
      breadcrumb="Engineering & Development"
      courses={courses}
    />
  );
};

export default EngineeringDevelopment;