import React from "react";
import Bar from "./Bar";
import "./SortingVisualizer.css";
const MAX_SIZE_DISPLAY_NUM = 30;
class Array extends React.Component {
  render() {
    return (
      <div className="array-container">
        {this.props.randomArray.map((number, idx) => (
          <Bar
            key={idx}
            height={number}
            value={
              this.props.randomArray.length <= MAX_SIZE_DISPLAY_NUM
                ? number
                : ""
            }
          />
        ))}
      </div>
    );
  }
}
export default Array;
