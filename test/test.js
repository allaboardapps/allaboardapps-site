var assert = require('chai').assert;
var expect = require('chai').expect;
var React = require('react');
var addons = require('react-addons');
var classSet = addons.classSet;
var TestUtils = React.addons.TestUtils;

describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
      expect([1,2,3].indexOf(0)).to.equal(-1);
    });
  });
});

// describe('App component', function(){

//   before('render and locate element', function() {
//     var renderedComponent = TestUtils.renderIntoDocument(
//       <App/>
//     );

//     // Searching for <input> tag within rendered React component
//     // Throws an exception if not found
//     var imageComponent = TestUtils.findRenderedDOMComponentWithTag(
//       renderedComponent,
//       'img'
//     );

//     this.element = imageComponent.getDOMNode();
//   });

//   it('<img> should have class "what"', function() {
//     expect(this.element).toHaveClass('whiz');
//   });

// });
