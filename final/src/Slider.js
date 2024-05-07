import { Component } from 'react'
import { Range, getTrackBackground } from 'react-range'

const STEP = 0.1;
const MIN = 0;
const MAX = 100;

class Slider extends Component {
    constructor(props){
        super(props)
        this.state = {data: [], dateRange: [new Date("2022-01-01"), new Date("2022-12-01")], values: [50]}
    }
    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            const dates = this.props.data.map(d => d.date)
            const dr = [new Date(Math.min(...dates)), new Date(Math.max(...dates))]
            this.setState({data: this.props.data, dateRange: dr})   
        }
    }

    render() {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              margin: "2em"
            }}
          >
            <Range
              values={this.state.values}
              step={STEP}
              min={MIN}
              max={MAX}
              onChange={(values) => this.setState({ values })}
              renderTrack={({ props, children }) => (
                <div
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{
                    ...props.style,
                    height: "36px",
                    display: "flex",
                    width: "100%"
                  }}
                >
                  <div
                    ref={props.ref}
                    style={{
                      height: "5px",
                      width: "100%",
                      borderRadius: "4px",
                      background: getTrackBackground({
                        values: this.state.values,
                        colors: ["#548BF4", "#ccc"],
                        min: MIN,
                        max: MAX
                      }),
                      alignSelf: "center"
                    }}
                  >
                    {children}
                  </div>
                </div>
              )}
              renderThumb={({ props, isDragged }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "42px",
                    width: "42px",
                    borderRadius: "4px",
                    backgroundColor: "#FFF",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0px 2px 6px #AAA"
                  }}
                >
                  <div
                    style={{
                      height: "16px",
                      width: "5px",
                      backgroundColor: isDragged ? "#548BF4" : "#CCC"
                    }}
                  />
                </div>
              )}
            />
            <output style={{ marginTop: "30px" }} id="output">
              {this.state.values[0].toFixed(1)}
            </output>
          </div>
        );
      }
}

export default Slider