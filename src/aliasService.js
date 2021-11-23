const resourceAliases = {};
const actionAliases = {};

const addResourceAlias = (alias, test) => {
  resourceAliases[alias] = test;
};

const addActionAlias = (alias, test) => {
  actionAliases[alias] = test;
};

const actionMatches = (abilityAction, action) => {
  const test = actionAliases[abilityAction];
  return abilityAction === action ||
    Boolean(test && test(action));
};

const resourceMatches = (abilityResource, resource) => {
  const test = resourceAliases[abilityResource];
  return abilityResource === resource ||
    Boolean(test && test(resource));
};

module.exports = {
  addResourceAlias,
  addActionAlias,
  actionMatches,
  resourceMatches,
  resourceAliases,
  actionAliases
};