import { Component } from 'react'
import { Range } from 'react-range'

class Slider extends Component {
    constructor(props){
        super(props)
        this.state = {data: [], dateRange: [new Date("2022-01-01"), new Date("2022-12-01")]}
    }
    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            const dates = this.props.data.map(d => d.date)
            const dr = [new Date(Math.min(...dates)), new Date(Math.max(...dates))]
            this.setState({data: this.props.data, dateRange: dr})   
        }
    }

    render() {
        const { data, dateRange } = this.state;
        const dates = data.map(d => d.date)
        return(
            <Range
                step={1}
                min={new Date(Math.min(...dates))}
                max={new Date(Math.max(...dates))}
                values={dateRange.map(d=>d.getTime())}
                onChange={this.props.onChange}
                renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: '6px',
                        width: '100%',
                        backgroundColor: '#ccc'
                      }}
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: '20px',
                        width: '20px',
                        borderRadius: '50%',
                        backgroundColor: '#007bff',
                        boxShadow: '0 2px 2px rgba(0,0,0,0.2)',
                      }}
                    />
                  )}
            />
        )
    }
}

export default Slider