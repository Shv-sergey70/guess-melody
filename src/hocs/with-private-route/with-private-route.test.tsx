import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import withPrivateRoute from "./with-private-route";

configure({adapter: new Adapter()});

const Component: React.FunctionComponent = () => <div/>;

describe(`WithPrivateRoute correctly works`, () => {
  test(`Redirect to auth screen renders`, () => {
    const ComponentWrapped = withPrivateRoute(Component);

    const componentWrapped = shallow(
        <ComponentWrapped
          user={{}}
        />
    );

    expect(componentWrapped).toMatchSnapshot();
  });

  test(`Component renders`, () => {
    const ComponentWrapped = withPrivateRoute(Component);

    const componentWrapped = shallow(
        <ComponentWrapped
          user={{
            email: `test@test.ru`
          }}
        />
    );

    expect(componentWrapped).toMatchSnapshot();
  });
});
