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
const subChat = nc.subscribe("web.im.msg.SELF_USER_ID");
(async () => {
  for await (const m of subChat) {
    console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
  }
})();
```
### Publish Message to Nats Server  
Publish new message to target.  
新しい情報をターゲットに送信する。  
发送新的消息到目标。  
```javascript
// The JSON marshal method here is the official example of NATS, which can be changed according to your own writing habits.
// ここでの JSON シリアル化メソッドは公式の NATS 例であり、自分の記述習慣に応じて変更できます。
// 此处的JSON序列化方法为NATS官方示例，可根据自己的编写习惯更改。
payload = Payload(foo="bar", bar=27)
bytes_ = json.dumps(asdict(payload)).encode()

// Publish json message to target subject.
// 发布JSON数据到目标主题上。
// ターゲットのsubjectに送信します。  
nc.publish("web.im.msg.TARGET_USER_ID",bytes_)
```
***`SELF_USER_ID` and `TARGET_USER_ID` in the text need to be replaced with the actual ID during development***  
***文中`SELF_USER_ID`,`TARGET_USER_ID`在开发时需替换为实际ID。***  