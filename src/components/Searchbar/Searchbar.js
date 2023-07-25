import { useState } from 'react';
import PropTypes from 'prop-types';
import { BiSearchAlt2 } from 'react-icons/bi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Input } from './Searchbar.styled';

export default function Searchbar({ query }) {
  const [search, setSearch] = useState('');  

  const nameSeach = e => {
    setSearch(e.currentTarget.value.toLowerCase());
    };
    
  const nameQuery = e => {
    e.preventDefault();
    if (search.trim() === '') { toast('Що шукати?');
    return;
  }
      query(search);
      setSearch( '' );
    }
  
    return (
      <Form onSubmit={nameQuery}>
        <Input
          type="text"
          name="search"
          value={search}
          onChange={nameSeach}
        />
        <button type="submit">
          <BiSearchAlt2 size="20" />
        </button>
      </Form>
    );  
}


Searchbar.protoTypes = {
  query: PropTypes.func.isRequired
}