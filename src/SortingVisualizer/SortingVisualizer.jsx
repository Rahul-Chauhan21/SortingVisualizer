import React from "react";
import * as sortingAlgorithms from "../sortingAlgorithms/testScript.js";
import { getBubbleSortAnimations } from "../sortingAlgorithms/bubbleSort";
import { getMergeSortAnimations } from "../sortingAlgorithms/mergeSort";
import "./SortingVisualizer.css";
import "bootstrap/dist/css/bootstrap.min.css";
const ANIMATION_SPEED_MS = 1;

// This is the main color of the array bars.
const PRIMARY_COLOR = "pink";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "purple";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < 135; i++) {
      array.push(randomIntFromInterval(5, 830));
    }

    this.setState({ array });
  }
  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    console.log(animations);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 4 !== 3 && i % 4 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 4 == 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          if (i % 4 == 3) {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          } else {
            const [barTwoIdx, newHeight] = animations[i];
            const barTwoStyle = arrayBars[barTwoIdx].style;
            barTwoStyle.height = `${newHeight}px`;
          }
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  testSortingAlgorithm() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const sortedArray = sortingAlgorithms.mergeSort(array);
      console.log(
        "Is Merge Sort working ? " +
          arraysAreEqual(javaScriptSortedArray, sortedArray)
      );
    }
  }

  render() {
    const { array } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="index.html">
            Sorting Visualizer
          </a>
          <div className="navbar-nav">
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => this.resetArray()}
              >
                Generate New Array
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => this.testSortingAlgorithm()}
              >
                Test Algorithms
              </button>
            </div>
            <div
              className="btn-group"
              role="group"
              style={{ right: "10px", position: "absolute" }}
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  this.mergeSort();
                }}
              >
                Merge Sort
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  this.quickSort();
                }}
              >
                Quick Sort
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  this.heapSort();
                }}
              >
                Heap Sort
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  this.bubbleSort();
                }}
              >
                Bubble Sort
              </button>
            </div>
          </div>
        </nav>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: "pink",
                height: `${value}px`,
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
