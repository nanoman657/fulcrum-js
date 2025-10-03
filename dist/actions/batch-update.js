'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _mixmatch = require('mixmatch');

var _mixmatch2 = _interopRequireDefault(_mixmatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BatchUpdate = function (_Mixin) {
  (0, _inherits3.default)(BatchUpdate, _Mixin);

  function BatchUpdate() {
    (0, _classCallCheck3.default)(this, BatchUpdate);
    return (0, _possibleConstructorReturn3.default)(this, (BatchUpdate.__proto__ || Object.getPrototypeOf(BatchUpdate)).apply(this, arguments));
  }

  (0, _createClass3.default)(BatchUpdate, [{
    key: 'batchUpdate',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ids, attributes) {
        var _body;

        var options, body;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = {
                  body: (_body = {}, (0, _defineProperty3.default)(_body, '' + this.resourcesName, ids.map(function (id) {
                    return { id: id };
                  })), (0, _defineProperty3.default)(_body, 'attributes', attributes), _body)
                };
                _context.next = 3;
                return this.client.api.put(this.actionPath('batch'), options);

              case 3:
                body = _context.sent;
                return _context.abrupt('return', body[this.resourcesName]);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function batchUpdate(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return batchUpdate;
    }()
  }]);
  return BatchUpdate;
}(_mixmatch2.default);

exports.default = BatchUpdate;
module.exports = exports['default'];
//# sourceMappingURL=batch-update.js.map