const validator = require('validator');

const validateUrl = (url) => {
  if (!url || !validator.isURL(url, { require_protocol: true })) {
    return { valid: false, message: 'Please provide a valid URL with protocol (e.g. https://example.com)' };
  }
  return { valid: true };
};

const validateAlias = (alias) => {
  if (!alias) return { valid: true };

  if (alias.length < 3 || alias.length > 20) {
    return { valid: false, message: 'Custom alias must be between 3 and 20 characters' };
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(alias)) {
    return { valid: false, message: 'Alias can only contain letters, numbers, hyphens, and underscores' };
  }

  return { valid: true };
};

module.exports = { validateUrl, validateAlias };
