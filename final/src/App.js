import { Component } from 'react';
import './App.css';
import tips from './tips.csv'
import * as d3 from 'd3'
import PScatter from './PScatter';
import PLine from './PLine';
import Slider from './Slider';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {data: [], data2: [], dateRange: [new Date("2022-01-01"), new Date("2022-12-01")]}
  }

  componentDidMount() {
    var self = this
    d3.csv(tips, function(d) {
      return {
        tip: parseFloat(d.tip),
        total_bill: parseFloat(d.total_bill),
        sex: d.sex,
        day: d.day,
        time: d.time,
        smoker: d.smoker,
        size: parseInt(d.size)
      };
    }).then(function(csvData){
      self.setState({data: csvData});
    }).catch(function(err){
      console.log(err);
    });

    const dataset = [
      { date: new Date("2022-01-01"), value: 200 },
      { date: new Date("2022-02-01"), value: 250 },
      { date: new Date("2022-03-01"), value: 180 },
      { date: new Date("2022-04-01"), value: 300 },
      { date: new Date("2022-05-01"), value: 280 },
      { date: new Date("2022-06-01"), value: 220 },
      { date: new Date("2022-07-01"), value: 300 },
      { date: new Date("2022-08-01"), value: 450 },
      { date: new Date("2022-09-01"), value: 280 },
      { date: new Date("2022-10-01"), value: 600 },
      { date: new Date("2022-11-01"), value: 780 },
      { date: new Date("2022-12-01"), value: 320 }
    ];
    this.setState({data2: dataset})
  }

  handleDateChange = (newDateRange) => {
    this.setState({dateRange: newDateRange})
  }

  render() {
    const { data2, dateRange } = this.state
    const dates = data2.map(obj => obj.date)
    return (
      <div className="App">
        {/* <Slider
          data={data2}
          dateRange={dateRange}
          onChange={this.handleDateChange}
        />
        <PLine data={this.state.data2} /> */}
        <PScatter data={this.state.data} />
      </div>
    );
  } 
}

export default App;
