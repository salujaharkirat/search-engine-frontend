import React from "react";
import {shallow} from "enzyme";

import Results from "../Results";

describe("<Results />", () => {
  it("should render component", () => {
    const props = {
      results: []
    }
    const wrapper = shallow(<Results {...props} />);
    expect(wrapper.length).toBe(1);
  })
})

