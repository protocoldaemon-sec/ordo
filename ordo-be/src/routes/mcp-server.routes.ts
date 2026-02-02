import { Router, Request, Response } from 'express';
import { mcpServerService } from '../services/mcp-server.service';
import logger from '../config/logger';

const router = Router();

// Public endpoint: Get all enabled MCP servers (without sensitive data)
router.get('/', async (_req: Request, res: Response) => {
  try {
    const servers = await mcpServerService.getAllPublic();

    res.json({
      success: true,
      data: servers,
      count: servers.length,
    });
  } catch (error: any) {
    logger.error('Error in GET /mcp-servers', { error });
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to retrieve MCP servers',
    });
  }
});

export default router;
