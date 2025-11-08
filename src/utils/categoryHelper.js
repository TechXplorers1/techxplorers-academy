// src/utils/categoryHelper.js

// A map to convert camelCase keys to human-readable titles.
// This map is NOW consistent with the output of the new toCamelCase function
export const categoryMap = {
  freeStacks: 'Free Stacks',
  productStrategy: 'Product & Strategy',
  uxUiDesign: 'UX & UI Design',
  engineeringDevelopment: 'Engineering & Development',
  dataAnalytics: 'Data & Analytics',
  cybersecurityCompliance: 'Cybersecurity & Compliance',
  aiAutomation: 'AI & Automation',
  marketing: 'Marketing',
};

// Converts a string to camelCase (e.g., "AI & Automation" -> "aiAutomation")
// MODIFIED: This function is now fixed
export const toCamelCase = (str) => {
  if (!str) return '';
  return str
    .toLowerCase() // ADDED: Lowercase the entire string first
    .replace(/ & /g, '-') // first handle '&'
    .replace(/[^a-zA-Z0-9]+(.)?/g, (match, chr) => chr ? chr.toUpperCase() : ''); // REMOVED: The flawed .replace(/^./, ...)
};

// Converts a camelCase string to kebab-case for URLs (e.g., productStrategy -> product-strategy)
export const toKebabCase = (str) => {
  if (!str) return '';
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
};

// Converts a kebab-case string back to camelCase for data lookups (e.g., product-strategy -> productStrategy)
export const toCamelCaseFromKebab = (str) => {
    if (!str) return '';
    return str.replace(/-./g, x => x[1].toUpperCase());
};