import { VapiClient, AssistantOptions, Assistant } from '../types/vapi';
import { elevenlabs } from './elevenlabs';
import { Voice } from '../types/elevenlabs';
import { n8nHttp } from './n8n-http';
import { VoiceOptions } from '../types/elevenlabs';

interface VapiConfig {
  baseUrl: string;
  apiKey: string;
}

const config: VapiConfig = {
  baseUrl: 'https://api.vapi.ai',
  apiKey: process.env.VAPI_API_KEY || ''
};

export class VapiError extends Error {
  constructor(message: string, public code?: string, public details?: any) {
    super(message);
    this.name = 'VapiError';
  }
}

async function makeRequest(method: string, path: string, data?: any): Promise<any> {
  const headers = {
    'Authorization': `Bearer ${config.apiKey}`,
    'Content-Type': 'application/json'
  };

  try {
    const response = await n8nHttp.request({
      method,
      url: `${config.baseUrl}${path}`,
      headers,
      body: data
    });

    if (response.statusCode >= 400) {
      throw new VapiError(
        `API Error (${response.statusCode}): ${response.body?.message || 'Unknown error'}`,
        `HTTP_${response.statusCode}`,
        response.body
      );
    }

    return response.body;
  } catch (error) {
    throw new VapiError(
      error instanceof Error ? error.message : 'Unknown error',
      'NETWORK_ERROR'
    );
  }
}

export const vapi: VapiClient = {
  async createAssistant(options: AssistantOptions): Promise<Assistant> {
    try {
      // Validate required fields
      if (!options.name) {
        throw new VapiError('Assistant name is required');
      }

      // Validate voice options if provided
      if (options.voice) {
        try {
          const voice = await elevenlabs.voices.get(options.voice.id);
          if (!voice) {
            throw new VapiError(`Invalid voice ID: ${options.voice.id}`);
          }
        } catch (error) {
          throw new VapiError(`Failed to validate voice: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }

      // Default options
      const defaultOptions = {
        firstMessageMode: 'assistant-speaks-first',
        maxCallDuration: 600, // 10 minutes
        voiceProvider: 'elevenlabs',
        model: {
          provider: 'openai',
          id: 'gpt-3.5-turbo',
          temperature: 0.7,
          maxTokens: 2000
        }
      };

      // Merge with provided options
      const finalOptions = { ...defaultOptions, ...options };

      // Make API call
      const data = await makeRequest('POST', '/assistants', {
        name: finalOptions.name,
        description: finalOptions.description,
        options: finalOptions
      });

      return data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async getAssistant(id: string): Promise<Assistant> {
    try {
      const data = await makeRequest('GET', `/assistants/${id}`);
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async updateAssistant(id: string, options: Partial<AssistantOptions>): Promise<Assistant> {
    try {
      const data = await makeRequest('PATCH', `/assistants/${id}`, { options });
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async deleteAssistant(id: string): Promise<void> {
    try {
      await makeRequest('DELETE', `/assistants/${id}`);
    } catch (error) {
      handleApiError(error);
    }
  },

  async listAssistants(): Promise<Assistant[]> {
    try {
      const data = await makeRequest('GET', `/assistants`);
      return data.assistants;
    } catch (error) {
      handleApiError(error);
    }
  }
};
