export const diffObj = (obj1, obj2) => {
    if (obj1 === obj2) return null;
    return Object.keys(obj2).reduce((diff, key) => {
      if (obj1[key] === obj2[key]) return diff;
      return {
        ...diff,
        [key]: obj2[key]
      };
    }, {});
  };