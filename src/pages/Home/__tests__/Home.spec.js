import React from "react";
import {shallow} from "enzyme";

import Home from "../Home";

describe("<Home />", () => {
  it("should render component", () => {
    const props = {
      results: [],
      buttonDisabled: true,
      searchText: "",
      onChange: () => {},
      onSubmit: () => {},
      books: [],
      onBookSelect: () => {}
    }
    const wrapper = shallow(<Home {...props} />);
    expect(wrapper.length).toBe(1);
  })
})

