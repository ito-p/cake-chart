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
      value: 20
    }
  ]
};

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
      onClick={() => {}} />
  ));
