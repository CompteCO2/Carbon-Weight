const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
  const fileStream = fs.createReadStream("airports.csv");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let airportsMap = {};
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    console.log(`Line from file: ${line}`);
    data = line.split(",");
    airportsMap[data[2]] = {
      name: data[4],
      city: data[1],
      country: data[0],
      lat: parseFloat(data[5]),
      lon: parseFloat(data[6])
    };
  }

  fs.writeFile("airports.json", JSON.stringify(airportsMap, null, 2), err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File has been created");
  });
}

processLineByLine();
