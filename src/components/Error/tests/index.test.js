import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Error from '../index';

const renderer = new ShallowRenderer();

describe('<Error />', () => {
  it('Render error component and should match the snapshot', () => {
    renderer.render(
      <Error
        error={true}
        handleCloseSnackbar={() => {}}
      />
    );
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
