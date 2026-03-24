#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 日志文件
const logFile = __dirname + '/mcp-communication.log';

// 清空日志文件
fs.writeFileSync(logFile, '=== MCP 真实通讯记录 ===\n\n');

// 记录函数
function log(type, title, data) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${type}: ${title}\n${JSON.stringify(data, null, 2)}\n\n`;
  fs.appendFileSync(logFile, logEntry);
  console.log(logEntry);
}

// MCP 客户端类
class MCPClient {
  constructor(serverProcess) {
    this.server = serverProcess;
    this.requestId = 1;
    this.pendingRequests = new Map();
    this.initialized = false;

    // 处理服务器响应
    this.server.stdout.on('data', data => {
      const lines = data
        .toString()
        .split('\n')
        .filter(l => l.trim());
      for (const line of lines) {
        try {
          const response = JSON.parse(line);
          this.handleResponse(response);
        } catch (e) {
          // 非 JSON 输出
        }
      }
    });

    this.server.stderr.on('data', data => {
      const msg = data.toString().trim();
      if (msg) {
        log('--- 服务器日志', 'stderr', { message: msg });
      }
    });
  }

  // 发送请求
  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const request = {
        jsonrpc: '2.0',
        id: this.requestId++,
        method,
        params
      };

      log('>>> 请求 (Claude Code → MCP)', method, request);

      // 存储 promise 以便后续解析
      this.pendingRequests.set(request.id, { resolve, reject });

      this.server.stdin.write(JSON.stringify(request) + '\n');
    });
  }

  // 处理响应
  handleResponse(response) {
    log('<<< 响应 (MCP → Claude Code)', `ID: ${response.id}`, response);

    const pending = this.pendingRequests.get(response.id);
    if (pending) {
      this.pendingRequests.delete(response.id);
      if (response.error) {
        pending.reject(new Error(response.error.message));
      } else {
        pending.resolve(response.result);
      }
    }
  }

  // 等待
  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// 获取命令行参数
const city = process.argv[2] || '上海';

// 主函数
async function main() {
  console.log(`=== 开始 MCP 真实通讯测试 (查询: ${city}) ===\n`);

  // 启动 MCP Server
  const server = spawn('node', ['index.js'], {
    cwd: __dirname,
    stdio: ['pipe', 'pipe', 'pipe']
  });

  const client = new MCPClient(server);

  try {
    // 步骤 1: 初始化
    console.log('【步骤 1】初始化连接...');
    const initResult = await client.send('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'claude-code', version: '1.0.0' }
    });
    console.log('初始化成功:', initResult.serverInfo);

    await client.wait(100);

    // 步骤 2: 列出工具
    console.log('\n【步骤 2】列出可用工具...');
    const toolsResult = await client.send('tools/list', {});
    console.log('可用工具:');
    toolsResult.tools.forEach(tool => {
      console.log(`  - ${tool.name}: ${tool.description}`);
    });

    await client.wait(100);

    // 步骤 3: 调用工具
    console.log(`\n【步骤 3】调用 get_weather 查询 ${city} 天气...`);
    const weatherResult = await client.send('tools/call', {
      name: 'get_weather',
      arguments: { city }
    });

    // 解析天气结果
    const weatherData = JSON.parse(weatherResult.content[0].text);
    console.log('\n天气数据:');
    console.log(`  城市: ${weatherData.city}`);
    console.log(`  天气: ${weatherData.weather}`);
    console.log(`  温度: ${weatherData.temperature}°C`);
    console.log(`  湿度: ${weatherData.humidity}%`);
    console.log(`  风速: ${weatherData.windSpeed} km/h`);

    console.log('\n=== 通讯完成 ===');
    console.log(`\n完整通讯记录已保存至: ${logFile}`);
  } catch (error) {
    console.error('错误:', error.message);
  } finally {
    server.kill();
    process.exit(0);
  }
}

main();
