import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import App from './App';

const renderer = new ShallowRenderer();

describe('<App />', () => {
  it('Render main page and should match the snapshot', () => {
    renderer.render(<App />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
