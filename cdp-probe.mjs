// CDP client via built-in WebSocket (Node 22+)
// Usage: node cdp-probe.mjs <pageId> <action> [args]
const [, , pageId, action, ...args] = process.argv;
if (!pageId || !action) {
  console.error('Usage: node cdp-probe.mjs <pageId> <getText|screenshot|eval> [jsExpr]');
  process.exit(1);
}

const ws = new WebSocket(`ws://localhost:9222/devtools/page/${pageId}`);
let msgId = 0;
const pending = new Map();

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++msgId;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}

ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(new Error(JSON.stringify(msg.error)));
    else resolve(msg.result);
  }
});

ws.addEventListener('open', async () => {
  try {
    if (action === 'eval') {
      const expr = args.join(' ');
      const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
      console.log(JSON.stringify(r.result?.value ?? r.result, null, 2));
    } else if (action === 'getText') {
      const r = await send('Runtime.evaluate', {
        expression: 'document.body.innerText',
        returnByValue: true,
      });
      console.log(r.result?.value);
    } else if (action === 'screenshot') {
      const outPath = args[0] || 'screenshot.png';
      const r = await send('Page.captureScreenshot', { format: 'png' });
      const fs = await import('node:fs');
      fs.writeFileSync(outPath, Buffer.from(r.data, 'base64'));
      console.log(`Saved to ${outPath}`);
    }
  } catch (e) {
    console.error('ERROR:', e.message);
    process.exitCode = 1;
  } finally {
    ws.close();
  }
});

ws.addEventListener('error', (e) => {
  console.error('WS error:', e.message || e);
  process.exitCode = 1;
});
