# Method auto-bind for ES6 (ES2015) classes

This package provides a single function, `autobind`, for use within a constructor to bind all methods to the instance itself.

For example, this allows us to pass a method to an event handler `element.addEventListener('click', this.onClick)` and be sure the `onClick` method will always be called with the right context.

Note: This has some specific logic for React, but could be used in any project.

## Usage:

```js
import autobind from 'class-autobind';

class MyComponent extends React.Component {
  constructor() {
    super(...arguments);
    autobind(this);
  }
  render() {
    return <button onClick={this.onClick}>Click Me</button>;
  }
  onClick() {
    console.log('Button Clicked');
  }
}
```

## License

This software is [BSD Licensed](/LICENSE).
