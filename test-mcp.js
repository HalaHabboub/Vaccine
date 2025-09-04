#!/usr/bin/env node

import { spawn } from 'child_process';

console.log('Testing MCP Server connection for React Bits...\n');

const mcp = spawn('npx', [
  '-y',
  '@modelcontextprotocol/server-sse-client',
  'https://react-bits-mcp.davidhzdev.workers.dev/sse'
], {
  stdio: 'pipe'
});

let output = '';
let errorOutput = '';

mcp.stdout.on('data', (data) => {
  output += data.toString();
  console.log('Response:', data.toString());
});

mcp.stderr.on('data', (data) => {
  errorOutput += data.toString();
  console.error('Error:', data.toString());
});

mcp.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ MCP Server connection successful!');
  } else {
    console.log(`\n❌ MCP Server connection failed with code ${code}`);
  }
  
  if (output) {
    console.log('\nServer Output:', output);
  }
  
  if (errorOutput) {
    console.log('\nError Output:', errorOutput);
  }
});

// Send a test request after connection
setTimeout(() => {
  mcp.stdin.write(JSON.stringify({
    jsonrpc: '2.0',
    method: 'tools/list',
    id: 1
  }) + '\n');
}, 1000);

// Close connection after 5 seconds
setTimeout(() => {
  mcp.kill();
}, 5000);