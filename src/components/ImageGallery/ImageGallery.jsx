import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ photos, onClick }) => {
  return (
    <ul className={css.ImageGallery}>
      {photos.map(photo => {
        return (
          <ImageGalleryItem
            key={photo.id}
            photoBigLink={photo.largeImageURL}
            photoLink={photo.webformatURL}
            onClick={onClick}
          />
        )
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
};
