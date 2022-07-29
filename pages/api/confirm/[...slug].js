import { promises as fs } from 'fs';
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

function removeItemOnce(arr, value) {
    var index = arr.files.map(o => o.id).indexOf(value);
    if (index > -1) {
      arr.files.splice(index, 1);
    }
    return arr;
  }

export default async function handler (req, res) {
    const { slug } = req.query
    const now = moment(new Date()).format('YYYYMMDD Hmmss');
  
    try {

        const data_json = await fs.readFile('../alsok/temp/data.json','utf8');
        var jsonData = JSON.parse(data_json);
        const found = jsonData.files.find(element => element.id == slug[0]);
        const updateFile = new fileDTO(found.id, found.name , found.path, found.createUser, found.createTime, slug[1], now);

        jsonData = removeItemOnce(jsonData, found.id);
        jsonData.files.push(updateFile);

        await fs.writeFile('../alsok/temp/data.json', JSON.stringify(jsonData), 'utf8');
        res.status(200).json({ message: 'Successfully Confirmed !!!!!!!!'});
    } catch (error) {
        console.log("error " + error);
        res.status(500).json({ message: error.message });
        return;
    }
};