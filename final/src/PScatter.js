import { Component } from 'react';
import * as d3 from 'd3';
import Dropdown from 'react-bootstrap/Dropdown';
import './App.css'

class PScatter extends Component {
    constructor(props){
        super(props)
        this.state = {selectedCategory: "A"}
    }

    componentDidUpdate() {
        var data = this.props.data
        //console.log("here")
        //console.log(data)
        if (!data) {
            return;
        }

        var filteredData = []

        for (const obj of data) {
            if (obj.category === this.state.selectedCategory) {
                filteredData.push(obj)
            }
        }
        

        var margin = {top:20, bottom:50, left:40, right:20};
        var w = 1000 - margin.left - margin.right;
        var h = 500 - margin.top - margin.bottom;

        var container = d3.select(".sc_svg")
            .attr("width",w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom)
            .select(".sc_g")
            .attr("transform", `translate(${margin.left},${margin.top})`)


        var x_data = filteredData.map(obj => obj.x)
        var x_scale = d3.scaleLinear().domain([0,d3.max(x_data)]).range([margin.left,w])
        container.selectAll(".x_axis_g").data([0]).join("g").attr("class","x_axis_g")
          .attr("transform",`translate(0,${h})`).call(d3.axisBottom(x_scale))

        container.selectAll(".x_title")
            .data([0])
            .join("text")
            .attr("class", "x_title")
            .attr("x", (w - margin.left - margin.right) / 2)
            .attr("y", h+50)
            .text("X")

        var y_data = filteredData.map(obj => obj.y);
        var y_scale = d3.scaleLinear().domain([0,d3.max(y_data)]).range([h, 0]);
        container.selectAll(".y_axis_g").data([0]).join("g").attr("class", "y_axis_g")
          .attr("transform",`translate(${margin.left},0)`).call(d3.axisLeft(y_scale))

        container.selectAll(".y_title")
            .data([0])
            .join("text")
            .attr("class", "y_title")
            .attr("x",0)
            .attr("y", h/2)
            .text("Y")

        var tooltip = d3.select("body")
            .selectAll(".tooltip_div")
            .data([0])
            .join("div")
            .attr("class", "tooltip_div")
            .style("position", "absolute")
            .style("visibility", "invisible")

        container.selectAll("circle")
          .data(filteredData)
          .join("circle")
          .attr("cx", d => x_scale(d.x))
          .attr("cy", d => y_scale(d.y))
          .attr("r", 3)
          .on("mouseover", (event, d) => {
            tooltip.html("x: " + d.x + "<br>" + "y:" + d.y);
            tooltip.style("visibility", "visible");
          })
          .on("mousemove", (event) => {
            tooltip
                .style("top", event.pageY - 10 + "px")
                .style("left", event.pageX + 10 + "px")
          })
          .on("mouseout", () => {tooltip.style("visibility", "hidden")})
          
        
    }

    render() {
        return(
            <div>
                <div className='dropdown' >
                    <Dropdown title={this.state.selectedCategory} onSelect={(eventKey) => this.setState({selectedCategory: eventKey})}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {this.state.selectedCategory}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item key={"A"} eventKey={"A"}>A</Dropdown.Item>
                            <Dropdown.Item key={"B"} eventKey={"B"}>B</Dropdown.Item>
                            <Dropdown.Item key={"C"} eventKey={"C"}>C</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <svg className="sc_svg" >
                    <g className="sc_g" />
                </svg>
            </div>
        )
    }
}

export default PScatter;