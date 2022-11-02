import fs from "fs";
export function saveFile(saved: any) {
  let myd = JSON.stringify(saved);
  fs.writeFile("./database.json", myd, "utf8", (err) => {
    if (err) throw err;
    console.log("file has been written");
  });
}

export function delete_movie(incomingId: any) {
  //const { id } = JSON.parse(incomingId.toString());
  // saveFile('1')
}

export function add_movie(chunk: any) {
  //saveFile('data');
}

export function update_movie() {}
