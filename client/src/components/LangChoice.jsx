import React from 'react';
import './LangChoice.css';

function LangChoice() {
  return (
    <div　className='langchoice-wrapper'>
      <select name="mylist">
        <option value="japanese">日本語</option>
        <option value="english">English</option>
      </select>
    </div>
  );
}

export default LangChoice;
