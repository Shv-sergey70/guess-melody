import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {VictoryScreen} from "./victory-screen";

configure({adapter: new Adapter()});

test(`Victory screen renders correctly`, () => {
  const tree = shallow(
      <VictoryScreen
        mistakesCount={1}
        wastedTime={75}
        totalScores={12}
        fastScores={8}
      />
  );

  expect(tree).toMatchSnapshot();
});
