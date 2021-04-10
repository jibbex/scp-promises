import { spawn } from 'child_process';

export class Scp {
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

            const _proc = spawn('scp', ['-r', `-P ${this.port}`, source, dest]);

            _proc.on('message', (msg) => resolve(msg.toString()));
            _proc.on('error', (error) => reject(new Error(error.toString())));
            _proc.on('exit', (code) => resolve(code));
            _proc.stderr.on('data', (error) => reject(new Error(error.toString())));
            _proc.stdout.on('data', (data) => {               
                if (data.toString().includes('password:') && this.password !== undefined) {
                    this.proc.stdin.write(this.password);
                }
                else if (this.password === undefined) {
                    process.stdin.pipe(this.proc.stdin);
                }
            });            
        });
    }

    send({ path, file }) {
        return this.#proc(file, this.user !== undefined ? `${this.user}@${this.host}:${path}` : `${this.host}:${path}`);
    }

    get({ path, file }) {
        return this.#proc(this.user !== undefined ? `${this.user}@${this.host}:${path}` : `${this.host}:${path}`, file);
    }
}


export function CreateScpConnection(options) {
    return new Scp(options);
}
