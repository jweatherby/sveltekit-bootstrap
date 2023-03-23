import type { ServerLoad } from "@sveltejs/kit";
import { createContext } from "$lib/trpc/init";


export const load: ServerLoad = async (event) => ({
  account: (await createContext(event)).account
});