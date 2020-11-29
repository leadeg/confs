import style from './Drawer.module.scss';

import React, { Component } from 'react';

export default class Backdrop extends Component {
  handleClick = (e) => {
    const { onClick } = this.props;
    e.stopPropagation();
    typeof onClick === 'function' && onClick();
  };

  render() {
    return <div className={style.backdrop} onClick={this.handleClick} />;
  }
}
