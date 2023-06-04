const { CreateScpConnection } = require('../lib/scp.cjs');

const urlPattern = /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
const ipPattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
const host = process.argv.pop();
const user = process.argv.pop();
const is_valid = { host: false, user: false };

function printUsage() {
    console.error(`\n  usage: node . [username] [host]`);
    console.error(`     or: npm start -- [username] [host]`);
    process.exit(1);
}

async function testScp() {
    try {
        const scp = CreateScpConnection({host, user});
        const sendMsg = scp.send({ destination: `/home/${user}/testfile.md`, source: './README.md'});
        const getMsg =  scp.get({ source: `/home/${user}/testfile.md`, destination: './testfile.md'});
        const responses = await Promise.all([getMsg, sendMsg]);

        if (responses[0] || responses[1]) {
            console.log(sendMsg, getMsg);
        }
    } catch(error) {
        console.error(error.message);
    }
}

if ((is_valid.host = urlPattern.test(host) || ipPattern.test(host)) 
&& (is_valid.user = (typeof user === 'string' && user.length > 0))) {
    testScp();
} else {
    let msg = !is_valid.host && `The hostname "${host}" is not a valid domain neither a valid IP address.\n`;
    msg = !is_valid.user ? `${msg} The provided username is not valid.\n` : msg; 

    console.error(msg);
    printUsage();
}