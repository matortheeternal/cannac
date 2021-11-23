const aliasService = require('../src/aliasService');

describe('aliasService', () => {
  it('should be defined', () => {
    expect(aliasService).toBeDefined();
  });

  it('should initialize an empty object for resource aliases', () => {
    expect(aliasService.resourceAliases).toEqual({});
  });

  it('should initialize an empty array for action aliases', () => {
    expect(aliasService.actionAliases).toEqual({});
  });

  describe('addResourceAlias method', () => {
    it('should add a resource alias', () => {
      aliasService.addResourceAlias('all', () => true);
      expect(aliasService.resourceAliases['all']).toBeDefined();
    });
  });

  describe('addActionAlias method', () => {
    it('should add an action alias', () => {
      aliasService.addActionAlias('manage', () => true);
      expect(aliasService.actionAliases['manage']).toBeDefined();
    });
  });

  describe('resourceMatches method', () => {
    it('should return true if an alias matches', () => {
      expect(aliasService.resourceMatches('all', 'User')).toBe(true);
    });

    it('should return false if an alias does not match', () => {
      expect(aliasService.resourceMatches('userContent', 'Post')).toBe(false);
    });
  });

  describe('actionMatches method', () => {
    it('should return true if an alias matches', () => {
      expect(aliasService.actionMatches('manage', 'create')).toBe(true);
    });

    it('should return false if an alias does not match', () => {
      expect(aliasService.actionMatches('crud', 'create')).toBe(false);
    });
  });
});