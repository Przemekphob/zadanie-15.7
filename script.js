function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

class Stopwatch extends React.Component {
    constructor() {
        super();
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            watch: null,
            resultsArray: []
        }
    }

    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        })
        this.clearArray();

    }


    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.state.running) {
            this.setState({
                running: true,
                watch: setInterval(() => this.step(), 10)
            })
        }
    }

    step() {
        let miliseconds = this.state.times.miliseconds;
        let seconds = this.state.times.seconds;
        let minutes = this.state.times.minutes;

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
                miliseconds,
                seconds,
                minutes
            }
        })
    }

    stop() {
        clearInterval(this.state.watch);
        this.setState({
            running: false,
            watch: null
        });
    }

	addTo() {
        this.setState({
            resultsArray: []
        })
	  }


    clearArray() {
        this.setState({
            resultsArray: []
        })
    }

	render() {
        return (
            <div>
                <div className='.controls'>
                    <a href='#' className='button' onClick={this.start.bind(this)}>Start </a>
                    <a href='#' className='button' onClick={this.stop.bind(this)}>Stop </a>
                    <a href='#' className='button' onClick={this.reset.bind(this)}>Reset </a>
                    <a href='#' className='button' onClick={this.addTo.bind(this)}>Add </a>
                    <a href='#' className='button' onClick={this.clearArray.bind(this)}>Clear-list </a>
                </div>
                <div>{this.format(this.state.times)}</div>
            </div>
        );
    }

}



ReactDOM.render(<Stopwatch/>, document.querySelector('.stopwatch'));
