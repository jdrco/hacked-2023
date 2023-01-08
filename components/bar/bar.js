import React from 'react';
import { select, event } from 'd3-selection';
import { transition } from 'd3-transition';

class Bar extends React.Component {
  constructor() {
    super();
    this.ref = React.createRef();
  }
  componentDidMount() {
    this.init();
  }
  componentDidUpdate() {
    this.barTransition();
  }
  barTransition() {
    const node = this.ref.current;
    const { yScale, height, data, t } = this.props;

    select(node)
      .selectAll('.bar')
      .data(data)
      //.transition(t)
      .attr('y', (d) => yScale(d.score))
      .attr('height', (d) => height - yScale(d.score));
  }
  init() {
    const { xScale, yScale, data, height } = this.props;
    const node = this.ref.current;

    // prepare initial data from where transition starts.
    const initialData = data.map((obj) => ({
      label: obj.label,
      score: 0,
    }));

    // prepare the field
    const bar = select(node).selectAll('.bar').data(initialData);

    // add rect to svg
    bar
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.label))
      .attr('y', height)
      .attr('width', xScale.bandwidth());

    this.barTransition();
  }
  render() {
    return <g className="bar-group" ref={this.ref} />;
  }
}

export default Bar;
