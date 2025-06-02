

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import s from './Footer.module.scss';

class Footer extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    return (
      <footer className={cx(s.root, this.props.className)}>
        <div className={s.container}>
          <span className={s.spacer}>·</span>
          <Link to="/tos">Terms of Service</Link>
          <span className={s.spacer}>·</span>
          <Link to="/privacy">Privacy Policy</Link>
          <span className={s.spacer}>·</span>
          <Link to="/not-found">Support</Link>
        </div>
      </footer>
    );
  }
}

export default Footer;
