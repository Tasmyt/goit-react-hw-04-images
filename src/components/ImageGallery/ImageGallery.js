import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import  {getQuery}  from '../apiImages';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from '../Modal/Modal';
import { BsXLg } from 'react-icons/bs';
import { CloseModal } from './ImageGallery.styled';
import { ModalDiv } from '../Modal/Modal.styled';
import { Gallery } from './ImageGallery.styled';
import { Loading } from '../Loader/Loader.styled';
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
};
export default function ImageGallery({ search }) {
 
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [tags, setTags] = useState('');  

  const onPage = () => {
    setPage(prev => prev + 1 );
    
  };

  const largeModal = (largeImageURL, tags) => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

   let oldSearch = useRef('');
  
  useEffect(() => {
// if (prevSearch !== nextSearch) {this.setState({ page: 1, images: [] });}

//     if ((prevSearch !== nextSearch && nextPage === 1)  || prevPage !== nextPage) {
    
          
    if (search === '') { return; }   

      setStatus(Status.PENDING);

      getQuery(search, page)
        .then(images => {
          if (images.hits.length === 0) {
            setStatus(Status.IDLE);
            setImages([]);
            return Promise.reject(new Error());            
          }         

          setImages(prev => [...prev, ...images.hits]);          
          setTotal(images.total);
          setStatus(Status.RESOLVED);
          setError(null);   
          
      if (oldSearch.current !== search && page !== 1) {
       setPage(1);
       setImages([]);
     }

           oldSearch.current = search;
          
        })
        .catch(() => toast.error('Нажаль ми не змогли знайти такі зображення'));    
  }, [search, page])
  
      return (
        <>
          {status === 'idle' && (<Loading>Які зображення ви хочете знайти?</Loading>)}                 
          <Gallery>
              <ImageGalleryItem images={images} largeModal={largeModal} />
          </Gallery>
          {status === 'pending' && (<Loader />)}   
          {status === 'resolved' && total / 12 > page && (
            <Button onPage={onPage}></Button>
          )}          
        
          {showModal && (
            <Modal closeModal={largeModal}>
              <ModalDiv>
                <img src={largeImageURL} alt={tags} />
                <CloseModal type="button" onClick={largeModal}>
                  <BsXLg size="40" />
                </CloseModal>
              </ModalDiv>
            </Modal>
          )}
        </>
      );
  }


ImageGallery.protoTypes = {
  search: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
