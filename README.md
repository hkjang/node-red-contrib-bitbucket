node-red-contrib-bitbucket
================

Node-RED node for bitbucket



## Install

To install the stable version use the `Menu - Manage palette - Install`
option and search for node-red-contrib-bitbucket, or run the following
command in your Node-RED user directory, typically `~/.node-red`

    npm install node-red-contrib-bitbucket

## Wrapper bitbucket.js
- https://www.npmjs.com/package/bitbucket

## Sample msg parameter
```javascript
msg.namespace = 'repositories';
msg.api = 'listGlobal';
msg.params = {};
return msg;
```

### Notes:
- <namespace> is one of the Namespace Names
- <api> is one of the API Names

### Namespace Names
branching_model, branchrestrictions, commits, commitstatuses, deploy, deployments, downloads, hook_events, issue_tracker, pipelines, projects, pullrequests, refs, repositories, search, snippet, snippets, source, ssh, teams, user, users, webhooks

### API Names
Check API client docs: https://bitbucketjs.netlify.com

## Sample flows
```js
[{"id":"fdf93af.764acc8","type":"inject","z":"5a2fb3d3.3d0bac","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":110,"y":60,"wires":[["642bea3d.38b964"]]},{"id":"642bea3d.38b964","type":"function","z":"5a2fb3d3.3d0bac","name":"","func":"\n// msg.namespace = 'repositories';\n// msg.api = 'listGlobal';\nmsg.params = {};\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":280,"y":60,"wires":[["c649630d.9e35d"]]},{"id":"198f0ae5.dcfe15","type":"debug","z":"5a2fb3d3.3d0bac","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":630,"y":60,"wires":[]},{"id":"c649630d.9e35d","type":"bitbucket","z":"5a2fb3d3.3d0bac","name":"","namespace":"repositories","api":"listGlobal","creds":"9821486f.d12848","x":460,"y":60,"wires":[["198f0ae5.dcfe15"]]},{"id":"9821486f.d12848","type":"bitbucketAuth","z":"","name":"test"}]
```
