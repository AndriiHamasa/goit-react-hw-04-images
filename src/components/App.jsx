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
    if (search !== '') {
      async function fetchData() {
        const response = await api(search, page);
        setResponse(prev => [...prev, ...response.hits]);
        setTotalHits(response.totalHits);
        setLoader(false);
        return;
      }
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

  //   async componentDidUpdate(prevProps, prevState) {
  //     if (
  //       prevState.search === this.state.search.trim() &&
  //       prevState.page === this.state.page
  //     ) {
  //       return;
  //     }
};

// export class App extends Component {
//   state = {
//     search: '',
//     response: [],
//     totalHits: 0,
//     page: 1,
//     loader: false,
//     showModal: false,
//     linkModal: '',
//   };

//   response = null;

//   handleSearch = search => {
//     if (search !== '')
//       this.setState({ search, page: 1, response: [], loader: true });
//   };

//   openModal = url => {
//     this.setState({ showModal: true, linkModal: url });
//   };

//   toggleModal = e => {
//     if (e.currentTarget === e.target || e.code === 'Escape')
//       this.setState(({ showModal }) => ({ showModal: !showModal }));
//   };

//   handleLoadMore = async () => {
//     this.setState(prevState => ({ loader: true, page: prevState.page + 1 }));
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     if (
//       prevState.search === this.state.search.trim() &&
//       prevState.page === this.state.page
//     ) {
//       return;
//     }

//     const response = await api(this.state.search, this.state.page);
//     this.setState(prevState => ({
//       response: [...prevState.response, ...response.hits],
//       totalHits: response.totalHits,
//       loader: false,
//     }));
//   }

//   render() {
//     const { response, page, loader, showModal, linkModal } =
//       this.state;

//     return (
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: '1fr',
//           gridGap: '16px',
//           paddingBottom: '24px',
//         }}
//       >
//         <Searchbar onSearch={this.handleSearch} />
//         {response && (
//           <ImageGallery photos={response} onClick={this.openModal} />
//         )}
//         {this.state?.totalHits > 12 &&
//           page < Math.ceil(this.state?.totalHits / 12) &&
//           !loader && <Button onClick={this.handleLoadMore} />}
//         {loader && <Loader />}
//         {showModal && <Modal onClose={this.toggleModal} link={linkModal} />}
//       </div>
//     );
//   }
// }
