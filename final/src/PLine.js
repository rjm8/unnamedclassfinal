import { Component } from 'react';
import * as d3 from 'd3';

class PLine extends Component {
    componentDidUpdate() {
        var data = this.props.data
        if (!data) return;
        
        console.log(data)

        var margin = {left:20, right:20, top:20, bottom:20};
        var w = 1000 - margin.left - margin.right;
        var h = 500 - margin.top - margin.bottom;

        var container = d3.select(".l_svg")
            .attr("width", w+margin.left+margin.right)
            .attr("height", h+margin.top+margin.bottom)
            .select(".l_g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        var x_data = data.map(d => d.date);
        var x_scale = d3.scaleTime().domain(d3.extent(data, d => d.date)).range([margin.left,w]);
        container.selectAll(".x_axis_g")
            .data([0])
            .join("g")
            .attr("class", "x_axis_g")
            .attr("transform", `translate(0,${h})`)
            .call(d3.axisBottom(x_scale)
                .ticks(d3.timeMonth.every(1))
                .tickFormat(d3.timeFormat("%b %Y")));

        var y_data = data.map(d => d.value);
        var y_scale = d3.scaleLinear().domain([0, d3.max(data, d => d.value)]).range([h,0])
        container.selectAll(".y_axis_g")
            .data([0])
            .join("g")
            .attr("class", "y_axis_g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y_scale))
            

        var line = d3.line()
            .x(d => x_scale(d.date))
            .y(d => y_scale(d.value));
    

        container.select("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "grey")
            .attr("stroke-width", "2")
            .attr("d", line)
        
    }

    render() {
        return(
            <div>
                <svg className="l_svg">
                    <g className="l_g">
                        <path />
                    </g>
                </svg>
            </div>
        );
    }
}

export default PLine;