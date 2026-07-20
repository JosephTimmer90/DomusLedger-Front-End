import { useBoundStore } from "./store";

export class ApiRequestError extends Error {
  status: number;
  statusText: string;
  url: string;
  body: unknown;

  constructor(
    message: string,
    options: { status: number; statusText: string; url: string; body: unknown },
  ) {
    super(message);
    this.name = "ApiRequestError";
    this.status = options.status;
    this.statusText = options.statusText;
    this.url = options.url;
    this.body = options.body;
  }
}

type ApiRequestOptions = Omit<RequestInit, "body" | "headers"> & {
  body?: unknown;
  headers?: HeadersInit;
};

function isJsonLike(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function unwrapEnvelope<T>(body: unknown): T {
  if (isJsonLike(body)) {
    if ("data" in body) {
      return body.data as T;
    }

    if ("result" in body) {
      return body.result as T;
    }

    if ("payload" in body) {
      return body.payload as T;
    }
  }

  return body as T;
}

function toRequestBody(body: unknown): BodyInit | undefined {
  if (body === undefined) {
    return undefined;
  }

  if (
    body instanceof FormData ||
    body instanceof URLSearchParams ||
    body instanceof Blob ||
    body instanceof ArrayBuffer ||
    ArrayBuffer.isView(body)
  ) {
    return body as BodyInit;
  }

  if (typeof body === "string") {
    return body;
  }

  return JSON.stringify(body);
}

async function parseResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();

  if (text.length === 0) {
    return null;
  }

  return text;
}

export async function apiRequest<T>(
  input: RequestInfo | URL,
  options: ApiRequestOptions = {},
): Promise<T> {
  const accessToken = useBoundStore.getState().accessToken;
  const headers = new Headers(options.headers);

  if (accessToken !== null) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const hasBody = options.body !== undefined;

  if (
    hasBody &&
    !headers.has("Content-Type") &&
    !(options.body instanceof FormData)
  ) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(input, {
    ...options,
    headers,
    body: toRequestBody(options.body),
  });

  const parsedBody = await parseResponseBody(response);

  if (!response.ok) {
    const message =
      isJsonLike(parsedBody) && typeof parsedBody.message === "string"
        ? parsedBody.message
        : `${response.status} ${response.statusText}`;

    throw new ApiRequestError(message, {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      body: parsedBody,
    });
  }

  return unwrapEnvelope<T>(parsedBody);
}

export async function apiJson<T>(
  input: RequestInfo | URL,
  options: ApiRequestOptions = {},
): Promise<T> {
  return apiRequest<T>(input, options);
}
