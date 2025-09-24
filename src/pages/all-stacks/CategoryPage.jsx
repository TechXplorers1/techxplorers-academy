import React from 'react';
import { useParams } from 'react-router-dom';
import StacksPageTemplate from '../StacksPageTemplate';
import { categoryMap, toCamelCaseFromKebab } from '../../utils/categoryHelper';

const CategoryPage = ({ isLoggedIn, onLogout, cartItemsCount, coursesData }) => {
  const { categoryKey } = useParams();

  const camelCaseKey = toCamelCaseFromKebab(categoryKey);

  const courses = coursesData[camelCaseKey] || [];

  const title = categoryMap[camelCaseKey] || "Courses";

  return (
    <StacksPageTemplate
      title={title}
      breadcrumb={title}
      courses={courses}
      isLoggedIn={isLoggedIn}
      onLogout={onLogout}
      cartItemsCount={cartItemsCount}
    />
  );
};

export default CategoryPage;