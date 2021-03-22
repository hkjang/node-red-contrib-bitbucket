const {Bitbucket} = require("bitbucket");
const bitbucket = new Bitbucket()
module.exports = function (RED) {
    function FunctionNode(n) {
        RED.nodes.createNode(this, n);
        if (RED.nodes.getNode(n.creds)){
            this.baseUrl = RED.nodes.getNode(n.creds).credentials.baseUrl;
            this.username = RED.nodes.getNode(n.creds).credentials.username;
            this.password = RED.nodes.getNode(n.creds).credentials.password;
            this.token = RED.nodes.getNode(n.creds).credentials.token;
        } else {
            this.baseUrl = "";
            this.username = "";
            this.password = "";
            this.token = "";
        }
        var node = this;
        this.name = n.name;
        if(this.token === "" | typeof this.token === "undefined"){
            this.auth = {
                baseUrl: this.baseUrl,
                request: {
                    timeout: 10000,
                },
                auth: {
                    username: this.username,
                    password: this.password,
                },
            }

        }else{
            this.auth = {
                baseUrl: this.baseUrl,
                request: {
                    timeout: 10000,
                },
                auth: {
                    token: this.token
                },
            }
        }
        // node.error(this.auth);
        const bitbucket = new Bitbucket(this.auth);
        for (var key in n) {
            node[key] = n[key] || "";
        }
        this.on('input', function (msg) {
            for (var i in msg) {
                if (i !== 'req' | i !== 'res' | i !== 'payload' | i !== 'send' | i !== '_msgid') {
                    node[i] = node[i] || msg[i];
                }
            }
            bitbucket[node.namespace][node.api](node.params).then(response => {
                msg.payload = response.data;
                node.send(msg);
            }).catch((err) => {
                msg.payload = err;
                node.send(msg);
            });
        });
    }

    RED.nodes.registerType("bitbucket", FunctionNode, {
        credentials: {
            baseUrl: {type:"text"},
            username: {type:"text"},
            password: {type:"text"},
            token: {type:"text"}
        }
    });

    function bitbucketAuth(n){
        RED.nodes.createNode(this, n);
        this.baseUrl = n.baseUrl;
        this.username = n.username;
        this.password = n.password;
        this.token = n.token;
    }

    RED.nodes.registerType("bitbucketAuth", bitbucketAuth,{
        credentials: {
            baseUrl: {type:"text"},
            username: {type:"text"},
            password: {type:"text"},
            token: {type:"text"}
        }
    });
    
};
