import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withLogin from "./with-login";

configure({adapter: new Adapter()});

const Component = () => <div/>;

const generateMockEvent = (value) => ({
  target: {value}
});

describe(`WithLogin correctly works`, () => {
  test(`Has correct initial state`, () => {
    const ComponentWrapped = withLogin(Component);

    const componentWrapped = shallow(<ComponentWrapped/>);

    expect(componentWrapped.state()).toEqual({
      email: ``,
      password: ``
    });
  });

  test(`Email correctly changes`, () => {
    const ComponentWrapped = withLogin(Component);

    const componentWrapped = shallow(<ComponentWrapped/>);

    expect(componentWrapped.state(`email`)).toEqual(``);

    const newEmail = `myCustom@email.com`;

    componentWrapped.prop(`onEmailChange`)(generateMockEvent(newEmail));

    expect(componentWrapped.state(`email`)).toEqual(newEmail);
  });

  test(`Password correctly changes`, () => {
    const ComponentWrapped = withLogin(Component);

    const componentWrapped = shallow(<ComponentWrapped/>);

    expect(componentWrapped.state(`password`)).toEqual(``);

    const newPassword = `myCustom@email.com`;

    componentWrapped.prop(`onPasswordChange`)(generateMockEvent(newPassword));

    expect(componentWrapped.state(`password`)).toEqual(newPassword);
  });
});
