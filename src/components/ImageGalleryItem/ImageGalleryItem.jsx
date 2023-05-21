import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ photoLink, onClick, photoBigLink }) => {
  return (
    <li className={css.ImageGalleryItem} onClick={() => onClick(photoBigLink)}>
      <img
        src={photoLink}
        alt="smth good"
        className={css.ImageGalleryItemImage}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  photoLink: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  photoBigLink: PropTypes.string.isRequired,
};
