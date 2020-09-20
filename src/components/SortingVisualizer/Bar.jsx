import React from "react";
import "./SortingVisualizer.css";
class Bar extends React.Component {
  render() {
    const style = {
      height: this.props.height.toString() + "px",
      backgroundColor: this.props.color,
    };
    return (
      <div key={this.props.value} className="array-bar" style={style}>
        {this.props.value}
      </div>
    );
  }
}

export default Bar;
