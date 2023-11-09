const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const helmet = require('helmet');
const app = express();
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5000'] }));
//이걸 쓰면 uploads폴더를 http://localhost:port/uploads로 접근이 가능함
//Not allowed to load local resource: file:///D:/react/ImageExample/back/uploads/*.jpg 에러 해결용
app.use('/uploads', express.static('uploads'));
app.use(helmet());

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.json({
		success: true
	});
});

//multer - 이미지 파일 명이 안깨지도록 하고, 확장자 유지
//올린 파일과 같은 이름이 있는 경우 _1,_2를 붙임
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		const originalName = path.basename(
			file.originalname,
			path.extname(file.originalname)
		);
		const extension = path.extname(file.originalname);
		let filename = originalName;
		let index = 1;

		while (fs.existsSync(`uploads/${filename}${extension}`)) {
			filename = `${originalName}_${index}`;
			index++;
		}

		cb(null, filename + extension);
	}
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('image'), (req, res) => {
	res.json({ message: 'Image uploaded', filename: req.file.filename });
});

// app.get('/api/images/:name', (req, res) => {
// 	res.json({ src: `http://localhost:${port}/uploads/${req.params.name}` });
// });

app.listen(port, () => {
	console.log(`server is listening at localhost:${port}`);
});
