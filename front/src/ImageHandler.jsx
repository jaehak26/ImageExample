import React, { useState } from 'react';
import axios from 'axios';

const serverUrl = 'http://localhost:5000';

const ImageHandler = () => {
	const [file, setFile] = useState(null);
	const [imageName, setImageName] = useState('');
	const [imageSrc, setImageSrc] = useState('');

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleUpload = async () => {
		const formData = new FormData();
		formData.append('image', file);
		const response = await axios.post(`${serverUrl}/api/upload`, formData);
		alert(response.data.message);
	};

	const handleImageNameChange = (e) => {
		setImageName(e.target.value);
	};

	const handleImageLoad = async () => {
		// const response = await axios.get(`${serverUrl}/api/images/${imageName}`);
		// setImageSrc(response.data.src);
		setImageSrc(`${serverUrl}/uploads/${imageName}`);
	};

	return (
		<div>
			<input type='file' onChange={handleFileChange} />
			<button onClick={handleUpload}>Upload</button>
			<input type='text' value={imageName} onChange={handleImageNameChange} />
			<button onClick={handleImageLoad}>Image Load</button>
			<br />
			{imageSrc && <img src={imageSrc} alt='preview' />}
		</div>
	);
};

export default ImageHandler;
