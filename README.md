# nats-js
## Nats Usage
### IM Systeam Logic
![image](./Untitled%20Workspace.png)
1. subscribe chat message  
* subject: `web.im.msg.SELF_USER_ID`  
订阅聊天信息(websocket长连接)，用于接收聊天信息。  
2. subscribe read signal  
* subject: `web.im.read.SELF_USER_ID`  
订阅已读信号(websocket长连接)，用于接收已读信号。  
3. publish chat message  
* subject: `web.im.msg.TARGET_USER_ID`  
发送聊天内容。  
4. publish read signal  
* subject: `web.im.msg.TARGET_USER_ID`  
发送已读信号。  
### Connect Nats server
Use JavaScript to connect nats server.  
JavaScriptでNATSサーバーに接続します。  
JavaScript连接Nats服务器。  
```javascript
import { connect,StringCodec,nkeyAuthenticator} from "nats";
// test nkey
// テストnkey
// 测试nkey
const nkey = `testnkey`
const sc = StringCodec();
// to create a connection to a nats-server
// NATSサーバーへの接続を作成する
// 创建NATS服务器连接
const nc = await connect(
    {
        // server's address 
        // サーバーアドレス
        // 服务器地址
        servers: "192.168.0.132:4222",
        // use nkey to verify the client
        // nkeyを使用してクライアントを検証します
        // 使用nkey验证客户端连接
        authenticator:nkeyAuthenticator(sc.encode(nkey))
    }
);
```
### Subscribe Message From Nats Server
Use JavaScript to subscribe new message from nats server.  
NatsサーバーからJavaScriptで新しいメッセージを購読します。  
使用JavaScript从NatsServer订阅新的消息。
```javascript
// subscribe new message by subject
// subjectで新しいメッセージを購読する
// 通过不同的主题订阅消息
const subChat = nc.subscribe("subject");
(async () => {
  for await (const m of subChat) {
    console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
  }
})();
```
