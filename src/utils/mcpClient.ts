/**
 * MCP Client for React Bits Server
 * Connects to the React Bits component library for intelligent component recommendations
 */

export class MCPClient {
  private sseEndpoint = 'https://react-bits-mcp.davidhzdev.workers.dev/sse';
  private jsonRpcEndpoint = 'https://react-bits-mcp.davidhzdev.workers.dev/mcp';
  
  /**
   * Search for React components
   */
  async searchComponents(query: string) {
    try {
      const response = await fetch(this.jsonRpcEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/event-stream'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'tools/call',
          params: {
            name: 'search-components',
            arguments: {
              query
            }
          },
          id: Date.now()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error searching components:', error);
      return null;
    }
  }

  /**
   * Get component details
   */
  async getComponent(componentId: string) {
    try {
      const response = await fetch(this.jsonRpcEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/event-stream'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'tools/call',
          params: {
            name: 'get-component',
            arguments: {
              componentId
            }
          },
          id: Date.now()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error getting component:', error);
      return null;
    }
  }

  /**
   * Browse components by category
   */
  async browseCategory(category: string) {
    try {
      const response = await fetch(this.jsonRpcEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/event-stream'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'tools/call',
          params: {
            name: 'browse-category',
            arguments: {
              category
            }
          },
          id: Date.now()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error browsing category:', error);
      return null;
    }
  }

  /**
   * Get recommended components based on current project
   */
  async getRecommendations(context: string) {
    try {
      const response = await fetch(this.jsonRpcEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/event-stream'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'tools/call',
          params: {
            name: 'recommend-components',
            arguments: {
              context
            }
          },
          id: Date.now()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error getting recommendations:', error);
      return null;
    }
  }
}

// Export singleton instance
export const mcpClient = new MCPClient();