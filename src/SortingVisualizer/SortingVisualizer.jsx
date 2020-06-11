import React from "react";
import swal from "sweetalert";
import * as sortingAlgorithms from "../sortingAlgorithms/testScript.js";
import { getBubbleSortAnimations } from "../sortingAlgorithms/bubbleSort";
import { getMergeSortAnimations } from "../sortingAlgorithms/mergeSort";
import { getQuickSortAnimations } from "../sortingAlgorithms/quickSort";
import { getHeapSortAnimations } from "../sortingAlgorithms/heapSort";
import { getInsertionSortAnimations } from "../sortingAlgorithms/insertionSort";
import "./SortingVisualizer.css";
import "bootstrap/dist/css/bootstrap.min.css";
const ANIMATION_SPEED_MS = 10;

// This is the main color of the array bars.
const PRIMARY_COLOR = "pink";
// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "blue";
const SUDO_SORTED_COLOR = "red";
const SORTED_COLOR = "#7CFC00";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      isSorted: false,
    };
  }

  componentDidMount() {
    swal("Welcome to Sorting Visualizer");
    this.resetArray();
  }

  reload() {
    this.resetArray();
  }
  resetArray() {
    const array = [];
    for (let i = 0; i < 135; i++) {
      array.push(randomIntFromInterval(5, 830));
    }

    this.setState({ array });
    this.setState({ isSorted: false });
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < arrayBars.length; i++) {
      var ithBarStyle = arrayBars[i].style;
      ithBarStyle.backgroundColor = PRIMARY_COLOR;
    }
  }
  bubbleSort() {
    if (this.state.isSorted) {
      swal("Already Sorted, Create a new Array");
      return;
    }
    swal("Lime Green denotes Sorted Position");
    this.disableButtons();
    const [animations, sortedArray] = getBubbleSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 4 !== 3 && i % 4 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 5);
      } else {
        setTimeout(() => {
          if (i % 4 === 3) {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
            if (barOneStyle.height === `${sortedArray[barOneIdx]}px`) {
              barOneStyle.backgroundColor = SORTED_COLOR;
            }
          } else {
            const [barTwoIdx, newHeight] = animations[i];
            const barTwoStyle = arrayBars[barTwoIdx].style;
            barTwoStyle.height = `${newHeight}px`;
            if (barTwoStyle.height === `${sortedArray[barTwoIdx]}px`) {
              barTwoStyle.backgroundColor = SORTED_COLOR;
            }
          }
        }, i * 5);
      }
    }
    const RESTORE_TIME = parseInt(5 * animations.length + 500);
    setTimeout(() => this.restoreButtons(), RESTORE_TIME);
    setTimeout(
      () => swal("Array Sorted!", "Hope you liked it (:", "success"),
      RESTORE_TIME
    );
    setTimeout(() => {
      this.setState({ isSorted: !this.isSorted });
    }, RESTORE_TIME);
  }
  heapSort() {
    if (this.state.isSorted) {
      swal("Already Sorted, Create a new Array");
      return;
    }
    swal("Lime Green denotes Sorted Position");
    this.disableButtons();
    const [animations, sortedArray] = getHeapSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      setTimeout(() => {
        const tempBarHeight = barOneStyle.height;
        barOneStyle.height = barTwoStyle.height;
        barTwoStyle.height = tempBarHeight;
        if (barOneStyle.height === `${sortedArray[barOneIdx]}px`) {
          barOneStyle.backgroundColor = SORTED_COLOR;
        } else {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
        }
        if (barTwoStyle.height === `${sortedArray[barTwoIdx]}px`) {
          barTwoStyle.backgroundColor = SORTED_COLOR;
        } else {
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }
      }, i * ANIMATION_SPEED_MS);
    }
    const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS * animations.length + 500);
    setTimeout(() => this.restoreButtons(), RESTORE_TIME);
    setTimeout(
      () => swal("Array Sorted!", "Hope you liked it", "success"),
      RESTORE_TIME
    );
    setTimeout(() => {
      this.setState({ isSorted: !this.isSorted });
    }, RESTORE_TIME);
  }

  quickSort() {
    if (this.state.isSorted) {
      swal("Already Sorted, Create a new Array");
      return;
    }
    swal("Lime Green Denotes Sorted Position and Yellow Bar is the pivot");
    const [animations, sortedArray] = getQuickSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    this.disableButtons();
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] === "comparison1" ||
        animations[i][0] === "comparison2";
      if (isColorChange) {
        const color =
          animations[i][0] === "comparison1" ? SECONDARY_COLOR : PRIMARY_COLOR;
        //eslint-disable-next-line
        const [temp, barOneIdx, barTwoIdx, pivotIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          if (barOneStyle.height !== `${sortedArray[barOneIdx]}px`) {
            barOneStyle.backgroundColor = color;
          } else {
            barOneStyle.backgroundColor = SORTED_COLOR;
          }
          if (barTwoIdx === pivotIdx) {
            if (barTwoStyle.height !== `${sortedArray[barTwoIdx]}px`) {
              barTwoStyle.backgroundColor = "yellow";
            } else {
              barTwoStyle.backgroundColor = SORTED_COLOR;
            }
          } else {
            barTwoStyle.backgroundColor = color;
          }
        }, i * ANIMATION_SPEED_MS);
      } else {
        //eslint-disable-next-line
        const [temp, barOneIdx, newHeight, pivotIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        setTimeout(() => {
          barOneStyle.height = `${newHeight}px`;
          if (barOneStyle.height === `${sortedArray[barOneIdx]}px`) {
            barOneStyle.backgroundColor = SORTED_COLOR;
          } else {
            if (barOneIdx === pivotIdx) {
              barOneStyle.backgroundColor = "yellow";
            } else {
              barOneStyle.backgroundColor = PRIMARY_COLOR;
            }
          }
        }, i * ANIMATION_SPEED_MS);
      }
    }
    const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS * animations.length + 500);
    setTimeout(() => this.restoreButtons(), RESTORE_TIME);
    setTimeout(
      () => swal("Array Sorted!", "Hope you liked it (:", "success"),
      RESTORE_TIME
    );
    setTimeout(() => {
      this.setState({ isSorted: !this.isSorted });
    }, RESTORE_TIME);
  }
  insertionSort() {
    if (this.state.isSorted) {
      swal("Already Sorted, Create a new Array");
      return;
    }
    swal(
      "Blinking Red Bar denotes Sudo Sorted Position and Lime Green denotes Sorted Position"
    );
    this.disableButtons();
    const [animations, sortedArray] = getInsertionSortAnimations(
      this.state.array
    );
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] === "comparison1" ||
        animations[i][0] === "comparison2";
      if (isColorChange === true) {
        const color =
          animations[i][0] === "comparison1" ? SECONDARY_COLOR : PRIMARY_COLOR;
        //eslint-disable-next-line
        const [temp, barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          if (barOneStyle.height !== `${sortedArray[barOneIdx]}px`)
            barOneStyle.backgroundColor = color;
          else {
            barOneStyle.backgroundColor = SUDO_SORTED_COLOR;
          }
          if (barTwoStyle.height !== `${sortedArray[barTwoIdx]}px`)
            barTwoStyle.backgroundColor = color;
          else {
            barTwoStyle.backgroundColor = SUDO_SORTED_COLOR;
          }
        }, i * 5);
      } else {
        //eslint-disable-next-line
        const [temp, barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        setTimeout(() => {
          barOneStyle.height = `${newHeight}px`;
          if (barOneStyle.height === `${sortedArray[barOneIdx]}px`) {
            barOneStyle.backgroundColor = SORTED_COLOR;
          } else {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
          }
        }, i * 5);
      }
    }
    const RESTORE_TIME = parseInt(5 * animations.length + 500);
    setTimeout(() => this.restoreButtons(), RESTORE_TIME);
    setTimeout(
      () => swal("Array Sorted!", "Hope you liked it (:", "success"),
      RESTORE_TIME
    );
    setTimeout(() => {
      this.setState({ isSorted: !this.isSorted });
    }, RESTORE_TIME);
  }
  mergeSort() {
    if (this.state.isSorted) {
      swal("Already Sorted, Create a new Array");
      return;
    }
    swal("Lime Green denotes Sorted Position");
    this.disableButtons();
    const [animations, sortedArray] = getMergeSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          if (barOneStyle.height !== `${sortedArray[barOneIdx]}px`)
            barOneStyle.backgroundColor = color;
          if (barTwoStyle.height !== `${sortedArray[barTwoIdx]}px`)
            barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        setTimeout(() => {
          barOneStyle.height = `${newHeight}px`;
          if (barOneStyle.height === `${sortedArray[barOneIdx]}px`) {
            barOneStyle.backgroundColor = SORTED_COLOR;
          } else {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
          }
        }, i * ANIMATION_SPEED_MS);
      }
    }
    const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS * animations.length + 500);
    setTimeout(() => this.restoreButtons(), RESTORE_TIME);
    setTimeout(
      () => swal("Array Sorted!", "Hope you liked it (:", "success"),
      RESTORE_TIME
    );
    setTimeout(() => {
      this.setState({ isSorted: !this.isSorted });
    }, RESTORE_TIME);
  }

  disableButtons() {
    document.getElementById("generateArray").disabled = true;
    document.getElementById("mergeSort").disabled = true;
    document.getElementById("quickSort").disabled = true;
    document.getElementById("heapSort").disabled = true;
    document.getElementById("insertionSort").disabled = true;
    document.getElementById("bubbleSort").disabled = true;
  }

  restoreButtons() {
    document.getElementById("generateArray").disabled = false;
    document.getElementById("mergeSort").disabled = false;
    document.getElementById("quickSort").disabled = false;
    document.getElementById("heapSort").disabled = false;
    document.getElementById("insertionSort").disabled = false;
    document.getElementById("bubbleSort").disabled = false;
  }

  makeAllBarsGreen() {
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < arrayBars.length; i++) {
      setTimeout(() => {
        const ithBarStyle = arrayBars[i].style;
        ithBarStyle.backgroundColor = SORTED_COLOR;
      }, i * ANIMATION_SPEED_MS * 2);
    }
  }

  testSortingAlgorithm() {
    swal("Currently Working on Merge Sort, Open Console");
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const sortedArray = sortingAlgorithms.mergeSort(array);
      console.log(
        "Is the SortingAlgo working ? " +
          arraysAreEqual(javaScriptSortedArray, sortedArray)
      );
    }
  }

  render() {
    const { array } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <a className="navbar-brand " href="index.html">
            Sorting Visualizer
          </a>
          <div className="navbar-nav">
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-warning"
                id="generateArray"
                onClick={() => this.reload()}
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
                id="mergeSort"
                onClick={() => {
                  this.mergeSort();
                }}
              >
                Merge Sort
              </button>
              <button
                type="button"
                className="btn btn-primary"
                id="quickSort"
                onClick={() => {
                  this.quickSort();
                }}
              >
                Quick Sort
              </button>
              <button
                type="button"
                id="heapSort"
                className="btn btn-primary"
                onClick={() => {
                  this.heapSort();
                }}
              >
                Heap Sort
              </button>
              <button
                type="button"
                id="insertionSort"
                className="btn btn-primary"
                onClick={() => {
                  this.insertionSort();
                }}
              >
                Insertion Sort
              </button>
              <button
                type="button"
                id="bubbleSort"
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
                backgroundColor: PRIMARY_COLOR,
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
