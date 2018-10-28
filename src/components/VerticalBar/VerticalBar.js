import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { nextIteration } from '../../store/actions/chartActions';

class VerticalBar extends Component {
  data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

  options = {
    maintainAspectRatio: false
  };

  render() {
    console.log(this.props.getNextArray([2, 3, 4], 2));
    return <Bar data={this.data} width={100} height={500} options={this.options} onElementsClick={this.handleClick} />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNextArray: (array, currentIteration) => dispatch(nextIteration(array, currentIteration))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(VerticalBar);
