import React, { Component } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { nextIteration } from '../../store/actions/chartActions';
import { pauseProcess } from '../../store/actions/chartActions';
import { randomize } from '../../store/actions/chartActions';

class VerticalBar extends Component {
  state = {
    array: [],
    currentIteration: 1,
    done: false,
    cleanUp: false,
    currentCleanupLength: 1,
    finishArray: [],
    delay: 0,
    animDuration: 0,
    componentType: false
    // arrayLength: 100
  };

  componentDidMount() {
    // if (!this.props.done) {
    //   this.props.getNextArray(this.props.array, this.props.currentIteration, this.state.delay);
    // }
  }

  handlePause = e => {
    if (!this.props.done) {
      this.props.getNextArray(this.props.array, this.props.currentIteration, this.state.delay);
    }
    this.props.pauseProcess();
  };

  componentWillReceiveProps(props) {
    let timer;
    if (props.done && this.state.cleanUp) {
      clearInterval(timer);
    } else if (!props.done) {
      props.getNextArray(props.array, props.currentIteration, this.state.delay);
    } else {
      timer = setInterval(() => {
        let finishArray = new Array(this.state.currentCleanupLength).fill(true);
        this.setState({
          currentCleanupLength: this.state.currentCleanupLength + 1,
          finishArray
        });
        if (finishArray.length > props.length) clearInterval(timer);
      }, this.state.delay);
    }
  }

  options = {
    maintainAspectRatio: false,
    animation: {
      duration: this.state.animDuration,
      easing: 'linear',
      rotate: true,
      scale: false
    },
    legend: {
      display: false
    },
    scales: {
      xAxes: [{ display: false }],
      yAxes: [
        {
          ticks: {
            beginAtZero: false
          }
        }
      ]
    }
  };

  handleAnimChange = e => {
    this.setState({ animDuration: e.target.value });
  };

  handleTimeChange = e => {
    this.setState({ delay: e.target.value });
  };

  components = {
    vertical: VerticalBar,
    donut: Doughnut
  };

  render() {
    let newOptions = JSON.parse(JSON.stringify(this.options));
    newOptions.animation.duration = this.state.animDuration;

    const labs = new Array(this.props.length).fill('number');
    const defaultColor = 'rgba(255,99,132,0.2)';
    const actionColor = 'blue';
    const finishColor = 'green';
    const colors = new Array(this.props.length).fill(defaultColor);

    if (!this.props.done) {
      this.props.indices.forEach((el, i) => {
        if (el === true) colors[i] = actionColor;
        else colors[i] = defaultColor;
      });
    } else {
      this.props.indices.forEach((el, i) => {
        colors[i] = defaultColor;
      });
      this.state.finishArray.forEach((el, i) => {
        colors[i] = finishColor;
      });
    }

    const data = {
      labels: [...labs],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: [...colors],
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.props.array
        }
      ]
    };

    const rStyle = {
      width: '10%',
      marginLeft: '10px'
    };

    let buttonName = this.props.done ? 'Restart?' : this.props.pause ? 'Start' : 'Pause';
    return (
      <div>
        <button className="waves-effect waves-light btn" type="button" onClick={this.handleChange}>
          Dynamic Components
        </button>

        <button className="waves-effect waves-light btn" type="button" onClick={this.handleRandomize}>
          Randomize Data
        </button>

        <button className="waves-effect waves-light btn" onClick={this.handlePause}>
          {buttonName}
        </button>

        <label htmlFor="animationSlider" style={rStyle}>
          Animation Duration
        </label>
        <input style={rStyle} type="range" id="animationSlider" min="1" max="500" onChange={this.handleAnimChange} />
        <label htmlFor="timeSlider" style={rStyle}>
          Time interval
        </label>
        <input style={rStyle} type="range" id="timeSlider" min="0" max="500" onChange={this.handleTimeChange} />

        {this.state.componentType ? (
          <Doughnut data={data} width={100} height={300} options={newOptions} />
        ) : (
          <Bar data={data} width={100} height={300} options={newOptions} />
        )}
      </div>
    );
  }

  handleRandomize = e => {
    this.props.randomize();
  };

  handleChange = e => {
    this.setState({ componentType: !this.state.componentType });
  };
} // end class

const mapStateToProps = state => {
  return {
    array: state.chart.array,
    length: state.chart.length,
    currentIteration: state.chart.currentIteration,
    done: state.chart.done,
    pause: state.chart.pause,
    indices: state.chart.indices
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getNextArray: (array, currentIteration, delay) => dispatch(nextIteration(array, currentIteration, delay)),
    pauseProcess: () => dispatch(pauseProcess()),
    randomize: () => dispatch(randomize())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerticalBar);
