import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {MistakesList} from "./mistakes-list";

configure({adapter: new Adapter()});

test(`MistakesList correctly renders`, () => {
  const tree = shallow(<MistakesList mistakes={2} />);

  expect(tree).toMatchSnapshot();
});
