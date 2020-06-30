import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import Icon from "@material-ui/core/Icon";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";
import RiskIcon from "./../../partials/risk-icon/risk-icon.component";

import "./filter-panel.css";

export default class FilterPart extends Component {
  state = { searchPanelShown: false, filterValue: "", searchQuery: "" };

  setSearch = (value) => {
    this.setState({
      searchQuery: value,
    });
  };

  applyFilter = () => {
    const { searchQuery } = this.state;
    this.setState({
      filterValue: searchQuery,
      searchPanelShown: false,
    });
    if (this.props.onFilterChange) {
      this.props.onFilterChange(this.props.partName, searchQuery);
    }
  };

  cancelFilter = () => {
    const { filterValue } = this.state;
    this.setState({
      searchQuery: filterValue,
      searchPanelShown: false,
    });
    if (this.props.onFilterChange) {
      this.props.onFilterChange(this.props.partName, filterValue);
    }
  };

  showSearchPanel = (event) => {
    this.setState({ searchPanelShown: true });
  };

  removeFilterPart = () => {
    if (this.props.onRemove) {
      this.props.onRemove();
    }
  };

  render() {
    const { searchPanelShown, searchQuery, filterValue } = this.state;
    const { title, partType, value } = this.props;

    return (
      <div className="filter-part relative">
        {searchPanelShown && (
          <div className="filter-search-panel absolute white-bg box-shadow">
            <div className="search-panel search flex-row align-center">
              <div className="search-icon">
                <SearchIcon />
              </div>
              {partType === "date" ? (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    format="MM/DD/YYYY"
                    margin="normal"
                    id="date-picker-inline"
                    value={searchQuery ? searchQuery : new Date()}
                    onChange={(date) => this.setSearch(date.format("L"))}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              ) : (
                <input
                  className="search-field"
                  type="search"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(event) => this.setSearch(event.target.value)}
                ></input>
              )}
            </div>
            <div className="flex-row">
              <button className="grey-btn" onClick={this.applyFilter}>
                Apply
              </button>
              <button className="white-btn" onClick={this.cancelFilter}>
                Close
              </button>
            </div>
          </div>
        )}
        {partType === "risk" ? (
          <div className="filter-part-tag">
            <div className="filter-part-name">Risk:</div>
            <RiskIcon safetyLevel={value} />
            <Icon
              className="remove-filter-btn pointer"
              onClick={this.removeFilterPart}
            >
              cancel
            </Icon>
          </div>
        ) : (
          <div className="filter-part-tag">
            <div className="filter-part-name">
              {filterValue ? `${title}:` : title}
            </div>
            <div className="filter-part-value">{filterValue}</div>
            <div
              className="show-panel-btn pointer"
              onClick={this.showSearchPanel}
            >
              &#11206;
            </div>
            <Icon
              className="remove-filter-btn pointer"
              onClick={this.removeFilterPart}
            >
              cancel
            </Icon>
          </div>
        )}
      </div>
    );
  }
}