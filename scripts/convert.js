const fs = require("fs");
const path = require("path");
const readline = require("readline");

async function convert() {
  const inputFile = process.argv[2];
  const fileStream = fs.createReadStream(inputFile);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const questions = [];
  const fields = ["question", "answer", "difficulty"];
  let currentQuestion = {};
  let currentField = 0;
  for await (const line of rl) {
    if (line === "") {
      continue;
    }
    const field = fields[currentField];
    let fieldDone = false;
    switch (field) {
      case "question": {
        currentQuestion[field] = line;
        fieldDone = line.endsWith("?");
        break;
      }
      case "answer": {
        if (currentQuestion[field] === undefined) {
          currentQuestion[field] = [];
        }
        currentQuestion[field].push(line);
        fieldDone = currentQuestion[field].length === 4;
        break;
      }
      case "difficulty": {
        currentQuestion[field] = parseInt(line);
        fieldDone = true;
        break;
      }
    }
    if (fieldDone) {
      currentField++;
    }
    if (currentField >= fields.length) {
      questions.push(currentQuestion);
      currentQuestion = {};
      currentField = 0;
    }
  }

  const outputFile = path.basename(inputFile).split(".")[0] + ".json";
  fs.writeFileSync(outputFile, JSON.stringify(questions, null, 1));
}

convert();
