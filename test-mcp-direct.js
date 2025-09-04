#!/usr/bin/env node

console.log('Testing direct connection to React Bits MCP Server...\n');

// Test the JSON-RPC endpoint
async function testMCPServer() {
  try {
    // Try to get available tools from the MCP server
    const response = await fetch('https://react-bits-mcp.davidhzdev.workers.dev/mcp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'tools/list',
        params: {},
        id: 1
      })
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      const text = await response.text();
      console.error('Response:', text);
      return;
    }

    const data = await response.json();
    console.log('✅ MCP Server responded successfully!\n');
    console.log('Available tools:', JSON.stringify(data, null, 2));

    // Try to search for a component
    console.log('\nTrying to search for button components...');
    const searchResponse = await fetch('https://react-bits-mcp.davidhzdev.workers.dev/mcp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'tools/call',
        params: {
          name: 'search-components',
          arguments: {
            query: 'button'
          }
        },
        id: 2
      })
    });

    if (searchResponse.ok) {
      const searchData = await searchResponse.json();
      console.log('Search results:', JSON.stringify(searchData, null, 2));
    }

  } catch (error) {
    console.error('❌ Error connecting to MCP server:', error);
  }
}

testMCPServer();