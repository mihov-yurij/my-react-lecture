import type { JSX } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children }: { children: JSX.Element[] }) => {
  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    modalRoot,
  );
};

export default Modal;