import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ photos, onClick }) => {
  console.log('photos', photos);
  return (
    <ul className={css.ImageGallery}>
      {photos.map(photo => (
        <ImageGalleryItem
          key={photo.id}
          photoBigLink={photo.largeImageURL}
          photoLink={photo.webformatURL}
          onClick={onClick}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  photos: PropTypes.shape([]).isRequired,
  onClick: PropTypes.func.isRequired,
};
