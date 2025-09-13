import React from 'react';
import StacksPageTemplate from '../StacksPageTemplate';
import { coursesData } from '../../data/coursesData';

const FreeStacks = () => {
  const courses = coursesData.freeStacks;
  return (
    <StacksPageTemplate
      title="Free Stacks"
      breadcrumb="Free Stacks"
      courses={courses}
    />
  );
};

export default FreeStacks;