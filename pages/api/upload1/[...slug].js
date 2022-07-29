import { IncomingForm } from 'formidable'
import { promises as fs } from 'fs'
import getConfig from 'next/config'
import path from 'path';
import moment from 'moment';

// first we need to disable the default body parser
export const config = {
    api: {
        bodyParser: false,
    }
};

function fileDTO(id, name, path, createUser, createTime, confirmUser, confirmTime) {
    return {
        "id": id,
        "name": name,
        "path": path,
        "createUser": createUser,
        "createTime": createTime,
        "confirmUser": confirmUser,
        "confirmTime": confirmTime
    }
}

export default async function handler (req, res) {
    const now = moment(new Date()).format('YYYYMMDD Hmmss');
    const { slug } = req.query
    if (req.method === 'POST') {
        // parse form with a Promise wrapper
        const data = await new Promise((resolve, reject) => {
            const form = new IncomingForm();
            form.parse(req, (err, fields, files) => {
                if (err) return reject(err);
                resolve({ fields, files });
            });
        });
        

        const data_json = await fs.readFile('../alsok/temp/data.json','utf8');
        const jsonData = JSON.parse(data_json);
        const maxId = Math.max(...jsonData.files.map(o => o.id));

        try {
            // Delete all image files in directory public/temuploadimage
            const directory = await path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, "public\\img");
            const imageFile = data.files.file;
            const imagePath = imageFile.filepath;
            const fileName = data.files.file.originalFilename;
            const pathToWriteImage = directory + '/' + fileName;

            const image = await fs.readFile(imagePath);
            await fs.writeFile(pathToWriteImage, image);

            const newFile = new fileDTO(maxId + 1, fileName , "/img/" + fileName, slug[0], now, "", "");
            jsonData.files.push(newFile);
            await fs.writeFile('../alsok/temp/data.json', JSON.stringify(jsonData), 'utf8');

            res.status(200).json({ message: 'Successfully Uploaded !!!!!!!!'});
        } catch (error) {
            console.log("error " + error);
            res.status(500).json({ message: error.message });
            return;
        }
    };
};