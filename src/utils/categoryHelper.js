// A map to convert camelCase keys to human-readable titles.
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

// Converts a string to camelCase (e.g., "Product & Strategy" -> "productStrategy")
export const toCamelCase = (str) => {
  if (!str) return '';
  return str
    .replace(/ & /g, '-') // first handle '&'
    .replace(/[^a-zA-Z0-9]+(.)?/g, (match, chr) => chr ? chr.toUpperCase() : '')
    .replace(/^./, (match) => match.toLowerCase());
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