import React, { useRef, useState } from 'react';

const Test = () => {
  const fileInput = useRef(null);
  const [file, setFile] = useState(null);

  const onButtonClick = () => {
    // Programmatically click the hidden file input
    fileInput.current.click();
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert('The file is successfully uploaded: ' + data.path);
      })
      .catch((error) => {
        alert('Error uploading file: ' + error);
      });
  };

  return (
    <div className="App">
      <h1>File Upload</h1>
      <input type="file" ref={fileInput} onChange={onFileChange} style={{ display: 'none' }} />
      <button onClick={onButtonClick}>Upload</button>
    </div>
  );
}

export default Test;
