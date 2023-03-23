import { t } from '$lib/trpc/init';
import account from '$lib/api/account'

export const router = t.router({
  account: t.router({ ...account }),
});

export type Router = typeof router;
