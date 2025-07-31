import { Request } from 'n8n-workflow';

export const n8nHttp = {
  async request(options: Request): Promise<any> {
    const response = await Request.doRequest(options);
    return {
      statusCode: response.statusCode,
      headers: response.headers,
      body: response.body
    };
  }
};
