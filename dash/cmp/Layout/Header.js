import React from 'react';

import { MenuIcon } from 'Components/svg';

const Header = ({ onToggleSidebar }) => {
  return (
    <div className="layout__header">
      <div type="button" className="cursor-pointer" onClick={onToggleSidebar}>
        <MenuIcon size={32} />
      </div>
    </div>
  );
};

export default Header;
