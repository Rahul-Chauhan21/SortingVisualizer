import React from "react";
import "./SortingVisualizer.css";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class NavBar extends React.Component {
  handleChange = (event) => {
    this.props.resetArray(event.target.value);
  };
  render() {
    const {
      value,
      width,
      resetArray,
      selectAlgorithm,
      onStart,
      algorithm,
      testSortingAlgorithm,
      isSorting,
    } = this.props;
    return (
      <Navbar
        className="bg-dark justify-content-between"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Navbar.Brand>Sorting Visualizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <button
              type="button"
              className="btn btn-warning mr-2"
              id="generateArray"
              disabled={isSorting ? true : false}
              onClick={() => resetArray(value)}
            >
              Generate New Array
            </button>
            <button
              type="button"
              className="btn btn-outline-danger mr-2"
              onClick={() => testSortingAlgorithm()}
            >
              Test Sorting algorithm
            </button>
            <button
              id="startBtn"
              type="button"
              disabled={algorithm.length === 0 ? true : false}
              className="btn btn-outline-success mr-2"
              onClick={() => onStart()}
            >
              Start
            </button>
          </Nav>
          <Nav className="mx-auto">
            <div className="slidercontainer">
              <p style={{ marginTop: 1, color: "white" }}>
                Change Array size & Sorting speed
              </p>
              <input
                type="range"
                id="myRange"
                className="slider"
                defaultValue={width}
                disabled={isSorting ? true : false}
                min={15}
                max={width}
                style={{
                  marginTop: 1,
                  marginBottom: 10,
                }}
                onChange={this.handleChange}
              />
            </div>
          </Nav>
          <Nav className="ml-auto">
            <button
              type="button"
              className="btn btn-outline-success mr-2"
              id="mergeSort"
              onClick={() => selectAlgorithm("mergeSort")}
            >
              Merge Sort
            </button>
            <button
              type="button"
              className="btn btn-outline-success mr-2"
              id="quickSort"
              onClick={() => selectAlgorithm("quickSort")}
            >
              Quick Sort
            </button>
            <button
              type="button"
              id="heapSort"
              className="btn btn-outline-success mr-2"
              onClick={() => selectAlgorithm("heapSort")}
            >
              Heap Sort
            </button>

            <button
              type="button"
              id="insertionSort"
              className="btn btn-outline-success mr-2"
              onClick={() => selectAlgorithm("insertionSort")}
            >
              Insertion Sort
            </button>

            <button
              type="button"
              id="bubbleSort"
              className="btn btn-outline-success mr-2"
              onClick={() => selectAlgorithm("bubbleSort")}
            >
              Bubble Sort
            </button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
