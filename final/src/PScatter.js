import { Component } from 'react';
import * as d3 from 'd3';

class PScatter extends Component {
    /*
    constructor(props) {
        super(props)
        //this.state = {data:[]}
    } */
/*
    componentDidMount() {
        var self = this;
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
            self.setState({data: csvData})
            console.log(csvData);
          }).catch(function(err){
            console.log(err);
          });
    }*/

    componentDidUpdate() {
        var data = this.props.data
        console.log("here")
        console.log(data)
        if (!data) {
            return;
        }

        var margin = {top:20, bottom:50, left:40, right:20};
        var w = 1000 - margin.left - margin.right;
        var h = 500 - margin.top - margin.bottom;

        var container = d3.select(".sc_svg")
            .attr("width",w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom)
            .select(".sc_g")
            .attr("transform", `translate(${margin.left},${margin.top})`)

        var x_data = data.map(obj => obj.total_bill)
        var x_scale = d3.scaleLinear().domain([0,d3.max(x_data)]).range([margin.left,w])
        container.selectAll("x_axis_g").data([0]).join("g").attr("class","x_axis_g")
          .attr("transform",`translate(0,${h})`).call(d3.axisBottom(x_scale))

        var y_data = data.map(obj => obj.tip);
        var y_scale = d3.scaleLinear().domain([0,d3.max(y_data)]).range([h, 0]);
        container.selectAll("y_axis_g").data([0]).join("g").attr("class", "y_axis_g")
          .attr("transform",`translate(${margin.left},0)`).call(d3.axisLeft(y_scale))

        container.selectAll("circle")
          .data(data)
          .join("circle")
          .attr("cx", d => x_scale(d.total_bill))
          .attr("cy", d => y_scale(d.tip))
          .attr("r", 3)
        
    }

    render() {
        return(
            <svg className="sc_svg" >
                <g className="sc_g" />
            </svg>
        )
    }
}

export default PScatter;