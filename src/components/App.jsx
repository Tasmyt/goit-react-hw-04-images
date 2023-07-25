import { useState } from 'react';

import { ToastContainer,  } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import  ImageGallery from './ImageGallery/ImageGallery';

export default function App() {  
  const [search, setSearch] = useState('');  
  const formSubmit = search => {
    setSearch(search);
}  
    return (
      <div>
        <Searchbar query={formSubmit} />
        
        <ImageGallery search={search} />
         
        <ToastContainer  />
      </div>
    );
  };

