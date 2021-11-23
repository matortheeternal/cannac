const { propertiesMatch } = require('./propertyTester');
const { actionMatches, resourceMatches } = require('./aliasService');

class AbilityMatcher {
  constructor(action, resourceType, resource) {
    this.action = action;
    this.resourceType = resourceType;
    this.resource = resource;
  }

  conditionsPass(ability) {
    if (!ability.condition) return true;
    return ability.condition.constructor === Function
      ? ability.condition(this.resource)
      : propertiesMatch(this.resource, ability.condition);
  }

  find(abilities) {
    return abilities.find(ability => {
      return actionMatches(ability.action, this.action) &&
        resourceMatches(ability.resourceType, this.resourceType) &&
        this.conditionsPass(ability);
    });
  }

  filter(abilities) {
    return abilities.filter(ability => {
      return actionMatches(ability.action, this.action) &&
        resourceMatches(ability.resourceType, this.resourceType);
    });
  }
}

module.exports = AbilityMatcher;