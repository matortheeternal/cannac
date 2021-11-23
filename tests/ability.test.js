const Ability = require('../src/ability');
const { addResourceAlias, addActionAlias } = require('../src/aliasService');

describe('Ability class', () => {
  let ability;
  
  beforeAll(() => {
    ability = new Ability();
    addResourceAlias('all', () => true);
    addActionAlias('manage', () => true);
  });
  
  describe('new', () => {
    it('should be defined', () => {
      expect(ability).toBeDefined();
    });
    
    it('should initialize abilities array', () => {
      expect(ability.abilities).toBeDefined();
      expect(ability.abilities.length).toBe(0);
    });
  });
  
  describe('can method', () => {
    it('should add an entry to the abilities array', () => {
      ability.can('read', 'all');
      expect(ability.abilities.length).toBe(1);
      expect(ability.abilities[0]).toEqual({
        type: 'can',
        action: 'read',
        resourceType: 'all',
        condition: undefined
      });
    });
    
    it('should unshift new entries onto the abilities array', () => {
      ability.can('create', 'Post');
      expect(ability.abilities.length).toBe(2);
      expect(ability.abilities[0]).toEqual({
        type: 'can',
        action: 'create',
        resourceType: 'Post',
        condition: undefined
      });
    });
  });
  
  describe('cannot method', () => {
    it('should add an entry to the abilities array', () => {
      ability.cannot('read', 'Post', { hidden: true });
      expect(ability.abilities.length).toBe(3);
      expect(ability.abilities[0]).toEqual({
        type: 'cannot',
        action: 'read',
        resourceType: 'Post',
        condition: { hidden: true }
      });
    });
  });
  
  describe('authorize method', () => {
    let user = { id: 1, username: 'Mator' },
        shortUser = { id: 2, username: 'f' },
        post = { id: 1, user_id: 1, content: 'Lorem ipsum dolor sit amet' },
        hiddenPost = { id: 2, user_id: 2, content: '', hidden: true };

    it('should return true if action is authorized', () => {
      expect(ability.authorize('read', 'User', user)).toBe(true);
    });
    
    it('should return false if action is not authorized', () => {
      expect(ability.authorize('create', 'User', user)).toBe(false);
    });

    it('should handle function conditions', () => {
      ability.cannot('read', 'User', u => u.username.length < 3);
      expect(ability.authorize('read', 'User', shortUser)).toBe(false);
    });
    
    it('should handle object conditions correctly', () => {
      expect(ability.authorize('read', 'Post', hiddenPost)).toBe(false);
      expect(ability.authorize('read', 'Post', post)).toBe(true);
    });

    it('should work with action aliases', () => {
      ability.can('manage', 'Post', { user_id: user.id });
      expect(ability.authorize('update', 'Post', post)).toBe(true);
      expect(ability.authorize('asdf', 'Post', post)).toBe(true);
    });
  });

  describe('getAbilities method', () => {
    it('should return an array of abilities for the resource', () => {
      const abilities = ability.getAbilities('read', 'User');
      expect(abilities).toBeDefined();
      expect(abilities.length).toBe(2);
      expect(abilities[0]).toEqual(expect.objectContaining({
        type: 'cannot',
        action: 'read',
        resourceType: 'User'
      }));
      expect(abilities[1]).toEqual(expect.objectContaining({
        type: 'can',
        action: 'read',
        resourceType: 'all'
      }));
    });
  });
});