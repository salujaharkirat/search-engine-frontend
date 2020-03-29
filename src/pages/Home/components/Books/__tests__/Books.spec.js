import React from "react";
import {shallow} from "enzyme";

import Books from "../Books";

describe("<Books />", () => {
  it("should render component", () => {
    const props = {
      books: []
    }
    const wrapper = shallow(<Books {...props} />);
    expect(wrapper.length).toBe(1);
  })
})

