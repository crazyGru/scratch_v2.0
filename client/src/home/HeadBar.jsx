import React from "react";
import { useState, useRef } from "react";
import SchoolIcon from "../assets/icons/school_icon.svg";
import MarkIcon from "../assets/icons/mark_icon.svg";
import ScratchIcon from "../assets/icons/scratch_icon.svg";
import SearchBox from "../components/SearchBox";
import LangChoice from "../components/LangChoice";
import "./HeadBar.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

function HeadBar() {

  const gotoServer = () => {
    console.log("yes");
    window.location.href = "http://localhost:8601";
  };
  const fileInput = useRef(null);
  const [file, setFile] = useState(null);

  const onButtonClick = () => {
    // Programmatically click the hidden file input
    fileInput.current.click();
  };

  const onFileChange = async (e) => {
    
    const url = 'http://localhost:5000/upload';
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    // formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const response = await axios.post(url, formData, config);
    console.log(response)
    if(response.ok){
      const res = await response.json();
      alert('The file is successfully uploaded: ' + res.path);
    }
    else {
      alert('Error uploading file: ');
    }
  };
  return (
    
    <div className="headbar-wrapper">
      <div style={{ padding:"10px" }}>
        <img
          src={SchoolIcon}
          alt=""
          style={{ width: "60px", height: "35px", marginRight:"10px"}} // Adjust width and height as needed
        />
        <img
          src={MarkIcon}
          alt=""
          style={{ width: "40px", height: "35px", marginRight:"10px" }} // Adjust width and height as needed
        />
        <img
          src={ScratchIcon}
          alt=""
          style={{ width: "90px", height: "35px", marginRight:"10px"}} // Adjust width and height as needed
        />
      </div>

      <input type="file" ref={fileInput} onChange={onFileChange} style={{ display: 'none' }} />
      <p  className="signup-btn" onClick={onButtonClick}>アップロード</p>
      <p>自分の部品</p>
      <p onClick={gotoServer} className="signup-btn">作ろう</p>
      <p>見る</p>
      <SearchBox />
      <LangChoice />
      <NavLink to="/"><p  className="signup-btn"　style={{ marginRight : "100px" }}>サインアウト</p></NavLink>
    </div>
  );
}

export default HeadBar;
