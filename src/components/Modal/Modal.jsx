import css from './Modal.module.css';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.props.onClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.onClose);
  }

  render() {
    return createPortal(
      <div className={css.Overlay} id="overlay" onClick={this.props.onClose}>
        <div className={css.Modal}>
          <img className={css.Image} src={this.props.link} alt="smth good" />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
}
