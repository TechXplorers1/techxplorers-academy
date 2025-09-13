import React from 'react';
import StacksPageTemplate from '../StacksPageTemplate';
import { coursesData } from '../../data/coursesData';

const AiAutomation = () => {
  const courses = coursesData.aiAutomation;
  return (
    <StacksPageTemplate
      title="AI & Automation"
      breadcrumb="AI & Automation"
      courses={courses}
    />
  );
};

export default AiAutomation;