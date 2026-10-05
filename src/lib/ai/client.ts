import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import type { z } from "zod";
import { env } from "@/lib/env";
import { log } from "@/lib/integrations/logger";

let client: Anthropic | null = null;

export function aiEnabled(): boolean {
  return Boolean(env.anthropicApiKey);
}

function getClient(): Anthropic {
  client ??= new Anthropic({ apiKey: env.anthropicApiKey, timeout: 30_000, maxRetries: 1 });
  return client;
}

export class AiUnavailableError extends Error {}

/**
 * One structured-output call. Website features are short, latency-sensitive
 * extractions, so effort is "low". Server-side fallbacks are on so a safety
 * decline is re-run on Anthropic's recommended fallback model.
 * Prompt/outputs are logged as sizes only — never content (PII guardrail).
 */
export async function generateStructured<S extends z.ZodType>(opts: {
  feature: string;
  system: string;
  prompt: string;
  schema: S;
  maxTokens?: number;
}): Promise<z.infer<S>> {
  if (!aiEnabled()) throw new AiUnavailableError("AI is not configured");
  const started = Date.now();
  try {
    const response = await getClient().beta.messages.parse({
      model: env.anthropicModel,
      max_tokens: opts.maxTokens ?? 4000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: opts.system,
      messages: [{ role: "user", content: opts.prompt }],
      output_config: { effort: "low", format: betaZodOutputFormat(opts.schema) },
    });

    log("info", "ai.call", {
      feature: opts.feature,
      model: response.model,
      ms: Date.now() - started,
      stop: response.stop_reason,
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
    });

    if (response.stop_reason === "refusal") throw new AiUnavailableError("Request declined");
    if (response.stop_reason === "max_tokens") throw new AiUnavailableError("Response truncated");
    if (!response.parsed_output) throw new AiUnavailableError("Unparseable response");
    return response.parsed_output as z.infer<S>;
  } catch (err) {
    if (err instanceof AiUnavailableError) throw err;
    if (err instanceof Anthropic.RateLimitError) {
      log("warn", "ai.rate_limited", { feature: opts.feature });
    } else if (err instanceof Anthropic.APIError) {
      log("error", "ai.api_error", { feature: opts.feature, status: err.status });
    } else {
      log("error", "ai.error", { feature: opts.feature, message: (err as Error).message });
    }
    throw new AiUnavailableError("AI call failed");
  }
}
