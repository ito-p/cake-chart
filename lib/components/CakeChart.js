'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp2;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // http://codepen.io/maydie/details/OVmxZZ

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _getTextCoordinates = require('../utils/getTextCoordinates');

var _getTextCoordinates2 = _interopRequireDefault(_getTextCoordinates);

var _createSliceTree = require('../utils/createSliceTree');

var _createSliceTree2 = _interopRequireDefault(_createSliceTree);

var _Ring = require('./Ring');

var _Ring2 = _interopRequireDefault(_Ring);

var _jss = require('jss');

var _jss2 = _interopRequireDefault(_jss);

var _jssVendorPrefixer = require('jss-vendor-prefixer');

var _jssVendorPrefixer2 = _interopRequireDefault(_jssVendorPrefixer);

var _ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');

var _ReactCSSTransitionGroup2 = _interopRequireDefault(_ReactCSSTransitionGroup);

var _getSliceRadiusRange = require('../utils/getSliceRadiusRange');

var _getSliceRadiusRange2 = _interopRequireDefault(_getSliceRadiusRange);

var _getDefaultColor = require('../utils/getDefaultColor');

var _getDefaultColor2 = _interopRequireDefault(_getDefaultColor);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _defaultSheets = require('../utils/defaultSheets');

var _reactJss = require('react-jss');

var _reactJss2 = _interopRequireDefault(_reactJss);

var _lodash = require('lodash.throttle');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_jss2.default.use(_jssVendorPrefixer2.default);

var ringSheet = null;
var ringTransitionSheet = null;

function detachRingSheets() {
  if (ringSheet) {
    ringSheet.detach();
  }

  if (ringTransitionSheet) {
    ringTransitionSheet.detach();
  }
}

function attachRingSheets(props) {
  detachRingSheets();
  var classes = props.sheet.classes;
  var _props$transitionName = props.transitionName,
      transitionName = _props$transitionName === undefined ? classes.pieChart : _props$transitionName,
      _props$labelTransitio = props.labelTransitionName,
      labelTransitionName = _props$labelTransitio === undefined ? classes.labelsBox : _props$labelTransitio,
      _props$className = props.className,
      className = _props$className === undefined ? classes.wrapper : _props$className;

  var _createDefaultSheets = (0, _defaultSheets.createDefaultSheets)(_extends({}, props, {
    transitionName: transitionName, labelTransitionName: labelTransitionName, className: className
  }));

  var _createDefaultSheets2 = _slicedToArray(_createDefaultSheets, 2);

  ringSheet = _createDefaultSheets2[0];
  ringTransitionSheet = _createDefaultSheets2[1];


  ringSheet.attach();
  ringTransitionSheet.attach();
}

function getDefaultLabel(slice) {
  return slice.end - slice.start > 15 && (slice.node.label || slice.node.value);
}

function getDefaultLabelProps(slice, idx, center, props, classes) {
  var _classNames;

  var coreRadius = props.coreRadius,
      ringWidth = props.ringWidth,
      ringWidthFactor = props.ringWidthFactor;

  var pos = (0, _getTextCoordinates2.default)(slice, coreRadius, ringWidth, center, ringWidthFactor);
  var hasChildren = slice.node.children && slice.node.children.length;
  var className = (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, classes.label, true), _defineProperty(_classNames, classes.labelActive, hasChildren), _classNames));
  var label = getDefaultLabel(slice);

  return {
    className: className,
    style: {
      left: pos.x + '%',
      top: pos.y + '%',
      background: (0, _getDefaultColor2.default)(slice.level, idx),
      display: label ? 'block' : 'none'
    },
    key: slice.level + '-' + idx,
    onClick: props.onClick.bind(null, slice.node)
  };
}

function getDefaultKey(node) {
  return node.key || node.label + '-' + node.value;
}

