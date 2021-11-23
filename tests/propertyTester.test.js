const { propertiesMatch } = require('../src/propertyTester');

describe('propertiesMatch', () => {
  it('should return false if resource is undefined', () => {
    expect(propertiesMatch()).toBe(false);
  });
  
  it('should return false if expected is undefined', () => {
    expect(propertiesMatch({})).toBe(false);
  });
  
  it('should return false if an expected propery is not present', () => {
    expect(propertiesMatch({}, { a: 1 })).toBe(false);
  });
  
  it('should return false if a value property does not match', () => {
    expect(propertiesMatch({ a: 1 }, { a: 2 })).toBe(false);
  });
  
  it('should return true when value properties match', () => {
    expect(propertiesMatch({ a: 1 }, { a: 1 })).toBe(true);
  });
  
  it('should ignore extra resource properties', () => {
    expect(propertiesMatch({ a: 1, b: 2 }, { a: 1 })).toBe(true);
  });
  
  it('should return true if resource value is in array', () => {
    expect(propertiesMatch({ a: 1 }, { a: [3, 2, 1] })).toBe(true);
  });
  
  it('should return false if resource value is not in array', () => {
    expect(propertiesMatch({ a: 4 }, { a: [3, 2, 1] })).toBe(false);
  });
  
  it('should return false if nesting missing', () => {
    expect(propertiesMatch({}, { a: { b: 1 } })).toBe(false);
  });
  
  it('should return false if nested value is missing', () => {
    expect(propertiesMatch({ a: { c: 2 } }, { a: { b: 1 } })).toBe(false);
  });
  
  it('should return false if nested value does not match', () => {
    expect(propertiesMatch({ a: { b: 2 } }, { a: { b: 1 } })).toBe(false);
  });
  
  it('should return true if nested value matches', () => {
    expect(propertiesMatch({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);
  });
});