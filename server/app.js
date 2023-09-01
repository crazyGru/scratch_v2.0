const express = require('express')
const cors = require('cors');
const app = express()
const PORT = 5000
const mongoose = require("mongoose")
const { MONGOURL } = require("./keys")
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const unzip = require('node-unzip-2');
const path = require('path');
const AdmZip = require("adm-zip");
const yauzl = require("yauzl");
const unzipper = require('unzipper');
const extract = require('extract-zip');
const archiver = require('archiver');
const session = require('express-session');
const JSZip = require('jszip');
const fsExtra = require('fs-extra');

app.use(session({
    user: 'knight',
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },

}))

require("./models/user")
require("./models/project")
require("./models/sprite")

const Project = mongoose.model("Project");
const Sprite = mongoose.model("Sprite")

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("./routes/auth"))



mongoose.connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on("connected", () => {
    console.log("Connected to mongodb")
})
mongoose.connection.on("error", () => {
    console.log("Error")
})

app.get('/', (req, res) => {
    res.send("hello world")
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/projects/');
    },
    filename: function (req, file, cb) {
        cb(null, req.session.user + '_' + file.originalname);
    },
});

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'application/octet-stream') {
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
// };


// const upload = multer({ storage: storage, fileFilter: fileFilter });
const extractPath = 'uploads/extracted/'
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const filePath = path.join(__dirname, req.file.path);
        const outputDir = path.join(__dirname, extractPath);

        const zip = new AdmZip(filePath);
        zip.extractAllTo(outputDir);
        console.log('Extraction complete');

        const projectJson = JSON.parse(await fs.promises.readFile(path.join(extractPath, 'project.json'), 'utf-8'));

        // Extract the sprites and save them as .sprite files
        for (const target of projectJson.targets) {
            if (target.isStage) continue;

            const file_name = target.name;
            const spriteData = JSON.stringify(target);
            const sanitizedStr = file_name.replace(/[^\w\s.-]/gi, '');
            const trimmedStr = sanitizedStr.replace(/\s+/g, ' ');
            const finalfileName = trimmedStr.trim();
            const spritename = req.session.user + '_' + finalfileName;
            const output = fs.createWriteStream(`uploads/sprites/${spritename}.sprite3`);

            const archive = archiver('zip', {
                zlib: { level: 9 } // Compression level
            });

            output.on('close', () => {
                console.log('Archive created:', archive.pointer() + ' total bytes');
            });

            archive.on('warning', (err) => {
                if (err.code === 'ENOENT') {
                    console.warn('Stat warning:', err);
                } else {
                    throw err;
                }
            });

            archive.on('error', (err) => {
                throw err;
            });

            archive.pipe(output);

            const files = await fs.promises.readdir(outputDir);
            for (const file of files) {
                const filePath = `${outputDir}/${file}`;
                archive.file(filePath, { name: file });
            }

            archive.append(spriteData, { name: 'sprite.json' });
            await archive.finalize();

            const costumes = target.costumes;

            costumes.forEach(async (costume) => {
                const currentPath = `uploads/extracted/${costume.md5ext}`;
                const destinationPath = `uploads/images/${spritename}.svg`;

                if (path.extname(currentPath) === '.svg') {
                    await fs.promises.rename(currentPath, destinationPath);
                    return;
                } else {
                    console.log('Current path is not an SVG file. Skipping renaming.');
                }

            });
            
            console.log('File moved!');
        }

        // Clear the extract folder after creating the zip file
        await fsExtra.emptyDir(extractPath);
        console.log('Extract folder cleared');

        res.status(200).json({ message: 'File extracted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred during extraction' });
    }
});

app.get('/get_popular_sprite', (req, res) => {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    const svgDirectory = './uploads/images';

    // Read all SVG files in the directory
    fs.readdir(svgDirectory, (err, files) => {
        if (err) {
            console.error('Error reading SVG directory:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Get the size of each SVG file
        const svgFiles = files
            .filter(file => path.extname(file) === '.svg')
            .map(file => ({
                name: file,
                size: fs.statSync(path.join(svgDirectory, file)).size
            }))
            .sort((a, b) => b.size - a.size)
            .slice(0, 10);

        // Read the content of the largest 10 SVG files
        const svgData = svgFiles.map(file => {
            const filePath = path.join(svgDirectory, file.name);
            console.log(filePath);
            return fs.readFileSync(filePath, 'utf-8');
        });

        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(svgData.join(''));
    });
});


app.listen(PORT, () => {
    console.log("Server is running on", PORT)
})