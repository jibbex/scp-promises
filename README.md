# scp-promises

A Node.js module for asynchronous scp uploads and downloads. Inspired by [node-scp](https://github.com/ecto/node-scp), which is apparently no longer maintained.

## About

``CreateScpConnection`` returns an instance of ``Scp``. The ``Scp`` object has ``get`` and ``send`` methods which return promises. If no password is passed to the options object during initialization, the password prompt is piped to the console.

## Getting Started
> Run simply npm install or yarn add to install *scp-promises*


```
$ npm i scp-promises --save
```

***OR***

```
$ yarn add scp-promises
```

```javascript
import { CreateScpConnection }  from 'scp-promises'

(async () => {
    try {
        const scp = CreateScpConnection({host: 'michm.de', user: 'jibblez'});

        await scp.send({path: '/home/jibblez/TESTFILE.dat', file: './README.md'});
        await scp.get({path: '/home/jibblez/TESTFILE.dat', file: './1233213.md'})
    }
    catch(error) {
        console.error(error);
    }
})();
```

## ``Class Scp``

> CreateScpConnection(options : @Object{})
> 
|property          | description                                                             |
|------------------|---------------------------------------------------------------------------|
| **host**     | URL or IP Address of the host                             |
| **user**         | Login Username                                                      |
| *password*  | Only neccessary if needed for login              |
| port             | *22* is default                                                  | 

> send(options : @Object{})
> 
|property          | description                                                               |
|------------------|---------------------------------------------------------------------------|
| **path**     | The path to the remote file                            |
| **file**         | The local file                                                      |

> get(options : @Object{})
> 
|property          | description                                                               |
|------------------|---------------------------------------------------------------------------|
| **path**     | The path to the remote file                            |
| **file**         | The local file                                                      |


***Fat*** *properties are required.*
