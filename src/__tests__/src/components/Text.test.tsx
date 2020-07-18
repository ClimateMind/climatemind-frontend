import React from 'react';
import { render } from '@testing-library/react';

import Text from '../../../components/Text';

describe('Text', () => {
  it('renders the text field with the corresponding text', () => {
    const { getByText } = render(
      <Text
        size={12}
        color={'black'}
        fontFamily={'noFamily'}
        textAlign={'center'}
      >
        <p>foo</p>
      </Text>
    );
    expect(getByText('foo')).toBeInTheDocument();
  });
});
