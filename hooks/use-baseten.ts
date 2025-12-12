import { useState, useCallback } from 'react';

export interface BasetenOptions {
  model?: string;
  stream?: boolean;
  stream_options?: {
    include_usage?: boolean;
    continuous_usage_stats?: boolean;
  };
  top_p?: number;
  max_tokens?: number;
  temperature?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
}

export interface BasetenMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface UseBasetenReturn {
  generate: (
    messages: BasetenMessage[],
    options?: BasetenOptions,
    onChunk?: (content: string) => void
  ) => Promise<string>;
  loading: boolean;
  error: string | null;
  reset: () => void;
}

export function useBaseten(): UseBasetenReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(
    async (
      messages: BasetenMessage[],
      options: BasetenOptions = {},
      onChunk?: (content: string) => void
    ): Promise<string> => {
      setLoading(true);
      setError(null);

      try {
        const {
          model = 'openai/gpt-oss-120b',
          stream = true,
          stream_options = {
            include_usage: true,
            continuous_usage_stats: true,
          },
          top_p = 1,
          max_tokens = 10000, // Limite Baseten: 3000 tokens max
          temperature = 1,
          presence_penalty = 0,
          frequency_penalty = 0,
        } = options;

        const response = await fetch('/api/baseten/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages,
            model,
            stream,
            stream_options,
            top_p,
            max_tokens,
            temperature,
            presence_penalty,
            frequency_penalty,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to generate content');
        }

        if (stream) {
          const reader = response.body?.getReader();
          const decoder = new TextDecoder();
          let fullContent = '';

          if (!reader) {
            throw new Error('No response body');
          }

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const data = JSON.parse(line.slice(6));
                  if (data.content) {
                    fullContent += data.content;
                    onChunk?.(data.content);
                  }
                } catch (e) {
                  // Ignorer les erreurs de parsing
                }
              }
            }
          }

          return fullContent;
        } else {
          const data = await response.json();
          return data.choices[0]?.message?.content || '';
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setError(null);
    setLoading(false);
  }, []);

  return {
    generate,
    loading,
    error,
    reset,
  };
}

