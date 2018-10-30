import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { nextIteration } from '../../store/actions/chartActions';
import { pauseProcess } from '../../store/actions/chartActions';

class Donut extends Component {
  state = { array: [], currentIteration: 1, done: false };

  componentDidMount() {
    if (!this.props.done) {
      this.props.getNextArray(this.props.array, this.props.currentIteration);
    }
  }

  componentWillReceiveProps(props) {
    if (!props.done) {
      props.getNextArray(props.array, props.currentIteration);
    } else {
      console.log('done');
    }
  }

  options = {
    maintainAspectRatio: false,
    animation: false,
    legend: {
      display: false
    },
    scales: {
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
    // console.log('Clicked', this.props);
    this.props.pauseProcess();
  };

  render() {
    const labs = new Array(this.props.length).fill('number');
    const defaultColor = 'rgba(255,99,132,0.2)';
    const actionColor = 'blue';
    const finishColor = 'green';
    const colors = new Array(this.props.length).fill(defaultColor);

    this.props.indices.forEach((el, i) => {
      if (el === true) colors[i] = actionColor;
      else if (this.props.done) colors[i] = finishColor;
      else colors[i] = defaultColor;
    });

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
        <Doughnut data={data} width={100} height={500} options={this.options} />
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
)(Donut);
