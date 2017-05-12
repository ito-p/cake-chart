'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2; // http://codepen.io/maydie/details/OVmxZZ

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _getAnglePoint = require('../utils/getAnglePoint');

var _getAnglePoint2 = _interopRequireDefault(_getAnglePoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Slice = (_temp2 = _class = function (_Component) {
  _inherits(Slice, _Component);

  function Slice() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Slice);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Slice.__proto__ || Object.getPrototypeOf(Slice)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function () {
      _this.props.onClick && _this.props.onClick(_this.props.node);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Slice, [{
    key: 'drawPath',
    value: function drawPath() {
      var _props = this.props,
          angleRange = _props.angleRange,
          sliceRadiusRange = _props.sliceRadiusRange;


      var angle = angleRange.end - angleRange.start;
      var startRadius = sliceRadiusRange.start;
      var endRadius = sliceRadiusRange.end;

      // Get angle points
      var a = (0, _getAnglePoint2.default)(angleRange.start, angleRange.end, endRadius, 0, 0);
      var b = (0, _getAnglePoint2.default)(angleRange.start, angleRange.end, startRadius, 0, 0);

      return ['M' + a.x1 + ',' + a.y1, 'A' + endRadius + ',' + endRadius + ' 0 ' + (angle > 180 ? 1 : 0) + ',1 ' + a.x2 + ',' + a.y2, angle < 360 ? 'L' + b.x2 + ',' + b.y2 : 'M' + b.x2 + ',' + b.y2, startRadius > 0 ? 'A' + startRadius + ',' + startRadius + ' 0 ' + (angle > 180 ? 1 : 0) + ',0 ' + b.x1 + ',' + b.y1 : '', 'Z'].join(' ');
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          fill = _props2.fill,
          stroke = _props2.stroke,
          strokeWidth = _props2.strokeWidth,
          className = _props2.className;

      return _react2.default.createElement('path', _extends({ d: this.drawPath(),
        onClick: this.handleClick
      }, { fill: fill, stroke: stroke, strokeWidth: strokeWidth, className: className }));
    }
  }]);

  return Slice;
}(_react.Component), _class.propTypes = {
  angleRange: _propTypes2.default.shape({
    start: _propTypes2.default.number.isRequired,
    end: _propTypes2.default.number.isRequired
  }),
  sliceRadiusRange: _propTypes2.default.shape({
    start: _propTypes2.default.number.isRequired,
    end: _propTypes2.default.number.isRequired
  }),
  stroke: _propTypes2.default.string,
  fill: _propTypes2.default.string,
  strokeWidth: _propTypes2.default.number,
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  node: _propTypes2.default.any
}, _class.defaultProps = {
  strokeWidth: 3
}, _temp2);
exports.default = Slice;