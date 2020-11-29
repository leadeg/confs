import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ColorfullBar from 'Assets/svg/colorfull-bar.svg';
import HepsiburadaCondencedColors from 'Assets/svg/hepsiburada-condenced-colors.svg';

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      style={{
        backgroundImage: `url(${ColorfullBar}), url(${HepsiburadaCondencedColors})`,
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundPosition: 'top 0 center, top 18px center',
      }}
      className={classNames('layout__sidebar', { 'layout__sidebar--open': isOpen })}
    >
      <div className="layout__sidebar_content"></div>
    </aside>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
};

export default Sidebar;
