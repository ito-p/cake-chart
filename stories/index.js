import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from './Button';
import Welcome from './Welcome';
import CakeChart from '../src/components/CakeChart';

const TREE = {
  value: 100,
  label: 'SUM = 100',
  children: [
    {
      value: 50,
      children: [
        {
          value: 10
        },
        {
          value: 20
        }
      ]
    },
    {
      value: 30
    },
    {
      value: 1,
      label: 's'
    },
    {
      value: 20,
      style: { background: '#000000' }
    }
  ]
};

function getLabel(slice, label) {
  return label;
}

function getSliceProps(slice, idx, props) {
  return { ...props, fill: '#000000' };
}

function getLabelProps(slice, idx, props) {
  return { ...props, style: { ...props.style, background: '#00ff00' } };
}

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));

storiesOf('CakeChart', module)
  .add('default', () => (
    <CakeChart
      data={TREE}
      coreRadius={120}
      ringWidth={80}
      ringWidthFactor={0.6}
      getSliceProps={getSliceProps}
      getLabelProps={getLabelProps}
      getLabel={getLabel}
      onClick={() => {}} />
  ));
