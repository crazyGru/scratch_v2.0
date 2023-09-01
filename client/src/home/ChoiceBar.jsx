import React from "react";
import "./ChoiceBar.css";

function ChoiceBar() {
  // const fs = require('fs');

  // const filePath = './asd.sb3';
  

  

  // const handleFile = () => {
  //   // alert("File!!!")
  //   fs.readFile(filePath, (err, data) => {
  //     if (err) throw err;
      
  //     // Do something with the file data
  //     console.log(data);
  // // });
  // }

  return (
    <div className="choicebar-wrapper">
      <button>
        <p>Scratchライブラリについて</p>
      </button>
      <button>
        <p>Scratchについて</p>
      </button>
      <button>
        <p>保護者の方へ</p>
      </button>
      <button>
        <p>教育関係者の方へ</p>
      </button>
      <button>
        <p>寄付</p>
      </button>
    </div>
  );
}

export default ChoiceBar;
