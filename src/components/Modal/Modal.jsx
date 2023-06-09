import css from './Modal.module.css';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({onClose, link}) => {
  useEffect(() => {
    window.addEventListener('keydown', onClose);

    return () => window.removeEventListener('keydown', onClose);
  }, [onClose]);

  return createPortal(
    <div className={css.Overlay} id="overlay" onClick={onClose}>
      <div className={css.Modal}>
        <img className={css.Image} src={link} alt="smth good" />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
};
