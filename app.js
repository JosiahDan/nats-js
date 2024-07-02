// global.WebSocket = require("websocket").w3cwebsocket;
import { connect,StringCodec,nkeyAuthenticator, AckPolicy} from "nats";

const nkey = `SUAKYFU4THEYOG252XNYPIUAHUYHXL5OWJ3ZROBBMKPOONLJSRV3GDOK2E`
const sc = StringCodec();
// to create a connection to a nats-server:
const nc = await connect({ servers: "192.168.0.132:4222",authenticator:nkeyAuthenticator(sc.encode(nkey))});

// subscribe 
const subChat = nc.subscribe("web.im.chat.2");
(async () => {
  for await (const m of subChat) {
    console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
    nc.publish("web.im.read.1", { user_id: 2 });
  }
  console.log("subscription closed");
})();


// publish
nc.publish("web.im.chat.1", { from_user_id: 2,to_user_id: 1,msg:"hello"});