var CakeChart = (_dec = (0, _reactJss2.default)(_defaultSheets.sheet, { link: true }), _dec(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(CakeChart, _Component);

  function CakeChart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CakeChart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CakeChart.__proto__ || Object.getPrototypeOf(CakeChart)).call.apply(_ref, [this].concat(args))), _this), _this.handleWindowResize = function () {
      window.requestAnimationFrame(_this.updateLabelsSize);
    }, _this.debouncedWindowResize = (0, _lodash2.default)(_this.handleWindowResize, 50), _this.updateLabelsSize = function () {
      var labelsEl = (0, _reactDom.findDOMNode)(_this.refs.labels);
      var containerEl = (0, _reactDom.findDOMNode)(_this.refs.container);
      var size = Math.min(containerEl.offsetHeight, containerEl.offsetWidth);
      labelsEl.style.height = size + 'px';
      labelsEl.style.width = size + 'px';
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CakeChart, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      attachRingSheets(this.props);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this.debouncedWindowResize);
      this.updateLabelsSize();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (nextProps.limit !== this.props.limit) {
        attachRingSheets(nextProps);
      }
      this.updateLabelsSize();
    }
  }, {
    key: 'componentWillUnount',
    value: function componentWillUnount() {
      detachRingSheets();
      window.removeEventListener('resize', this.debouncedWindowResize);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var classes = this.props.sheet.classes;
      var _props = this.props,
          coreRadius = _props.coreRadius,
          ringWidth = _props.ringWidth,
          onClick = _props.onClick,
          getRingProps = _props.getRingProps,
          getSliceProps = _props.getSliceProps,
          style = _props.style,
          data = _props.data,
          getKey = _props.getKey,
          stroke = _props.stroke,
          strokeWidth = _props.strokeWidth,
          limit = _props.limit,
          ringWidthFactor = _props.ringWidthFactor,
          _props$transitionName2 = _props.transitionName,
          transitionName = _props$transitionName2 === undefined ? classes.pieChart : _props$transitionName2,
          _props$labelTransitio2 = _props.labelTransitionName,
          labelTransitionName = _props$labelTransitio2 === undefined ? classes.labelsBox : _props$labelTransitio2,
          _props$className2 = _props.className,
          className = _props$className2 === undefined ? classes.wrapper : _props$className2;

      var center = (0, _getSliceRadiusRange2.default)(coreRadius, ringWidth, limit, ringWidthFactor).end;
      var diameter = center * 2;
      var sliceTree = (0, _createSliceTree2.default)(data, limit);
      var centerRule = _jss2.default.createRule({
        transform: 'translate(' + center + 'px, ' + center + 'px)'
      });
      var key = getKey(data, getDefaultKey(data));

      return _react2.default.createElement(
        'div',
        { className: className,
          style: style,
          ref: 'container' },
        _react2.default.createElement(
          'div',
          { className: classes.labels },
          _react2.default.createElement(
            _ReactCSSTransitionGroup2.default,
            { component: 'div',
              className: classes.labelsTransition,
              transitionName: labelTransitionName,
              transitionAppear: true,
              transitionAppearTimeout: 10000,
              transitionEnterTimeout: 10000,
              transitionLeaveTimeout: 10000,
              ref: 'labels' },
            sliceTree.map(function (block, idx) {
              return _this2.renderTexts(block, center, idx + '-' + key);
            })
          )
        ),
        _react2.default.createElement(
          'svg',
          { width: '100%',
            height: '100%',
            viewBox: '0 0 ' + diameter + ' ' + diameter,
            xmlns: 'http://www.w3.org/2000/svg',
            version: '1.1',
            className: classes.svg },
          _react2.default.createElement(
            'g',
            { style: centerRule.style },
            _react2.default.createElement(
              _ReactCSSTransitionGroup2.default,
              { component: 'g',
                transitionName: transitionName,
                transitionAppear: true,
                transitionAppearTimeout: 10000,
                transitionEnterTimeout: 10000,
                transitionLeaveTimeout: 10000 },
              sliceTree.map(function (block, idx) {
                return _react2.default.createElement(_Ring2.default, getRingProps(block, {
                  key: idx + '-' + key,
                  className: ringSheet.classes['ring-' + block.level],
                  slices: block.slices,
                  level: block.level,
                  sliceRadiusRange: (0, _getSliceRadiusRange2.default)(coreRadius, ringWidth, block.level, ringWidthFactor),
                  center: center, getSliceProps: getSliceProps,
                  stroke: stroke, strokeWidth: strokeWidth, onClick: onClick
                }));
              })
            )
          )
        )
      );
    }
  }, {
    key: 'renderTexts',
    value: function renderTexts(block, center, key) {
      var _this3 = this;

      var _props2 = this.props,
          getLabelProps = _props2.getLabelProps,
          getLabel = _props2.getLabel,
          classes = _props2.sheet.classes;


      return _react2.default.createElement(
        'div',
        { key: key,
          className: ringSheet.classes['labels-' + block.level] },
        block.slices.map(function (slice) {
          return _react2.default.createElement(
            'div',
            getLabelProps(slice, block.slices.indexOf(slice), getDefaultLabelProps(slice, block.slices.indexOf(slice), center, _this3.props, classes)),
            getLabel(slice, getDefaultLabel(slice))
          );
        })
      );
    }
  }]);

  return CakeChart;
}(_react.Component), _class2.propTypes = {
  stroke: _propTypes2.default.string,
  strokeWidth: _propTypes2.default.number,
  onClick: _propTypes2.default.func,

  data: _propTypes2.default.shape({
    value: _propTypes2.default.number.isRequired,
    label: _propTypes2.default.any,
    color: _propTypes2.default.string,
    children: _propTypes2.default.array
  }).isRequired,

  coreRadius: _propTypes2.default.number,
  ringWidth: _propTypes2.default.number,
  ringWidthFactor: _propTypes2.default.number,
  limit: _propTypes2.default.number,
  transitionName: _propTypes2.default.string,
  labelTransitionName: _propTypes2.default.string,
  className: _propTypes2.default.string,
  getLabelComponent: _propTypes2.default.func
}, _class2.defaultProps = {
  limit: 5,
  strokeWidth: 3,
  stroke: '#FFFFFF',
  ringWidthFactor: 0.7,
  getRingProps: function getRingProps(block, props) {
    return props;
  },
  getSliceProps: function getSliceProps(slice, idx, props) {
    return props;
  },
  getLabelProps: function getLabelProps(slice, idx, props) {
    return props;
  },
  getLabel: function getLabel(slice, label) {
    return label;
  },
  getKey: function getKey(node, key) {
    return key;
  }
}, _temp2)) || _class);
exports.default = CakeChart;