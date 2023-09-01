import React from 'react';
import { useEffect, useState } from 'react';
import './PopularSprite.css';

function PopularSprite() {
  const [svgData, setSvgData] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get_popular_sprite')
      .then(response => response.text())
      .then(svgData => {
        setSvgData(svgData);
      })
      .catch(error => {
        console.error('Error fetching SVG file:', error);
      });
  }, []);

  return (
    <div className='popularsprite-wrapper'>
      <div className='describetext'>
        <p>注目の部品</p>
        <p>もっと見る</p>
      </div>
      <div className='svg-container'>
        <div dangerouslySetInnerHTML={{ __html: svgData }}></div>
      </div>
    </div>
  );
}

export default PopularSprite;
