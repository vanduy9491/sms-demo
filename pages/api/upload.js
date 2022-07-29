import { promises as fs } from 'fs'


export default async function handler(req, res) {
    if (req.method === 'POST') {
        
        const data_json = await fs.readFile('../alsok/temp/data.json', 'utf8');
        const result = await JSON.parse(data_json);
        result.files.forEach((i, index) => {
            // eslint-disable-next-line no-unused-expressions
            if (i.id == req.body.id) {
                i['status'] = req.body.status
            }

        })
       
        fs.writeFile('../alsok/temp/data.json', JSON.stringify(result), 'utf8');
    }
    res.status(200).json({ message: 'Successfully' });
}