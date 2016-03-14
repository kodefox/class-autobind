/* @flow */
const {describe, it} = global;
import expect from 'expect';
import autobind from '../autobind';

const invoke = (fn) => fn();

describe('autobind', () => {
  it('should bind methods', () => {
    class Foo {
      constructor() {
        autobind(this);
      }
      getThis() {
        return this;
      }
    }
    let foo = new Foo();
    expect(foo.getThis).toNotBe(Foo.prototype.getThis);
    expect(invoke(foo.getThis)).toBe(foo);
  });

  it('should NOT bind excluded methods', () => {
    class Foo {
      constructor() {
        autobind(this);
      }
      render() {
        return this;
      }
    }
    let foo = new Foo();
    expect(foo.render).toBe(Foo.prototype.render);
    expect(invoke(foo.render)).toBe(undefined);
  });
});
