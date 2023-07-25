import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalDiv } from './Modal.styled';
import PropTypes from 'prop-types';
const modalRoot = document.querySelector('#modal-root');

export function Modal ({closeModal, children, }) {

  useEffect(() => {
    window.addEventListener('keydown', keyDown);
    return() => { window.removeEventListener('keydown', keyDown);}
},)


  const keyDown = e => {    
    if (e.code === 'Escape') {
      closeModal(); 
    }
  };

    const backdropClick = e => {
        if (e.currentTarget === e.target) {
            closeModal();
        }
    }

  return createPortal(
    <Overlay onClick={backdropClick}>
            <ModalDiv >
                {children}
            </ModalDiv>
    </Overlay>, modalRoot);
}


Modal.protoTypes = {
  onClick: PropTypes.func,
  closeModal: PropTypes.func,
  children: PropTypes.node.isRequired,
}