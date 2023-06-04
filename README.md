# scp-promises

A Node.js module for asynchronous SCP uploads and downloads. Inspired by [node-scp](https://github.com/ecto/node-scp), which is apparently no longer maintained.

## About

``CreateScpConnection`` returns an instance of ``Scp``. The ``Scp`` object has ``get`` and ``send`` methods which return promises. If no password was passed to the
the options object parameter of the called Constructor during initialization, the password prompt is piped to the terminal.

## Getting Started
> Run simply npm install or yarn add to install *scp-promises*


```
$ npm i scp-promises --save
```

***OR***

```
$ yarn add scp-promises
```

> Import the module
```javascript
import { CreateScpConnection } from 'scp-promise';
```

***OR***

> Require the package
```javascript
const { CreateScpConnection } = require('scp-promise');
```

> Connect, down- and upload as much as you like
```javascript
const scp = CreateScpConnection({host, user});
const sendMessage = await scp.send({ destination: `/home/${user}/testfile.md`, source: './README.md'});
const getMessage  = await scp.get({ source: `/home/${user}/testfile.md`, destination: './testfile.md'});
```

For a more detailed example, visit **[/example](https://github.com/jibbex/scp-promises/tree/master/)**.

## class Scp

> CreateScpConnection(options : @Object{})
> 
|property          | description                                                             |
|------------------|---------------------------------------------------------------------------|
| **host**     | URL or IP Address of the host                             |
| **user**         | Login Username                                                      |
| _password_  | _optional_             |
| _port_             | ***22*** _is default_                                                  | 

> send(options : @Object{})
> 
|property                 | description                                                               |
|-------------------------|---------------------------------------------------------------------------|
| **destination**              | The path to the remote file                            |
| **source**         | The local file                                                      |

> get(options : @Object{})
> 
|property          | description                                                               |
|------------------|---------------------------------------------------------------------------|
| **source**     | The path to the remote file                            |
| **destination**         | The local file                                                      |


**Fat** properties are required.
