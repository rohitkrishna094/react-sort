import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { nextIteration } from '../../store/actions/chartActions';

class VerticalBar extends Component {
  state = { array: [] };

  options = {
    maintainAspectRatio: false
  };

  handleClick = e => {
    // console.log('Clicked', this.props);
  };

  render() {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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

    this.props.getNextArray(this.state.array, 3);
    return (
      <div>
        <Bar data={data} width={100} height={500} options={this.options} />
        <button onClick={this.handleClick}>Click Me</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    array: state.chart.array
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getNextArray: (array, currentIteration) => dispatch(nextIteration(array, currentIteration))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerticalBar);
