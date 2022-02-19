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

  it('should NOT accept optional second param', () => {
    class Foo {
      constructor() {
        // When called from a subclass via super(), we cannot auto-detect which
        // prototype we should use as a source for autobind.
        autobind(this, Foo.prototype);
      }
      getThis() {
        return this;
      }
    }
    class Bar extends Foo {}
    let bar = new Bar();
    expect(bar.getThis).toNotBe(Foo.prototype.getThis);
    expect(invoke(bar.getThis)).toBe(bar);
  });

  it('should NOT bind class accessors', () => {
    class Foo {
      constructor() {
        autobind(this, Foo.prototype);
      }

      get getAccessor() {
        throw 'Accesor called';
      }

      set setAccessor(val) {
        this.value = val;
      }
    }
    try {
      let foo = new Foo();
      expect(foo).toNotBe(undefined);
    } catch (e) {
      expect(e).toBe(undefined);
    }
  });
});
