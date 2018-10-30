import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { nextIteration } from '../../store/actions/chartActions';
import { pauseProcess } from '../../store/actions/chartActions';

class VerticalBar extends Component {
  state = {
    array: [],
    currentIteration: 1,
    done: false,
    cleanUp: false,
    currentCleanupLength: 1,
    finishArray: []
  };

  componentDidMount() {
    if (!this.props.done) {
      this.props.getNextArray(this.props.array, this.props.currentIteration);
    }
  }

  componentWillReceiveProps(props) {
    let timer;
    if (props.done && this.state.cleanUp) {
      clearInterval(timer);
    } else if (!props.done) {
      props.getNextArray(props.array, props.currentIteration);
    } else {
      timer = setInterval(() => {
        let finishArray = new Array(this.state.currentCleanupLength).fill(true);
        this.setState({
          currentCleanupLength: this.state.currentCleanupLength + 1,
          finishArray
        });
        if (finishArray.length > props.length) clearInterval(timer);
      }, 100);
    }
  }

  options = {
    maintainAspectRatio: false,
    animation: false,
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
    // animationSteps: 1000
  };

  handleClick = e => {
    this.props.pauseProcess();
  };

  render() {
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

    return (
      <div>
        <Bar data={data} width={100} height={500} options={this.options} />
        <button onClick={this.handleClick}>Click Me</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log('map' + JSON.stringify(state));
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
    getNextArray: (array, currentIteration) => dispatch(nextIteration(array, currentIteration)),
    pauseProcess: () => dispatch(pauseProcess())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerticalBar);
