import type { Router } from '$lib/trpc/router';
import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit';

let browserClient: ReturnType<typeof createTRPCClient<Router>>;

export function trpc(init?: TRPCClientInit) {
  const isBrowser = typeof window !== 'undefined';

  // is already loaded (singleton)
  if (isBrowser && browserClient) return browserClient;

  const client = createTRPCClient<Router>({ init });

  // initiate browserclient as singleton
  if (isBrowser) {
    browserClient = client;
  }

  return client;
}
