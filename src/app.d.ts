// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { IAccount } from "./lib/types";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			account: IAccount | undefined
		}
		interface PageData {
			account: IAccount
		}
		// interface Platform {}
	}
}

export { };
