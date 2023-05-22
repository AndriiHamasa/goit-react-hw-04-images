import { useEffect } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { api } from './API';
import { Loader } from './Loader';
import { Modal } from './Modal';
import { useState } from 'react';

export const App = () => {
  const [search, setSearch] = useState('');
  const [response, setResponse] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [linkModal, setLinkModal] = useState('');

  const handleSearch = search => {
    if (search !== '') {
      setLoader(true)
      setSearch(search);
      setPage(1)
      setResponse([])
    }
  };

  const openModal = url => {
    setShowModal(true);
    setLinkModal(url);
  };

  const toggleModal = e => {
    if (e.currentTarget === e.target || e.code === 'Escape')
      setShowModal(prev => !prev);
  };

  const handleLoadMore = async () => {
    setLoader(true);
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await api(search, page);
      setResponse(prev => [...prev, ...response.hits]);
      setTotalHits(response.totalHits);
      setLoader(false);
      return;
    }
    if (search !== '') {
      fetchData();
    }
  }, [search, page]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSearch={handleSearch} />
      {response && <ImageGallery photos={response} onClick={openModal} />}
      {totalHits > 12 && page < Math.ceil(totalHits / 12) && !loader && (
        <Button onClick={handleLoadMore} />
      )}
      {loader && <Loader />}
      {showModal && <Modal onClose={toggleModal} link={linkModal} />}
    </div>
  );
};

