// create a node.js application to create and raise an event to calculate the salary of an exployee. Consider the components as Basic Pay(BP), House Rent Allowance(HRA) and Dearness Allowance(DA), Use event emitter class to solve this...take basic pay , house rent allowance and dearness allowance from user in webpage. show this all on local host 3000


const EventEmitter = require('eventemitter3');
const http = require('http');
const fs = require('fs');
const url = require('url');

const emitter = new EventEmitter();


const calculateSalary = (basicPay, hra, da) => {
    const salary = basicPay + hra + da;
    console.log(`Salary: ${salary}`);
}


emitter.on('calculateSalary', calculateSalary);


const server = http.createServer((req, res) => {
    const pathName = url.parse(req.url, true).pathname;
    const query = url.parse(req.url, true).query;

    
    if (pathName === '/') {
        const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Calculate Salary</title>
        </head>
        <body>
          <h1>Calculate Salary</h1>
          <form action="/submit" method="get">
            <label for="basicPay">Basic Pay:</label>
            <input type="text" id="basicPay" name="basicPay" /><br />
            <label for="hra">House Rent Allowance:</label>
            <input type="text" id="hra" name="hra" /><br />
            <label for="da">Dearness Allowance:</label>
            <input type="text" id="da" name="da" /><br />
            <input type="submit" value="Calculate Salary" />
          </form>
        </body>
      </html>
    `;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        res.end();
    }

    
    else if (pathName === '/submit') {
        const basicPay = parseInt(query.basicPay);
        const hra = parseInt(query.hra);
        const da = parseInt(query.da);
        emitter.emit('calculateSalary', basicPay, hra, da);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('Salary calculated. Check the console for output.');
        res.end();
    }

    
    else {
        res.writeHead(404);
        res.write('Page not found');
        res.end();
    }
});


server.listen(3000, () => {
    console.log('Server started on port 3000');
});
