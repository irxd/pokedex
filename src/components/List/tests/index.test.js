import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import List from '../index';

const renderer = new ShallowRenderer();

const mockListData = [
  {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/"
  },
  {
    name: "ivysaur",
    url: "https://pokeapi.co/api/v2/pokemon/2/"
  }
]

describe('<List />', () => {
  it('Render list component and should match the snapshot', () => {
    renderer.render(
        <List
          list={mockListData}
          handleDetail={() => {}}
          getPokemonId={() => {}}
        />
    );
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
