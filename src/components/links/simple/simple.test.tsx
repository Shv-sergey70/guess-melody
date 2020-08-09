import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Simple from "./simple";

configure({adapter: new Adapter()});

describe(`SimpleLink correctly renders`, () => {
  test(`without not required props`, () => {
    const simpleLink = shallow(<Simple to={`/main`} />);

    expect(simpleLink).toMatchSnapshot();
  });

  test(`with not required props`, () => {
    const simpleLink = shallow(
        <Simple
          to={`/main`}
          className={`myClass`}
          onClick={jest.fn()}
        >
          My custom children
        </Simple>
    );

    expect(simpleLink).toMatchSnapshot();
  });
});
