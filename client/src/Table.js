import React from "react";
import axios from "./axios/axios-census-db";
import Select from "./Select";
import Loader from "./Loader";
import Tablerow from "./Tablerow";

class Table extends React.Component {
  state = {
    error: "",
    loading: true,
    selectedValues: [],
    allVariables: [],
    selected: "",
    dataLength: 0
  };

  async componentDidMount() {
    try {
      this.fetchDataFromDb();
      const allVariablesPromise = axios.get("/columns");
      const allVariables = await allVariablesPromise;
      this.setState({
        allVariables: allVariables.data.filter(el => el.name !== "age")
        // loading: false
      });
    }
    catch (error) {
      this.setState({ error: error.message });
    }
  }

  /**
  * Fetches data from api endpoint.
  *
  * @param {string} The demographic variable to retrieve census data.
  */
  async fetchDataFromDb(selectedVar = "class of worker") {
    this.setState({ loading: true, selected: selectedVar });
    try {
      const res = await axios.post("/rows", { selectedVar: selectedVar });
      this.setState({
        selectedValues: res.data.rows,
        dataLength: Math.max(res.data.rowCount - 100, 0)
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    // Handle errors
    if (this.state.error) {
      return `Heads up! An error has occurred: ${this.state.error}`;
    } else if (this.state.loading) {
      return <Loader />;
    }

    // Create table rows programmatically based on state
    const tableRows = this.state.selectedValues.map((el, i) => (
      <Tablerow
        key={i}
        value={el.value}
        count={el.count}
        averageAge={el.average_age} />
    ));

    // Create options programmatically based on state
    const options = this.state.allVariables.map((el, i) => {
      return (
        <option key={i} value={el.name}>
          {el.name}
        </option>
      );
    });

    return (
      <React.Fragment>
        <Select
          changeVariable={e => this.fetchDataFromDb(e.target.value)}
          value={this.state.selected}
        >
          {options}
        </Select>
        <table className="uk-table">
          <caption>Select a variable above to visualize the demographic data in the database.</caption>
          <thead>
            <tr>
              <th>Value</th>
              <th>Count</th>
              <th>Average Age</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
        {this.state.dataLength > 0 && (<p>{this.state.dataLength} rows are not showing</p>)}
      </React.Fragment>
    );
  }
}

export default Table;
