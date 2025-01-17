export interface Config {
  key: string
  baseUrl: string
  model: string
  systemRole: string
  max_tokens: number
  temperature: number
  stream: boolean

}
export interface apiConfig {
  api: string
}

// 开发环境配置
export const developmentConfig: apiConfig = {
  api: 'http://127.0.0.1:80',
};

// 生产环境配置
export const productionConfig: apiConfig = {
  api: 'https://homeworkgenius1990.club:80',
};

// 根据环境选择配置
let config: apiConfig;

if (import.meta.env.MODE === 'development') {
  config = developmentConfig;
} else {
  config = productionConfig;
}

export default config;
