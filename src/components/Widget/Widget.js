

import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Card from "react-bootstrap/Card";
import s from './Widget.module.scss';

class Widget extends React.Component {
  static propTypes = {
    title: PropTypes.node,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };

  static defaultProps = {
    title: null,
    className: '',
    children: [],
  };

  render() {
    return (
      <Card>
        <section className={cx(s.widget, this.props.className)}>
          <Card.Header className={cx(s.widget_header)}>
            {this.props.title &&
              (typeof this.props.title === 'string' ? (
                <h5 className={s.title}>{this.props.title}</h5>
              ) : (
                <header className={s.title}>{this.props.title}</header>
              ))}
          </Card.Header>
          <Card.Body>
            <div>{this.props.children}</div>
          </Card.Body>
        </section>
      </Card>
    );
  }
}

export default Widget;
