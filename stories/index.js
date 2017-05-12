import React, { Component } from 'react';
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
          value: 20,
          children: [
            {
              value: 10,
              children: [
                {
                  value: 5,
                  children: [
                    {
                      value: 3
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      value: 30
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
    <SelectableCakeChart
      tree={TREE} />
  ));

class SelectableCakeChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedNode: props.tree
    }
  }

  findParent = (node, child, parent) => {
    if (node === child) return parent;

    if (!child || !child.children) {
      return null;
    }

    for (let index = 0; index < child.children.length; index += 1) {
      const p = this.findParent(node, child.children[index], child);
      if (p) return p;
    }

    return null;
  }

  handleClick = (node) => {
    if (node === this.state.selectedNode) {
      const parent = this.findParent(node, TREE);

      if (parent) {
        this.setState({ selectedNode: parent });
      }
    } else if (node && node.children && node.children.length) {
      this.setState({ selectedNode: node });
    }
  }
  render() {
    return (
      <CakeChart
        data={this.state.selectedNode}
        coreRadius={120}
        ringWidth={80}
        ringWidthFactor={0.6}
        getSliceProps={getSliceProps}
        getLabelProps={getLabelProps}
        getLabel={getLabel}
        onClick={this.handleClick} />
    );
  }
}
