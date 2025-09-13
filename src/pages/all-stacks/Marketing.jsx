import React from 'react';
import StacksPageTemplate from '../StacksPageTemplate';
import { coursesData } from '../../data/coursesData';

const Marketing = () => {
  const courses = coursesData.marketing;
  return (
    <StacksPageTemplate
      title="Marketing"
      breadcrumb="Marketing"
      courses={courses}
    />
  );
};

export default Marketing;