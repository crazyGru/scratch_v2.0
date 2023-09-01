import React from 'react';
import { ReactComponent as SearchIcon } from '../assets/icons/search_icon.svg';
import './SearchBox.css'

function SearchBox() {
  return (
    <div className='searchbox-wrapper'>
      <input type='text' placeholder='検索' />
      <span><SearchIcon /></span>
    </div>
  );
}

export default SearchBox;
