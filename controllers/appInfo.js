const fs = require('fs');




module.exports = {


    getTitle: (req, res) => {

        try {
            fs.readFile('./appInfo.json', 'utf8', function (err, data) {
                if (err) throw err;
                const info = JSON.parse(data);
                return res.status(200).json({ title: info.title });
            });
        }
        catch (error) {
            return res.status(500).json({ error });


        }
    },
    setTitle: (req, res) => {

        try {

            const { title } = req.body;

            fs.writeFile('./appInfo.json', JSON.stringify({title}), { flag: 'w' }, function (err) {
                if (err) throw err;
                return res.status(200).json({ title });
            });

        }
        catch (error) {
            return res.status(500).json({ error });


        }
    }


}