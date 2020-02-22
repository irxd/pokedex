import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import DetailTable from '../DetailTable';

const renderer = new ShallowRenderer();

const mockAbilitiesData = [
  {
    ability: {
      name: "solar-power"
    },
    slot: 3
  }
]

describe('<DetailTable />', () => {
  it('Render detail table component and should match the snapshot', () => {
    renderer.render(
      <DetailTable
        data={mockAbilitiesData}
        title="ability"
        value="slot"
      />
    );
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
