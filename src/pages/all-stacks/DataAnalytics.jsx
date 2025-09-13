import React from 'react';
import StacksPageTemplate from '../StacksPageTemplate';
import { coursesData } from '../../data/coursesData';

const DataAnalytics = () => {
  const courses = coursesData.dataAnalytics;
  return (
    <StacksPageTemplate
      title="Data & Analytics"
      breadcrumb="Data & Analytics"
      courses={courses}
    />
  );
};

export default DataAnalytics;