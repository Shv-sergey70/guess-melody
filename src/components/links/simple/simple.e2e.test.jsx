import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Simple from "./simple";

configure({adapter: new Adapter()});

test(`SimpleLink success click`, () => {
  const onClickMock = jest.fn();

  const simpleLink = shallow(<Simple to={`/main`} onClick={onClickMock} />);

  simpleLink.find(`Link`).simulate(`click`);

  expect(onClickMock).toHaveBeenCalledTimes(1);
});
