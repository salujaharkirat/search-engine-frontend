import React from "react";
import {shallow} from "enzyme";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {API_END_POINT} from "api";


import Home from "../Home.container";

describe("<HomeContainer />", () => {
  it("should render default component", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.length).toBe(1);
  })
  it("should render default state", () => {
    const wrapper = shallow(<Home />);
    const instance = wrapper.instance();
    expect(instance.state.results).toEqual([]);
    expect(instance.state.searchText).toEqual("");
    expect(instance.state.selectedBook).toEqual({});
    expect(instance.state.books).toEqual([]);
  })
  it("should change name", () => {
    const wrapper = shallow(<Home />);
    const instance = wrapper.instance();
    wrapper.instance().onChange({
      target: {
        value: "New text",
      }
    })
    expect(instance.state.searchText).toEqual("New text");
  })
  it("should fetch data", async () => {
    const wrapper = shallow(<Home />);
    const instance = wrapper.instance();
    const mockAdapter = new MockAdapter(axios);
    const searchResults =  [
      [
        {
          id: 1,
          title: "First book",
          summary: "First Summary",
          author: "First Author"
        },
        {
          id: 2,
          title: "Second book",
          summary: "Second Summary",
          author: "Second Author"
        }
      ]
    ];

    const expectedResult = [
      {
        id: 1,
        title: "First book",
        summary: "First Summary",
        author: "First Author"
      },
      {
        id: 2,
        title: "Second book",
        summary: "Second Summary",
        author: "Second Author"
      }
    ];

    mockAdapter.onPost(API_END_POINT).reply(() => {
      return [200, {
        books: searchResults,
        status: "OK"
      }];
    });

    wrapper.instance().fetchData();
    wrapper.update();

    const flushPromises = () => new Promise(resolve => setTimeout(resolve));
    await flushPromises();
    expect(instance.state.results).toEqual(expectedResult);
  })
  it("should submit", () => {
    const wrapper = shallow(<Home />);
    const instance = wrapper.instance();


    const selectedBook = {
      id: 1,
      title: "Title",
      author: "Author",
      summary: "summary"
    };

    wrapper.instance().onBookSelect(selectedBook);


    wrapper.instance().onSubmit({
      preventDefault: jest.fn()
    })

    expect(instance.state.searchText).toEqual("");
    expect(instance.state.selectedBook).toEqual({});
    expect(instance.state.books).toEqual([selectedBook])
  })
  it("should select book", () => {
    const wrapper = shallow(<Home />);
    const instance = wrapper.instance();


    const selectedBook = {
      id: 1,
      title: "Title",
      author: "Author",
      summary: "summary"
    };

    wrapper.instance().onBookSelect(selectedBook);

    expect(instance.state.searchText).toEqual(selectedBook.title);
    expect(instance.state.selectedBook).toEqual(selectedBook);
    expect(instance.state.results).toEqual([])
  })
});

