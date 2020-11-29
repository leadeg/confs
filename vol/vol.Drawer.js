import style from './Drawer.module.scss';

import React, { PureComponent } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import Backdrop from './Backdrop';

export default class Drawer extends PureComponent {
  getDrawerTransitions() {
    const { from } = this.props;
    return {
      enter: style[`drawer__${from}--enter`],
      enterActive: style[`drawer__${from}--enterActive`],
      exit: style[`drawer__${from}--exit`],
      exitActive: style[`drawer__${from}--exitActive`],
    };
  }

  getBackdropTransitions() {
    return {
      enter: style[`backdrop--enter`],
      enterActive: style[`backdrop--enterActive`],
      exit: style[`backdrop--exit`],
      exitActive: style[`backdrop--exitActive`],
    };
  }

  handleEnterActions = () => {
    const { onInitialized } = this.props;
    onInitialized && onInitialized();
  };

  handleExitActions = () => {
    const { onRequestClose } = this.props;
    onRequestClose && onRequestClose();
  };

  render() {
    const { from, open, onClose, backdropOn, onClickBackdrop, children } = this.props;
    const isValidBackdropCallBack = typeof onClickBackdrop === 'function';
    return (
      <>
        <CSSTransition
          in={open && backdropOn}
          timeout={350}
          classNames={this.getBackdropTransitions()}
          unmountOnExit
          mountOnEnter
        >
          <Backdrop
            {...(onClickBackdrop !== false && {
              onClick: isValidBackdropCallBack ? onClickBackdrop : onClose,
            })}
          />
        </CSSTransition>

        <CSSTransition
          in={open}
          timeout={2000}
          classNames={this.getDrawerTransitions()}
          unmountOnExit
          mountOnEnter
          onEnter={this.handleEnterActions}
          onExited={this.handleExitActions}
        >
          <div className={`${style.drawer} ${style[`drawer__${from}`]}`}>
            {from === 'bottom' && (
              <div className={style.mobileCloserContainer}>
                <div className={style.line} onClick={onClose} onTouchStart={onClose} />
              </div>
            )}
            <div className={style.drawer__content}>{children}</div>
          </div>
        </CSSTransition>
      </>
    );
  }
}

Drawer.defaultProps = {
  open: false,
  from: 'bottom',
  backdropOn: true,
};

Drawer.propTypes = {
  backdropOn: PropTypes.bool,
  from: PropTypes.oneOf(['left', 'right', 'bottom', 'top']),
  open: PropTypes.bool,
  onClickBackdrop: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onClose: PropTypes.func,
  onRequestClose: PropTypes.func,
  onInitialized: PropTypes.func,
};
