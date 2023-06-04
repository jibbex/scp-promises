const{ spawn } = require('child_process');

class Scp {
    constructor({ host, user, password, port }) {
        if (host === undefined || user === undefined)
            throw new Error(`Host and username are required.`);

        this.port = port || 22;
        this.host = host;
        this.user = user;
        this.password = password;
    }

    #proc(source, dest) {
        return new Promise((resolve, reject) => {
            if (source === undefined || dest === undefined)
                reject(new Error(`Source and destination are required.`));

            const buffer = [];
            const errBuf = [];
            const proc = spawn('scp', ['-r', `-P ${this.port}`, source, dest]);

            proc.on('message', msg => resolve(msg.toString()));
            proc.on('error', error => reject(new Error(error.toString())));
            proc.on('exit', code => code === 0 ? resolve(buffer.join('')) : reject(new Error(errBuf.join(''))));
            proc.stderr.on('data', error => errBuf.push(error.toString()));
            proc.stdout.on('data', data => { 
                buffer.push(data.toString());
                if (buffer.join('')?.includes('password:') && this.password !== undefined) {
                    this.proc.stdin.write(this.password);
                } else if (this.password === undefined) {
                    process.stdin.pipe(this.proc.stdin);
                }
            });   
        });
    }

    send({ destination, source }) {
        return this.#proc(source, this.user !== undefined ? `${this.user}@${this.host}:${destination}` : `${this.host}:${destination}`);
    }

    get({ source, destination }) {
        return this.#proc(this.user !== undefined ? `${this.user}@${this.host}:${source}` : `${this.host}:${source}`, destination);
    }
}


exports.CreateScpConnection = function(options) { return new Scp(options) };
exports.Scp = Scp;