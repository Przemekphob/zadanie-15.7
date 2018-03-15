class Stopwatch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			running: false,
			display: display,
			timeArray: [],
            times: {
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            }
		}
	}

	reset() {
		this.setState({
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		});
	}

	print() {
		this.display.innerText = this.format(this.times);
	}

	format(times) {
    	return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(Math.floor(times.miliseconds))}`;
	}

    start() {
        if (!this.state.running) {
            this.setState({
                running: true
            });
            this.watch = setInterval(() => this.step(), 10);
        }
    }

	step() {
	    if (!this.state.running) return;
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
        if (this.state.running) {
            this.setState({
                running: false
            });
            clearInterval(this.watch);
        }
    }

	stopres() {
		this.stop();
		this.reset();
		this.print();

	}

	clearArray() {
		this.setState({
            timeArray: []
        });
	}

	pad0(value) {
	    let result = value.toString();
	    if (result.length < 2) {
	        result = '0' + result;
	    }
	    return result;
	}

	render() {
        return (
            <div>
                <div className='controls'>
                    <a href='#' className='button' onClick={this.start.bind(this)}>Start</a>
                    <a href='#' className='button' onClick={this.stop.bind(this)}>Stop</a>
                    <a href='#' className='button' onClick={this.reset.bind(this)}>Reset</a>
                    <a href='#' className='button' onClick={this.clearArray.bind(this)}>Clear Array</a>
                </div>
                <div>{this.format(this.state.times)}</div>
                <ul className="results">
                    {this.state.timeArray.map(item => <li key={item}>{item}</li>)}
                </ul>;
            </div>
        );
    }

}


ReactDOM.render(<Stopwatch/>, document.querySelector('.stopwatch'))


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