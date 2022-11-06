import fs from "fs";

function saveFile(saved: any) {
    let myd = JSON.stringify(saved);
    fs.writeFile("./database/database.json", myd, "utf8", (err) => {
      if (err) throw err;
      console.log("file has been written");
    });
  }

  export default saveFile;