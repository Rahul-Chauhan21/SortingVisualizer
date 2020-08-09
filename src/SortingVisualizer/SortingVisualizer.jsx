import React from "react";
import swal from "sweetalert";
import Array from "./Array";
import NavBar from "./NavBar";
import * as sortingAlgorithms from "../sortingAlgorithms/testScript.js";
import { getBubbleSortAnimations } from "../sortingAlgorithms/bubbleSort";
import { getMergeSortAnimations } from "../sortingAlgorithms/mergeSort";
import { getQuickSortAnimations } from "../sortingAlgorithms/quickSort";
import { getHeapSortAnimations } from "../sortingAlgorithms/heapSort";
import { getInsertionSortAnimations } from "../sortingAlgorithms/insertionSort";
import "./SortingVisualizer.css";
// This is the main color of the array bars.
const PRIMARY_COLOR = "pink";
// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "#5e64ff";
const WIDTH = Math.floor((0.75 * window.innerWidth) / 10);
export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      value: WIDTH,
      width: WIDTH,
      isSorting: false,
      sorted: false,
      algorithm: "",
      animationSpeed: (WIDTH * 15) / WIDTH,
    };
  }
  // Creates a random array when app is loaded
  componentDidMount() {
    swal("Welcome to Sorting Visualizer");
    this.resetArray(this.state.value);
  }

  // generates a new array and enables the slider range
  resetArray = (width) => {
    this.setState({
      value: width,
      animationSpeed: Math.floor((WIDTH * 15) / width),
      sorted: false,
    });
    const array = [];
    for (let i = 0; i < width; i++) {
      array.push(randomIntFromInterval(15, 0.85 * window.innerHeight));
    }

    this.setState({ array });
    this.resetColors();
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

  resetColors() {
    let arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].className = "array-bar";
      arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
    }
  }
  finishedSorting() {
    let arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].className = "array-bar bar-animation";
    }
  }
  swapBars(indexOne, indexTwo) {
    var auxiliaryArray = this.state.array.slice();
    const temp = auxiliaryArray[indexOne];
    auxiliaryArray[indexOne] = auxiliaryArray[indexTwo];
    auxiliaryArray[indexTwo] = temp;
    this.setState({ array: auxiliaryArray });
  }

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
    for (let i = 0; i < animations.length; i++) {
      const [state, barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      if (state === "comparing") {
        // colors and restores bars being compared.
        setTimeout(() => {
          barOneStyle.backgroundColor = barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * this.state.animationSpeed);
        setTimeout(() => {
          barOneStyle.backgroundColor = barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, (i + 1) * this.state.animationSpeed);
      } else {
        // swap bar heights
        setTimeout(() => {
          this.swapBars(barOneIdx, barTwoIdx);
        }, i * this.state.animationSpeed);
      }
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
    this.setState({ isSorting: true });
    for (let i = 0; i < animations.length; i++) {
      const [state, barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      if (state === "comparing") {
        //Colors and restores bars being compared
        setTimeout(() => {
          barOneStyle.backgroundColor = barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * this.state.animationSpeed);
        setTimeout(() => {
          barOneStyle.backgroundColor = barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, (i + 1) * this.state.animationSpeed);
      } else {
        // Swaps bar's height
        setTimeout(() => {
          this.swapBars(barOneIdx, barTwoIdx);
        }, i * this.state.animationSpeed);
      }
    }
    const RESTORE_TIME = parseInt(
      this.state.animationSpeed * animations.length + 500
    );
    //Turn all bars green and restore buttons.
    setTimeout(() => {
      this.setState({ isSorting: false, sorted: true });
      this.finishedSorting();
    }, RESTORE_TIME);
  };
  // Animations array: [state, barOne, barTwo, pivotIdx]
  quickSort = (animations, arrayBars) => {
    this.setState({ isSorting: true });
    for (let i = 0; i < animations.length; i++) {
      const [state, barOneIdx, barTwoIdx, pivotIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const pivotBarStyle = arrayBars[pivotIdx].style;

      if (state === "comparing") {
        setTimeout(() => {
          barOneStyle.backgroundColor = barTwoStyle.backgroundColor = SECONDARY_COLOR;
          pivotBarStyle.backgroundColor = "yellow";
        }, i * this.state.animationSpeed);

        setTimeout(() => {
          barOneStyle.backgroundColor = barTwoStyle.backgroundColor = pivotBarStyle.backgroundColor = PRIMARY_COLOR;
        }, (i + 1) * this.state.animationSpeed);
      } else {
        setTimeout(() => {
          this.swapBars(barOneIdx, barTwoIdx);
        }, i * this.state.animationSpeed);
      }
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
    this.setState({ isSorting: true });
    for (let i = 0; i < animations.length; i++) {
      const [state, barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      if (state === "comparing") {
        setTimeout(() => {
          barOneStyle.backgroundColor = barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * this.state.animationSpeed);
        setTimeout(() => {
          barOneStyle.backgroundColor = barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, (i + 1) * this.state.animationSpeed);
      } else {
        setTimeout(() => {
          this.swapBars(barOneIdx, barTwoIdx);
        }, i * this.state.animationSpeed);
      }
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
    for (let i = 0; i < animations.length; i++) {
      const [state, barOneIdx, barTwoIdx, newHeight] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      if (state === "comparing") {
        setTimeout(() => {
          barOneStyle.backgroundColor = barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * this.state.animationSpeed);
        setTimeout(() => {
          barOneStyle.backgroundColor = barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, (i + 1) * this.state.animationSpeed);
      } else {
        setTimeout(() => {
          barOneStyle.height = `${newHeight}px`;
        }, i * this.state.animationSpeed);
      }
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
        />
        <Array randomArray={this.state.array} />
      </React.Fragment>
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
