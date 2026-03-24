import * as z from 'zod/v4';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// 城市坐标映射
const CITIES = {
  上海: { lat: 31.2304, lng: 121.4737 },
  北京: { lat: 39.9042, lng: 116.4074 },
  广州: { lat: 23.1291, lng: 113.2644 },
  深圳: { lat: 22.5431, lng: 114.0579 },
  杭州: { lat: 30.2741, lng: 120.1551 },
  成都: { lat: 30.5728, lng: 104.0668 },
  武汉: { lat: 30.5928, lng: 114.3055 },
  西安: { lat: 34.3416, lng: 108.9398 },
  南京: { lat: 32.0603, lng: 118.7969 },
  重庆: { lat: 29.4316, lng: 106.9123 }
};

// 获取天气数据
async function getWeather(city) {
  let coords = CITIES[city];
  if (!coords) {
    // 尝试用城市名查询坐标
    const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=zh&format=json`;
    const geoRes = await fetch(geocodeUrl);
    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error(`未找到城市: ${city}`);
    }
    coords = { lat: geoData.results[0].latitude, lng: geoData.results[0].longitude };
  }
  console.log(coords);
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Asia/Shanghai`;

  const res = await fetch(url);
  const data = await res.json();

  const current = data.current;
  const weatherCode = current.weather_code;

  const weatherMap = {
    0: '晴',
    1: '晴间多云',
    2: '多云',
    3: '阴',
    45: '雾',
    48: '雾凇',
    51: '小毛毛雨',
    53: '中毛毛雨',
    55: '大毛毛雨',
    61: '小雨',
    63: '中雨',
    65: '大雨',
    71: '小雪',
    73: '中雪',
    75: '大雪',
    77: '雪粒',
    80: '小阵雨',
    81: '中阵雨',
    82: '大阵雨',
    85: '小阵雪',
    86: '大阵雪',
    95: '雷暴',
    96: '雷暴伴冰雹',
    99: '雷暴大冰雹'
  };

  return {
    city: city,
    temperature: current.temperature_2m,
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m,
    weather: weatherMap[weatherCode] || '未知'
  };
}

const server = new McpServer({
  name: 'weather-mcp',
  version: '1.0.0'
});

server.registerTool(
  'get_weather',
  {
    title: '获取天气',
    description: '获取指定城市的当前天气信息',
    inputSchema: {
      city: z.string().describe('城市名称，如：上海、北京、广州等')
    }
  },
  async ({ city }) => {
    try {
      const weather = await getWeather(city);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(weather, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `获取天气失败: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }
);

server.registerTool(
  'get_supported_cities',
  {
    title: '获取支持的城市',
    description: '获取支持的城市列表',
    inputSchema: {}
  },
  async () => {
    return {
      content: [
        {
          type: 'text',
          text: '支持的城市: ' + Object.keys(CITIES).join('、') + '（也支持其他中国城市）'
        }
      ]
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();

  await server.connect(transport);

  console.error('Weather MCP Server running on stdio');
}

main().catch(error => {
  console.error('Server error:', error);
  process.exit(1);
});
