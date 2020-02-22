import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Detail from '../index';

const renderer = new ShallowRenderer();

const mockDetailData = {
  name: "charmander",
  id: 4,
  base_experience: 62,
  height: 6,
  weight: 85,
  types: [
    {
      slot: 1,
      type: {
        name: "fire"
      }
    }
  ],
  stats: [
    {
      base_stat: 65,
      effort: 1,
      stat: {
        name: "speed"
      }
    }
  ],
  abilities: [
    {
      ability: {
        name: "solar-power"
      },
      slot: 3
    }
  ]
};

describe('<Detail />', () => {
  it('Render detail component and should match the snapshot', () => {
    renderer.render(
      <Detail
        detail={mockDetailData}
        modal={false}
        handleCloseModal={() => {}}
        value={0}
        setValue={() => {}}
      />
    );
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
