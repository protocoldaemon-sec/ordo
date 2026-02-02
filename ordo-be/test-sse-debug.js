// Debug SSE MCP implementation
const https = require('https');
const http = require('http');

const TEST_SERVERS = [
  {
    name: 'Fetch MCP Server',
    url: 'https://fetch-mcp-server-production-666.up.railway.app',
  },
  {
    name: 'Intel API MCP',
    url: 'https://intel-api.daemonprotocol.com',
  },
];

async function testSSEServer(serverConfig) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Testing: ${serverConfig.name}`);
  console.log(`URL: ${serverConfig.url}`);
  console.log('='.repeat(60));

  return new Promise((resolve) => {
    const url = new URL(`${serverConfig.url}/sse`);
    const protocol = url.protocol === 'https:' ? https : http;

    let sessionEndpoint = null;
    let buffer = '';
    let streamStartTime = Date.now();
    let dataReceivedCount = 0;
    let postSent = false;

    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: '/sse',
      method: 'GET',
      headers: {
        'Accept': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    };

    console.log('\n[1] Connecting to SSE endpoint...');
    const req = protocol.request(options, (res) => {
      console.log(`[2] Connected! Status: ${res.statusCode}`);
      
      if (res.statusCode !== 200) {
        console.error(`[ERROR] Bad status code: ${res.statusCode}`);
        req.destroy();
        resolve({ success: false, error: `Status ${res.statusCode}` });
        return;
      }

      res.setEncoding('utf8');

      res.on('data', (chunk) => {
        dataReceivedCount++;
        buffer += chunk;
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('event: ')) {
            const eventType = line.slice(7).trim();
            console.log(`[DATA] Event: ${eventType}`);
          } else if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data === '' || data === '[DONE]') continue;

            console.log(`[DATA] Received: ${data.substring(0, 100)}`);

            // Check for session endpoint
            if (data.startsWith('/message')) {
              if (!sessionEndpoint) {
                sessionEndpoint = data;
                console.log(`\n[3] ✓ Session established: ${sessionEndpoint}`);
                
                // Send POST request after session established
                setTimeout(() => {
                  sendPostRequest(serverConfig.url, sessionEndpoint);
                }, 100);
              }
            } else {
              // Try parse as JSON
              try {
                const parsed = JSON.parse(data);
                console.log(`\n[5] ✓✓✓ JSON RESPONSE RECEIVED:`, JSON.stringify(parsed, null, 2));
                
                if (parsed.result && parsed.result.tools) {
                  console.log(`\n[SUCCESS] Found ${parsed.result.tools.length} tools!`);
                  parsed.result.tools.forEach((tool, i) => {
                    console.log(`  ${i + 1}. ${tool.name}: ${tool.description}`);
                  });
                  
                  req.destroy();
                  resolve({ success: true, tools: parsed.result.tools });
                }
              } catch (e) {
                // Not JSON
              }
            }
          } else if (line.startsWith(': ')) {
            console.log(`[PING] ${line.substring(0, 50)}`);
          }
        }
      });

      res.on('end', () => {
        const duration = Date.now() - streamStartTime;
        console.log(`\n[STREAM END] Duration: ${duration}ms, Data chunks: ${dataReceivedCount}`);
        console.log(`[STREAM END] POST was sent: ${postSent}`);
        resolve({ success: false, error: 'Stream ended', duration, postSent });
      });

      res.on('error', (error) => {
        console.error(`[ERROR] Stream error:`, error.message);
        resolve({ success: false, error: error.message });
      });

      res.on('close', () => {
        console.log(`[STREAM CLOSE] Connection closed`);
      });
    });

    req.on('error', (error) => {
      console.error(`[ERROR] Request error:`, error.message);
      resolve({ success: false, error: error.message });
    });

    req.end();

    // Timeout after 45 seconds
    setTimeout(() => {
      console.log('\n[TIMEOUT] Test timeout after 45 seconds');
      req.destroy();
      resolve({ success: false, error: 'Timeout' });
    }, 45000);

    function sendPostRequest(baseUrl, sessionEndpoint) {
      console.log(`\n[4] Sending POST request...`);
      console.log(`    URL: ${baseUrl}${sessionEndpoint}`);
      
      postSent = true;
      const postUrl = new URL(`${baseUrl}${sessionEndpoint}`);
      const postProtocol = postUrl.protocol === 'https:' ? https : http;
      
      const requestId = Date.now();
      const body = JSON.stringify({
        jsonrpc: '2.0',
        method: 'tools/list',
        params: {},
        id: requestId,
      });

      console.log(`    Request ID: ${requestId}`);
      console.log(`    Body: ${body}`);

      const postOptions = {
        hostname: postUrl.hostname,
        port: postUrl.port || (postUrl.protocol === 'https:' ? 443 : 80),
        path: postUrl.pathname + postUrl.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
          'Connection': 'keep-alive',
        },
        agent: false, // Don't use agent pooling
      };

      const postReq = postProtocol.request(postOptions, (postRes) => {
        let postData = '';
        
        postRes.on('data', (chunk) => {
          postData += chunk;
        });

        postRes.on('end', () => {
          console.log(`    POST Response: ${postRes.statusCode} - ${postData}`);
          console.log(`    Now waiting for SSE response...`);
          console.log(`    SSE stream still alive: ${!res.destroyed}`);
        });
      });

      postReq.on('error', (error) => {
        console.error(`    POST Error:`, error.message);
      });

      postReq.write(body);
      postReq.end();
    }
  });
}

async function runTests() {
  console.log('\n' + '='.repeat(60));
  console.log('SSE MCP Server Debug Test');
  console.log('='.repeat(60));

  for (const server of TEST_SERVERS) {
    const result = await testSSEServer(server);
    
    console.log(`\n[RESULT] ${server.name}:`);
    console.log(`  Success: ${result.success}`);
    if (result.error) {
      console.log(`  Error: ${result.error}`);
    }
    if (result.tools) {
      console.log(`  Tools found: ${result.tools.length}`);
    }
    if (result.duration) {
      console.log(`  Duration: ${result.duration}ms`);
    }
    
    // Wait a bit between tests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('\n' + '='.repeat(60));
  console.log('All tests completed');
  console.log('='.repeat(60) + '\n');
}

runTests().catch(console.error);
