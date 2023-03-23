import { prisma } from '$lib/dbClient';
import type { Prisma } from '@prisma/client';
import type { RequestEvent } from '@sveltejs/kit';
import { initTRPC, type inferAsyncReturnType } from '@trpc/server';
import { TRPCError } from '@trpc/server';

/**
 * This is called in 'src/hooks.server.ts' where it injects the user into every request.
 * The 'auth' middleware below throws an error if the user is not found
 */
export async function createContext(event: RequestEvent) {
  const authorizedUser = event.cookies.get('Authorized-User')
  const ctx = {}
  if (authorizedUser) {
    const user = JSON.parse(authorizedUser)
    return {
      ...ctx,
      account: user,
      params: event.params,
    }
  } else {
    return {
      ...ctx,
      account: null,
      params: event.params,
    }
  }
}

/**
 * Initiate TRPC
 */
export type Context = inferAsyncReturnType<typeof createContext>;
export const t = initTRPC.context<Context>().create()

/**
 * Keep it simple, the middleware will be defined here.
 * Eventually, it can move into src/lib/trpc/middleware
 */
export const logger = t.middleware(async ({ path, type, next }) => {
  const start = Date.now();
  const result = await next();
  const ms = Date.now() - start;
  console.log(`${result.ok ? 'OK' : 'ERR'} ${type} ${path} - ${ms}ms`);
  return result;
});

export const auth = t.middleware(async ({ next, ctx }) => {
  if (!ctx.account) throw new TRPCError({ code: 'UNAUTHORIZED' });
  return next();
});

/**
 * Public and Private Routes
 *
 * Private route will throw an error if a user is not found
 */
export const publicRoute = t.procedure.use(logger)
export const privateRoute = publicRoute.use(auth)
