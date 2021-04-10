const { CreateScpConnection } = require('../lib/scp-promises.js');

(async () => {
    try {
        const scp = CreateScpConnection({host: 'michm.de', user: 'root'});
        const sres = await scp.send({ path: '/home/mm/TESTFILE.dat', file: './README.md'});
        const gres = await scp.get({ path: '/home/mm/TESTFILE.dat', file: './1233213.md'})

        console.log(`${sres}\n${gres}`);
    }
    catch(error) {
        console.error(error);
    }
})();