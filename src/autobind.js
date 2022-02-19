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

function isAccessor(proto: ?Object, name: String) {
  let desc = Object.getOwnPropertyDescriptor(proto, name);
  if (!!desc && (typeof desc.get === 'function' || typeof desc.set === 'function')) {
    return true;
  }

  return false;
}

export default function autobind(instance: Object, proto: ?Object) {
  if (proto == null) {
    proto = Object.getPrototypeOf(instance);
  }
  let propertyNames = Object.getOwnPropertyNames(proto);
  for (let name of propertyNames) {
    if (isAccessor(proto, name)) {
      continue;
    }
    let value = proto[name];
    if (isFunction(value) && !isExcluded(name)) {
      instance[name] = proto[name].bind(instance);
    }
  }
}
