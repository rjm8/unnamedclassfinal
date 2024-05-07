import { Component } from 'react';
import './App.css';
import tips from './tips.csv'
import * as d3 from 'd3'
import PScatter from './PScatter';
import PLine from './PLine';
import Slider from './Slider';
import SampleDataset from './SampleDataset.csv'
import './App.css'
import BarChart from './BarChart';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []}
  }

  componentDidMount() {
    var self = this
    d3.csv(SampleDataset, function(d) {
      return {
        x: parseInt(d.x),
        y: parseInt(d.y),
        category: d.category
      };
    }).then(function(csvData){
      //console.log(csvData);
      self.setState({data: csvData});
    }).catch(function(err){
      console.log(err);
    });

  }

  handleDateChange = (newDateRange) => {
    this.setState({dateRange: newDateRange})
  }

  render() {
    return (
      <div className="App">
        <BarChart data={this.state.data} />
        <PScatter data={this.state.data} />
      </div>
    );
  } 
}

export default App;
