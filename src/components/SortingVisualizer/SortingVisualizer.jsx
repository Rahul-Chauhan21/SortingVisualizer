import React from "react";
import swal from "sweetalert";
import Array from "./Array";
import NavBar from "./NavBar";
import * as sortingAlgorithms from "../../utils/sortingAlgorithms/testScript.js";
import { getBubbleSortAnimations } from "../../utils/sortingAlgorithms/bubbleSort";
import { getMergeSortAnimations } from "../../utils/sortingAlgorithms/mergeSort";
import { getQuickSortAnimations } from "../../utils/sortingAlgorithms/quickSort";
import { getHeapSortAnimations } from "../../utils/sortingAlgorithms/heapSort";
import { getInsertionSortAnimations } from "../../utils/sortingAlgorithms/insertionSort";
import { randomIntFromInterval } from "../../utils/helperFunctions/randomIntFromInterval";
import { arraysAreEqual } from "../../utils/helperFunctions/arraysAreEqual";
import "./SortingVisualizer.css";
// This is the main color of the array bars.
const PRIMARY_COLOR = "pink";
// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "#5e64ff";
const SWAP_COLOR = "red";
const PIVOT_COLOR = "yellow";
const WIDTH = Math.floor((0.75 * window.innerWidth) / 10);
export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      color: [],
      value: WIDTH,
      width: WIDTH,
      isSorting: false,
      sorted: false,
      algorithm: "",
      animationSpeed: (WIDTH * 50) / WIDTH,
    };
  }
  // Creates a random array when app is loaded
  componentDidMount() {
    swal("Welcome to Sorting Visualizer");
    this.resetArray(this.state.value);
  }

  // generates a new array and enables the slider range
  resetArray = (width) => {
    this.resetColors();
    this.setState({
      value: width,
      animationSpeed: Math.floor((WIDTH * 50) / width),
      sorted: false,
    });
    const array = [];
    for (let i = 0; i < width; i++) {
      array.push(randomIntFromInterval(15, 0.85 * window.innerHeight));
    }
    const color = array.map((number) => PRIMARY_COLOR);
    this.setState({ array: array, color: color });
  };
  // updates the state algorithm
  changeAlgorithm = (chosen) => {
    if (this.state.isSorting) {
      return;
    }
    this.setState({ algorithm: chosen });
  };

  startSort = () => {
    if (this.state.sorted) {
      swal("Already Sorted! Create a new Array");
      return;
    }
    if (this.state.isSorting) {
      return;
    }
    const chosenAlgorithm = this.state.algorithm;
    let arrayBars = document.getElementsByClassName("array-bar");
    var array = this.state.array.slice();
    if (chosenAlgorithm.length > 0) {
      document.getElementById("startBtn").disabled = false;
      if (chosenAlgorithm === "mergeSort") {
        let animations = getMergeSortAnimations(array);
        this.mergeSort(animations, arrayBars);
      } else if (chosenAlgorithm === "quickSort") {
        let animations = getQuickSortAnimations(array);
        this.quickSort(animations, arrayBars);
      } else if (chosenAlgorithm === "heapSort") {
        let animations = getHeapSortAnimations(array);
        this.heapSort(animations, arrayBars);
      } else if (chosenAlgorithm === "insertionSort") {
        let animations = getInsertionSortAnimations(array);
        this.insertionSort(animations, arrayBars);
      } else if (chosenAlgorithm === "bubbleSort") {
        let animations = getBubbleSortAnimations(array);
        this.bubbleSort(animations, arrayBars);
      }
    }
  };

  resetColors = () => {
    let arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].className = "array-bar";
    }
    var current_color = this.state.color.slice();
    this.setState({ color: current_color.map((c) => PRIMARY_COLOR) });
  };
  changeColor(idxArray, color) {
    let currentColor = this.state.color.slice();
    idxArray.forEach(function (idx, c = 0) {
      currentColor[idx] = color[c++];
    });
    this.setState({ color: currentColor });
  }
  finishedSorting() {
    let arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].className = "array-bar bar-animation";
    }
  }
  swapBars(indexOne, indexTwo) {
    const auxiliaryArray = this.state.array.slice();
    const temp = auxiliaryArray[indexOne];
    auxiliaryArray[indexOne] = auxiliaryArray[indexTwo];
    auxiliaryArray[indexTwo] = temp;
    this.setState({ array: auxiliaryArray });
  }

  overwriteBar(indexOne, newHeight) {
    const auxiliaryArray = this.state.array.slice();
    auxiliaryArray[indexOne] = newHeight;
    this.setState({ array: auxiliaryArray });
  }
  handleStop = () => {
    const highestTimeoutId = setTimeout(";");
    for (let i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
    }
    this.setState({ isSorting: false });
  };
  testSortingAlgorithm = () => {
    if (this.state.algorithm === "") {
      swal("Select an Algorithm");
      return;
    }
    swal("Open Console");
    let chosenAlgorithm = this.state.algorithm;
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      let sortedArray = {};
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      if (chosenAlgorithm.length > 0) {
        if (chosenAlgorithm === "mergeSort") {
          sortedArray = sortingAlgorithms.mergeSort(array);
        } else if (chosenAlgorithm === "quickSort") {
          sortedArray = sortingAlgorithms.mergeSort(array);
        } else if (chosenAlgorithm === "heapSort") {
          sortedArray = sortingAlgorithms.mergeSort(array);
        } else if (chosenAlgorithm === "insertionSort") {
          sortedArray = sortingAlgorithms.mergeSort(array);
        } else if (chosenAlgorithm === "bubbleSort") {
          sortedArray = sortingAlgorithms.mergeSort(array);
        }
      }
      console.log(
        `Is ${chosenAlgorithm} the working ? ` +
          arraysAreEqual(javaScriptSortedArray, sortedArray)
      );
    }
  };

  // Animations array: [state, i , i + 1]
  bubbleSort = (animations, arrayBars) => {
    this.setState({ isSorting: true });
    this.resetColors();
    for (let i = 0; i < animations.length; i++) {
      const [state, barOneIdx, barTwoIdx] = animations[i];
      // Change color depending on the state from animations[i]
      setTimeout(() => {
        this.changeColor(
          [barOneIdx, barTwoIdx],
          state === "comparing"
            ? [SECONDARY_COLOR, SECONDARY_COLOR]
            : [SWAP_COLOR, SWAP_COLOR]
        );
      }, i * this.state.animationSpeed);
      if (state === "swapping") {
        setTimeout(() => {
          this.swapBars(barOneIdx, barTwoIdx);
        }, (i + 1 / 3) * this.state.animationSpeed);
      }
      // Revert back to original color.
      setTimeout(() => {
        this.changeColor(
          [barOneIdx, barTwoIdx],
          [PRIMARY_COLOR, PRIMARY_COLOR]
        );
      }, (i + 2 / 3) * this.state.animationSpeed);
    }
    const RESTORE_TIME = parseInt(
      this.state.animationSpeed * animations.length + 500
    );
    // turn all bars green and restore buttons
    setTimeout(() => {
      this.setState({ isSorting: false, sorted: true });
      this.finishedSorting();
    }, RESTORE_TIME);
  };
  // Animations array: [state, barOne, barTwo]
  heapSort = (animations, arrayBars) => {
    this.resetColors();
    this.setState({ isSorting: true });
    for (let i = 0; i < animations.length; i++) {
      const [state, barOneIdx, barTwoIdx] = animations[i];
      // Change color depending on the state from animations[i]
      setTimeout(() => {
        this.changeColor(
          [barOneIdx, barTwoIdx],
          state === "comparing"
            ? [SECONDARY_COLOR, SECONDARY_COLOR]
            : [SWAP_COLOR, SWAP_COLOR]
        );
      }, i * this.state.animationSpeed);
      if (state === "swapping") {
        setTimeout(() => {
          this.swapBars(barOneIdx, barTwoIdx);
        }, (i + 1 / 3) * this.state.animationSpeed);
      }
      // Revert back to original color.
      setTimeout(() => {
        this.changeColor(
          [barOneIdx, barTwoIdx],
          [PRIMARY_COLOR, PRIMARY_COLOR]
        );
      }, (i + 2 / 3) * this.state.animationSpeed);
    }
    const RESTORE_TIME = parseInt(
      this.state.animationSpeed * animations.length + 500
    );
    //Turn all bars green.
    setTimeout(() => {
      this.setState({ isSorting: false, sorted: true });
      this.finishedSorting();
    }, RESTORE_TIME);
  };
  // Animations array: [state, barOne, barTwo, pivotIdx]
  quickSort = (animations, arrayBars) => {
    this.resetColors();
    this.setState({ isSorting: true });
    let lastPivotIdx = -1;
    for (let i = 0; i < animations.length; i++) {
      const [state, barOneIdx, barTwoIdx, pivotIdx] = animations[i];
      if (/*eslint-disable-next-line*/ pivotIdx !== lastPivotIdx) {
        setTimeout(() => {
          this.changeColor(
            [lastPivotIdx, pivotIdx],
            [PRIMARY_COLOR, PIVOT_COLOR]
          );
        }, i * this.state.animationSpeed);
      }
      setTimeout(() => {
        this.changeColor(
          [barOneIdx, barTwoIdx, pivotIdx],
          state === "comparing"
            ? [SECONDARY_COLOR, SECONDARY_COLOR, PIVOT_COLOR]
            : [SWAP_COLOR, SWAP_COLOR, PIVOT_COLOR]
        );
      }, i * this.state.animationSpeed);
      if (state === "swapping") {
        setTimeout(() => {
          if (barOneIdx === pivotIdx) {
            if (arrayBars[barTwoIdx] !== arrayBars[pivotIdx])
              this.changeColor([pivotIdx], [SWAP_COLOR]);
          }
          this.swapBars(barOneIdx, barTwoIdx);
        }, (i + 1 / 3) * this.state.animationSpeed);
      }
      setTimeout(() => {
        this.changeColor(
          [barOneIdx, barTwoIdx],
          [PRIMARY_COLOR, PRIMARY_COLOR]
        );
      }, (i + 2 / 3) * this.state.animationSpeed);
      // eslint-disable-next-line;
      lastPivotIdx = pivotIdx;
    }
    const RESTORE_TIME = parseInt(
      this.state.animationSpeed * animations.length + 500
    );
    setTimeout(() => {
      this.setState({ isSorting: false, sorted: true });
      this.finishedSorting();
    }, RESTORE_TIME);
  };
  //Animations array: [state, j, j -1]
  insertionSort(animations, arrayBars) {
    this.resetColors();
    this.setState({ isSorting: true });
    for (let i = 0; i < animations.length; i++) {
      const [state, barOneIdx, barTwoIdx] = animations[i];
      // Change color depending on the state from animations[i]
      setTimeout(() => {
        this.changeColor(
          [barOneIdx, barTwoIdx],
          state === "comparing"
            ? [SECONDARY_COLOR, SECONDARY_COLOR]
            : [SWAP_COLOR, SWAP_COLOR]
        );
      }, i * this.state.animationSpeed);
      if (state === "swapping") {
        setTimeout(() => {
          this.swapBars(barOneIdx, barTwoIdx);
        }, (i + 1 / 3) * this.state.animationSpeed);
      }
      // Revert back to original color.
      setTimeout(() => {
        this.changeColor(
          [barOneIdx, barTwoIdx],
          [PRIMARY_COLOR, PRIMARY_COLOR]
        );
      }, (i + 2 / 3) * this.state.animationSpeed);
    }
    const RESTORE_TIME = parseInt(
      this.state.animationSpeed * animations.length + 500
    );
    setTimeout(() => {
      this.setState({ isSorting: false, sorted: true });
      this.finishedSorting();
    }, RESTORE_TIME);
  }
  //Animations array: if state = "comparing" [state, k index, index i/j, null]
  //                             "swapping" [state, i index, j index, height]
  mergeSort = (animations, arrayBars) => {
    this.setState({ isSorting: true });
    this.resetColors();
    for (let i = 0; i < animations.length; i++) {
      const [state, barOneIdx, barTwoIdx, newHeight] = animations[i];
      setTimeout(() => {
        this.changeColor(
          [barOneIdx, barTwoIdx],
          state === "comparing"
            ? [SECONDARY_COLOR, SECONDARY_COLOR]
            : [PRIMARY_COLOR, PRIMARY_COLOR]
        );
      }, i * this.state.animationSpeed);
      if (state === "overwriting") {
        setTimeout(() => {
          this.changeColor([barOneIdx], [SWAP_COLOR]);
          this.overwriteBar(barOneIdx, newHeight);
        }, (i + 1 / 3) * this.state.animationSpeed);
      }
      // Revert back to original color.
      setTimeout(() => {
        this.changeColor(
          [barOneIdx, barTwoIdx],
          [PRIMARY_COLOR, PRIMARY_COLOR]
        );
      }, (i + 2 / 3) * this.state.animationSpeed);
    }
    const RESTORE_TIME = parseInt(
      this.state.animationSpeed * animations.length + 500
    );
    setTimeout(() => {
      this.setState({ isSorting: false, sorted: true });
      this.finishedSorting();
    }, RESTORE_TIME);
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          value={this.state.value}
          width={this.state.width}
          resetArray={this.resetArray}
          selectAlgorithm={this.changeAlgorithm}
          onStart={this.startSort}
          algorithm={this.state.algorithm}
          testSortingAlgorithm={this.testSortingAlgorithm}
          isSorting={this.state.isSorting}
          handleStop={this.handleStop}
        />
        <Array randomArray={this.state.array} color={this.state.color} />
      </React.Fragment>
    );
  }
}
