import React, { Component } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { nextIteration } from '../../store/actions/chartActions';
import { pauseProcess } from '../../store/actions/chartActions';

class VerticalBar extends Component {
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
      // console.log('done');
    }
  }

  options = {
    maintainAspectRatio: false,
    animation: false,
    legend: {
      display: false
    }
    // animationSteps: 1000
  };

  handleClick = e => {
    // console.log('Clicked', this.props);
    this.props.pauseProcess();
  };

  render() {
    const labs = new Array(this.props.length).fill('number');
    const data = {
      labels: [...labs],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(255,99,132,0.2)',
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
    pause: state.chart.pause
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
