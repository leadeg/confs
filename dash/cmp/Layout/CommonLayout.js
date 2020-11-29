import React, { useState } from 'react';

import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

const CommonLayout = ({ children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const handleToggleSideBar = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsSideBarOpen((prevState) => !prevState);
  };

  return (
    <div className="layout">
      <Sidebar isOpen={isSideBarOpen} />
      <Content className="layout__content">
        <Header onToggleSidebar={handleToggleSideBar} />
        {children}
        <Footer />
      </Content>
    </div>
  );
};

export default CommonLayout;
