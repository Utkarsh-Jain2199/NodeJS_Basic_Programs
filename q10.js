const fs = require('fs');

// create a writable stream with sample.txt file
const writeStream = fs.createWriteStream('q10.txt');

// find prime numbers up to 100
for (let i = 2; i <= 100; i++) {
  let flag = true;
  for (let j = 2; j <= Math.sqrt(i); j++) {
    if (i % j === 0) {
      flag = false;
      break;
    }
  }
  if (flag) {
    // write prime number to sample.txt file
    writeStream.write(`${i}\n`);
  }
}

// end writable stream and display message in console window
writeStream.end(() => console.log("Task Completed"));
