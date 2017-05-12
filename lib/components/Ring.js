'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _function = require('react-pure-render/function');

var _function2 = _interopRequireDefault(_function);

var _Slice = require('./Slice');

var _Slice2 = _interopRequireDefault(_Slice);

var _getDefaultColor = require('../utils/getDefaultColor');

var _getDefaultColor2 = _interopRequireDefault(_getDefaultColor);

var _reactJss = require('react-jss');

var _reactJss2 = _interopRequireDefault(_reactJss);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ring = (_dec = (0, _reactJss2.default)({
  slice: {},

  sliceActive: {
    cursor: 'pointer'
  },

  backgroundRect: {
    visibility: 'none',
    'pointer-events': 'none'
  }
}), _dec(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(Ring, _Component);

  function Ring() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Ring);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Ring.__proto__ || Object.getPrototypeOf(Ring)).call.apply(_ref, [this].concat(args))), _this), _this.shouldComponentUpdate = _function2.default, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Ring, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          slices = _props.slices,
          level = _props.level,
          sliceRadiusRange = _props.sliceRadiusRange,
          center = _props.center,
          stroke = _props.stroke,
          strokeWidth = _props.strokeWidth,
          onClick = _props.onClick,
          className = _props.className,
          getSliceProps = _props.getSliceProps,
          classes = _props.sheet.classes;

      var rectSize = sliceRadiusRange.end + 20;
      var hasChildren = function hasChildren(s) {
        return s.node.children && s.node.children.length > 0;
      };

      return _react2.default.createElement(
        'g',
        { className: className },
        _react2.default.createElement('rect', { x: center - rectSize, y: center - rectSize,
          width: rectSize * 2, height: rectSize * 2,
          fill: 'transparent', className: classes.backgroundRect }),
        slices.map(function (slice, idx) {
          var _classNames;

          return _react2.default.createElement(_Slice2.default, getSliceProps(slice, idx, {
            key: idx,
            node: slice.node,
            angleRange: { start: slice.start, end: slice.end },
            percentValue: slice.percentValue.toFixed(1),
            fill: (0, _getDefaultColor2.default)(level, idx),
            className: (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, classes.sliceActive, hasChildren(slice)), _defineProperty(_classNames, classes.slice, true), _classNames)),
            stroke: stroke, strokeWidth: strokeWidth, sliceRadiusRange: sliceRadiusRange, onClick: onClick, level: level
          }));
        })
      );
    }
  }]);

  return Ring;
}(_react.Component), _class2.propTypes = {
  stroke: _Slice2.default.propTypes.stroke,
  strokeWidth: _Slice2.default.propTypes.strokeWidth,
  sliceRadiusRange: _Slice2.default.propTypes.sliceRadiusRange,
  onClick: _Slice2.default.propTypes.onClick,

  level: _propTypes2.default.number.isRequired,
  center: _propTypes2.default.number.isRequired,
  className: _propTypes2.default.string.isRequired,
  getSliceProps: _propTypes2.default.func.isRequired,
  slices: _propTypes2.default.array.isRequired
}, _temp2)) || _class);
exports.default = Ring;