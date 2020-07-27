import React from "react";
import swal from "sweetalert";
import * as sortingAlgorithms from "../sortingAlgorithms/testScript.js";
import { getBubbleSortAnimations } from "../sortingAlgorithms/bubbleSort";
import { getMergeSortAnimations } from "../sortingAlgorithms/mergeSort";
import { getQuickSortAnimations } from "../sortingAlgorithms/quickSort";
import { getHeapSortAnimations } from "../sortingAlgorithms/heapSort";
import { getInsertionSortAnimations } from "../sortingAlgorithms/insertionSort";
import { Navbar, Nav } from "react-bootstrap";
import "./SortingVisualizer.css";
// This is the main color of the array bars.
const PRIMARY_COLOR = "pink";
// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "blue";
const SUDO_SORTED_COLOR = "#f72828";
const SORTED_COLOR = "#7CFC00";
const WIDTH = Math.floor((0.75 * window.innerWidth) / 11);
export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      isSorted: false,
      isRunning: false,
      value: WIDTH,
      width: WIDTH,
      animationSpeed: (WIDTH * 10) / WIDTH,
    };
  }

  componentDidMount() {
    swal("Welcome to Sorting Visualizer");
    this.resetArray(this.state.value);
  }

  reload() {
    this.resetArray(this.state.value);
  }
  resetArray(width) {
    console.log(width);
    this.setState({ value: width, animationSpeed: (WIDTH * 10) / width });
    const array = [];
    for (let i = 0; i < width; i++) {
      array.push(randomIntFromInterval(5, 0.85 * window.innerHeight));
    }

    this.setState({ array });
    this.setState({ isSorted: false });
    this.setState({ isRunning: false });
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < arrayBars.length; i++) {
      var ithBarStyle = arrayBars[i].style;
      ithBarStyle.backgroundColor = PRIMARY_COLOR;
    }
  }
  async bubbleSort() {
    if (this.state.isSorted) {
      swal("Already Sorted, Create a new Array");
      return;
    }
    swal("Lime Green denotes Sorted Position");
    await this.disableButtons();
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
        }, i * this.state.animationSpeed);
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
        }, i * this.state.animationSpeed);
      }
    }
    const RESTORE_TIME = parseInt(
      this.state.animationSpeed * animations.length + 500
    );
    setTimeout(() => {
      this.restoreButtons();
      swal("Array Sorted!", "Hope you liked it", "success");
      this.setState({ isSorted: !this.isSorted });
    }, RESTORE_TIME);
  }
  async heapSort() {
    if (this.state.isSorted) {
      swal("Already Sorted, Create a new Array");
      return;
    }
    swal("Lime Green denotes Sorted Position");
    await this.disableButtons();
    const [animations, sortedArray] = getHeapSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] === "comparison1" ||
        animations[i][0] === "comparison2";
      if (isColorChange) {
        const color =
          animations[i][0] === "comparison1" ? SECONDARY_COLOR : PRIMARY_COLOR;
        //eslint-disable-next-line
        const [temp, barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          if (barOneStyle.height !== `${sortedArray[barOneIdx]}px`) {
            barOneStyle.backgroundColor = color;
          } else {
            barOneStyle.backgroundColor = SORTED_COLOR;
          }
          if (barTwoStyle.height !== `${sortedArray[barTwoIdx]}px`) {
            barTwoStyle.backgroundColor = color;
          } else {
            barTwoStyle.backgroundColor = SORTED_COLOR;
          }
        }, i * this.state.animationSpeed);
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
        }, i * this.state.animationSpeed);
      }
    }
    const RESTORE_TIME = parseInt(
      this.state.animationSpeed * animations.length + 500
    );
    setTimeout(() => {
      this.restoreButtons();
      swal("Array Sorted!", "Hope you liked it", "success");
      this.setState({ isSorted: !this.isSorted });
    }, RESTORE_TIME);
  }

  async quickSort() {
    if (this.state.isSorted) {
      swal("Already Sorted, Create a new Array");
      return;
    }
    swal("Yellow Bar is the pivot");
    await this.disableButtons();
    const [animations, sortedArray] = getQuickSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
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
        }, i * this.state.animationSpeed);
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
        }, i * this.state.animationSpeed);
      }
    }
    const RESTORE_TIME = parseInt(
      this.state.animationSpeed * animations.length + 500
    );
    setTimeout(() => {
      this.restoreButtons();
      swal("Array Sorted!", "Hope you liked it (:", "success");
      this.setState({ isSorted: !this.isSorted });
    }, RESTORE_TIME);
  }
  async insertionSort() {
    if (this.state.isSorted) {
      swal("Already Sorted, Create a new Array");
      return;
    }
    swal("Blinking Red Bar denotes Sudo Sorted Position");
    await this.disableButtons();
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
        }, i * this.state.animationSpeed);
      } else {
        //eslint-disable-next-line
        const [temp, barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        setTimeout(() => {
          barOneStyle.height = `${newHeight}px`;
          barOneStyle.backgroundColor = PRIMARY_COLOR;
        }, i * this.state.animationSpeed);
      }
    }
    const RESTORE_TIME = parseInt(
      this.state.animationSpeed * animations.length + 500
    );
    setTimeout(() => {
      this.restoreButtons();
      swal("Array Sorted!", "Hope you liked it (:", "success");
      this.finishedSorting();
      this.setState({ isSorted: !this.isSorted });
    }, RESTORE_TIME);
  }
  async mergeSort() {
    if (this.state.isSorted) {
      swal("Already Sorted, Create a new Array");
      return;
    }
    swal("Lime Green denotes Sorted Position");
    await this.disableButtons();
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
        }, i * this.state.animationSpeed);
      } else {
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        setTimeout(() => {
          barOneStyle.height = `${newHeight}px`;
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          if (barOneStyle.height === `${sortedArray[barOneIdx]}px`) {
            setTimeout(() => {
              barOneStyle.backgroundColor = SORTED_COLOR;
            }, this.state.animationSpeed);
          } else {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
          }
        }, i * this.state.animationSpeed);
      }
    }
    const RESTORE_TIME = parseInt(
      this.state.animationSpeed * animations.length + 500
    );
    setTimeout(() => {
      this.restoreButtons();
      swal("Array Sorted!", "Hope you liked it (:", "success");
      this.setState({ isSorted: !this.state.isSorted });
    }, RESTORE_TIME);
  }

  finishedSorting() {
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < arrayBars.length; i++) {
      const ithBarStyle = arrayBars[i].style;
      ithBarStyle.backgroundColor = SORTED_COLOR;
    }
  }

  disableButtons() {
    this.setState({ isRunning: true });
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

  handleChange() {
    const value = document.getElementById("myRange").value;
    this.resetArray(value);
  }
  render() {
    const { array } = this.state;
    const length = this.state.array.length;
    const numWidth = length < 120 ? 30 : 10;
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="index.html">Sorting Visualizer</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <button
                type="button"
                className="btn btn-outline-warning mr-2"
                id="generateArray"
                onClick={() => this.reload()}
              >
                Generate New Array
              </button>
              <button
                type="button"
                className="btn btn-outline-danger mr-2"
                onClick={() => this.testSortingAlgorithm()}
              >
                Test Algorithms
              </button>
            </Nav>
            <Nav className="ml-auto mr-auto">
              <div className="slidercontainer">
                <p style={{ marginTop: 2 }}>
                  Change Array size & Sorting speed
                </p>
                <input
                  type="range"
                  id="myRange"
                  className="slider"
                  defaultValue={this.state.width}
                  disabled={this.state.isRunning ? true : false}
                  min={10}
                  max={this.state.width}
                  style={{
                    marginTop: 2,
                    marginBottom: 10,
                  }}
                  onChange={() => {
                    this.handleChange();
                  }}
                />
              </div>
            </Nav>
            <Nav className="ml-auto">
              <button
                type="button"
                className="btn btn-outline-success mr-2"
                id="mergeSort"
                onClick={() => this.mergeSort()}
              >
                Merge Sort
              </button>
              <button
                type="button"
                className="btn btn-outline-success mr-2"
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
                className="btn btn-outline-success mr-2"
                onClick={() => {
                  this.heapSort();
                }}
              >
                Heap Sort
              </button>

              <button
                type="button"
                id="insertionSort"
                className="btn btn-outline-success mr-2"
                onClick={() => {
                  this.insertionSort();
                }}
              >
                Insertion Sort
              </button>

              <button
                type="button"
                id="bubbleSort"
                className="btn btn-outline-success mr-2"
                onClick={() => {
                  this.bubbleSort();
                }}
              >
                Bubble Sort
              </button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
                width: `${numWidth}px`,
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
