const AbilityMatcher = require('./abilityMatcher');

class Ability {
  constructor() {
    this.abilities = [];
  }
  
  can(action, resourceType, condition) {
    const type = 'can';
    this.abilities.unshift({ type, action, resourceType, condition });
  }

  cannot(action, resourceType, condition) {
    const type = 'cannot';
    this.abilities.unshift({ type, action, resourceType, condition });
  }

  getAbilities(action, resourceType) {
    const matcher = new AbilityMatcher(action, resourceType);
    return matcher.filter(this.abilities);
  }

  getAbility(action, resourceType, resource) {
    const matcher = new AbilityMatcher(action, resourceType, resource);
    return matcher.find(this.abilities);
  }

  authorize(action, resourceType, resource) {
    const ability = this.getAbility(action, resourceType, resource);
    return Boolean(ability) && ability.type !== 'cannot';
  }
}

module.exports = Ability;