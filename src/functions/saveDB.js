const fs = require('fs');
module.exports = (client, Promise) => {
    saveDB = async function(){
        return new Promise((resolve, reject) => {
            fs.writeFile(`../json/database.json`, JSON.stringify(client.config, null, 4), function(err){
                resolve("Saved database.json!");
                if (err) reject(err);
            });
        });
    }
    return saveDB();
}