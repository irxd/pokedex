import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Filter from '../index';

const renderer = new ShallowRenderer();

const mockTypeData = [
  {
    name: "normal",
    url: "https://pokeapi.co/api/v2/type/1/"
  },
  {
    name: "fighting",
    url: "https://pokeapi.co/api/v2/type/2/"
  }
]

describe('<Filter />', () => {
  it('Render filter component and should match the snapshot', () => {
    renderer.render(
        <Filter
          handleSubmit={() => {}}
          handleFilter={() => {}}
          types={mockTypeData}
        />
    );
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
