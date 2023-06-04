export interface Connection {
	user: string;
	password: string | undefined;
	host: string;
	port: number | undefined;	
  }

export interface Scp {
	connection: Connection;
	chunks: Budder[];
	_exec: Promise;
	send: Promise;
	get: Promise;
}

export function CreateScpConnection(connection: Connection): Scp;