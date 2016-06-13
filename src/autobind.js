/* @flow */

// The following React methods should not be automatically bound.
const REACT_EXCLUDE_METHODS = {
  getChildContext: true,
  render: true,
  componentWillMount: true,
  componentDidMount: true,
  componentWillReceiveProps: true,
  shouldComponentUpdate: true,
  componentWillUpdate: true,
  componentDidUpdate: true,
  componentWillUnmount: true,
};

function isExcluded(methodName) {
  return (REACT_EXCLUDE_METHODS[methodName] === true);
}

function isFunction(item) {
  return (typeof item === 'function');
}

export default function autobind(instance: Object, proto: ?Object) {
  if (proto == null) {
    proto = Object.getPrototypeOf(instance);
  }
  let propertyNames = Object.getOwnPropertyNames(proto);
  for (let name of propertyNames) {
    let value = proto[name];
    if (isFunction(value) && !isExcluded(name)) {
      instance[name] = proto[name].bind(instance);
    }
  }
}
