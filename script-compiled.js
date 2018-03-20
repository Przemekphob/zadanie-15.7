'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

var resultsArray = [];

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch() {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this));

        _this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            watch: null,
            resultsArray: []
        };
        return _this;
    }

    _createClass(Stopwatch, [{
        key: 'reset',
        value: function reset() {
            this.setState({
                times: {
                    minutes: 0,
                    seconds: 0,
                    miliseconds: 0
                }
            });
            this.clearArray();
        }
    }, {
        key: 'format',
        value: function format(times) {
            return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
        }
    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            if (!this.state.running) {
                this.setState({
                    running: true,
                    watch: setInterval(function () {
                        return _this2.step();
                    }, 10)
                });
            }
        }
    }, {
        key: 'step',
        value: function step() {
            var miliseconds = this.state.times.miliseconds;
            var seconds = this.state.times.seconds;
            var minutes = this.state.times.minutes;

            miliseconds++;
            if (miliseconds >= 100) {
                seconds++;
                miliseconds = 0;
            }

            if (seconds >= 60) {
                minutes++;
                seconds = 0;
            }

            this.setState({
                times: {
                    miliseconds: miliseconds,
                    seconds: seconds,
                    minutes: minutes
                }
            });
        }
    }, {
        key: 'stop',
        value: function stop() {
            clearInterval(this.state.watch);
            this.setState({
                running: false,
                watch: null
            });
        }
    }, {
        key: 'addTo',
        value: function addTo() {
            this.setState({
                resultsArray: []
            }), console.log(resultsArray[this.format(this.state.times)]);
        }
    }, {
        key: 'clearArray',
        value: function clearArray() {
            this.setState({
                resultsArray: []
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: '.controls' },
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', onClick: this.start.bind(this) },
                        'Start '
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', onClick: this.stop.bind(this) },
                        'Stop '
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', onClick: this.reset.bind(this) },
                        'Reset '
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', onClick: this.addTo.bind(this) },
                        'Add '
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', onClick: this.clearArray.bind(this) },
                        'Clear-list '
                    )
                ),
                React.createElement(
                    'div',
                    null,
                    this.format(this.state.times)
                )
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

ReactDOM.render(React.createElement(Stopwatch, null), document.querySelector('.stopwatch'));

/*
class Stopwatch {
	constructor(display) {
		this.running = false;
		this.display = display;
		this.reset();
		this.print(this.times);
	}

	reset() {
		this.times = {
			minutes: 0,
			seconds: 0,
			miliseconds: 0
		};
	}

	print() {
		this.display.innerText = this.format(this.times);
	}

	format(times) {
    	return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}

	start() {
	    if (!this.running) {
	        this.running = true;
	        this.watch = setInterval(() => this.step(), 10);
	    }
	}

	step() {
	    if (!this.running) return;
	    this.calculate();
	    this.print();
	}

	calculate() {
	    this.times.miliseconds += 1;
	    if (this.times.miliseconds >= 100) {
	        this.times.seconds += 1;
	        this.times.miliseconds = 0;
	    }
	    if (this.times.seconds >= 60) {
	        this.times.minutes += 1;
	        this.times.seconds = 0;
	    }
	}

	stop() {
	    this.running = false;
	    clearInterval(this.watch);
	    timeArray.push(this.format(this.times));
		console.log(timeArray);
	}

	stopres() {
		this.stop();
		this.reset();
		this.print();

	}
}


function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

let timeArray = [];

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.stopres());

let resetArray = document.getElementById('arrayres');
resetArray.addEventListener('click', 
	function clearArray() {
  		return console.log(timeArray = [])
	} , false);

const stopwatch = new Stopwatch(
	document.querySelector('.stopwatch'));
*/
