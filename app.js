// global.WebSocket = require("websocket").w3cwebsocket;
import { connect,StringCodec,nkeyAuthenticator, AckPolicy} from "nats";

const nkey = `SUAKYFU4THEYOG252XNYPIUAHUYHXL5OWJ3ZROBBMKPOONLJSRV3GDOK2E`
const sc = StringCodec();
// to create a connection to a nats-server:
const nc = await connect({ servers: "localhost:4222",authenticator:nkeyAuthenticator(sc.encode(nkey))});

const jsm = await nc.jetstreamManager();
await jsm.consumers.add("IMStream",{
    durable_name:"A",
    ack_policy: AckPolicy.Explicit,
    filter_subject: "IMTEST.app.A"
})
// nc.publish("IMTEST.app.B", sc.encode("world"));

const js = nc.jetstream()
const c = await js.consumers.get("IMStream", "A");
const messages = await c.consume();
for await (const m of messages) {
  console.log(m.string());
  m.ack();
}
await nc.drain();