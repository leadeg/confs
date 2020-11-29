/** Dependencies */
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const appRoot = document.getElementById('root');

export default function Portal({ children, className }) {
  const el = document.createElement('div');

  useEffect(() => {
    appRoot.appendChild(el).classList.add(...className.split(' '));

    return () => {
      appRoot.removeChild(el);
    };
  });

  return ReactDOM.createPortal(<>{children}</>, el);
}
