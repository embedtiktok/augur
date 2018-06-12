import * as WebSocket from "ws";

const AUGUR_NODE_WS = process.env.AUGUR_NODE_WS || "ws://localhost:9001";

export async function augurNodeRequest(method: string, params: {}): Promise<any> {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(AUGUR_NODE_WS);
    const jsonId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    ws.on("open", () => {
      ws.send(JSON.stringify({
        id: jsonId,
        jsonrpc: "2.0",
        method,
        params,
      }));
    });
    ws.on("message", (response) => {
      const responseParsed = JSON.parse(response.toString());
      if (responseParsed.id !== jsonId) {
        return reject("Bad ID");
      }
      console.log(responseParsed.result);
      resolve(responseParsed.result);
      ws.close();
    });
  });
}
