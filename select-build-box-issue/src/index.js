import ReactDOM from "react-dom";
import "@patternfly/react-core/dist/styles/base.css";
import "./fonts.css";

import React from "react";
import {
  SelectDirection,
  Select,
  SelectOption,
  SelectVariant,
} from "@patternfly/react-core";

//@ts-ignore
class TypeaheadSelectInput extends React.Component {
  constructor(props) {
    super(props);
    this.options = [
      <SelectOption key={0} value="Alabama" />,
      <SelectOption key={1} value="Florida" />,
      <SelectOption key={2} value="New Jersey" />,
      <SelectOption key={3} value="New Mexico" />,
      <SelectOption key={4} value="New York" />,
      <SelectOption key={5} value="North Carolina" />
    ];
    this.state = {
      isOpen: false,
      selected: null,
      forceUpdate: 0
    };

    this.onToggle = (isOpen) => {
      this.setState({
        isOpen
      });
    };

    this.onSelect = (event, selection, isPlaceholder) => {
      if (isPlaceholder) this.clearSelection();
      else {
        this.setState({
          selected: selection,
          isOpen: false
        });
        console.log("selected:", selection);
      }
    };

    this.clearSelection = () => {
      this.setState({
        selected: null,
        isOpen: false
      });
    };

    this.customFilter = (e, value) => {
      let input;
      try {
        input = new RegExp(value, "i");
      } catch (err) {}
      return value !== ""
        ? this.options.filter((child) => input.test(child.props.value))
        : this.options;
    };
  }

  render() {
    const { isOpen, selected } = this.state;
    const titleId = "typeahead-select-id-2";
    return (
          <div id="test">
            <Select
              variant={SelectVariant.checkbox}
              typeAheadAriaLabel="Select a state"
              onToggle={this.onToggle}
              onSelect={this.onSelect}
              onClear={this.clearSelection}
              onFilter={this.customFilter}
              selections={selected}
              isOpen={isOpen}
              direction={SelectDirection.down}
              placeholderText="Select a state"
            >
              {this.options}
            </Select>
          </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<TypeaheadSelectInput />, rootElement);

