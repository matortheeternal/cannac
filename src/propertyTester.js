const testProperty = {
  array: (actual, expected) => expected.includes(actual),
  object: (actual, expected) => propertiesMatch(actual, expected),
  value: (actual, expected) => actual === expected
};

const resolveType = (value) => {
  const type = typeof value;
  if (type !== 'object') return type;
  return value.constructor === Array ? 'array' : 'object';
};

const propertiesMatch = (resource, expected) => {
  if (!resource || !expected) return false;
  return Object.keys(expected).find((key) => {
    const expectedValue = expected[key];
    const type = resolveType(expectedValue);
    const testFn = testProperty[type] || testProperty.value;
    return !testFn(resource[key], expectedValue);
  }) === undefined;
};

module.exports = { propertiesMatch };