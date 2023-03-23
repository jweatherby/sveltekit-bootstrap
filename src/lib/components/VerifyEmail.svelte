<script lang="ts">
  import { page } from '$app/stores';
  import { trpc } from '$lib/trpc/client';
  import type { IAccount } from '$lib/types';

  export let setAccount: (account: IAccount) => void;
  export let formData: IAccount;

  const verifyEmail = (e: SubmitEvent) => {
    const formData = new FormData(e.target as HTMLFormElement);

    let payload = {
      email: formData.get('email') as string,
      emailedKey: parseInt(formData.get('emailedKey') as string),
    };

    const userId = parseInt(formData.get('userId') as string);
    if (userId) {
      payload = Object.assign(payload, { userId });
    }

    const fullName = formData.get('fullName') as string;
    if (fullName) {
      payload = Object.assign(payload, { fullName });
    }

    trpc()
      .account.verify.mutate(payload)
      .then((account) => {
        console.log('setting account');
        setAccount(account);
      })
      .catch((errors) => {
        console.warn('errors found', errors);
      });
  };
</script>

<form method="POST" on:submit|preventDefault={verifyEmail}>
  {#if formData.userId}
    <p>Welcome back, <strong>{formData.email}</strong>!</p>
  {:else}
    <p>Welcome!</p>
    <input name="fullName" placeholder="Please add your name here" />
  {/if}
  <input name="emailedKey" placeholder="6 Digit Code" />
  <input type="hidden" name="email" value={formData.email} />
  <input type="hidden" name="userId" value={formData.userId} />
  <div>
    <button type="submit">Login</button>
  </div>
</form>

<style>
  * {
    margin: 8px 0;
  }
</style>
