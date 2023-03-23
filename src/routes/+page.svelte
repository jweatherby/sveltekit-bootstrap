<script lang="ts">
  import { page } from '$app/stores';
  import CheckEmail from '$lib/components/CheckEmail.svelte';
  import VerifyEmail from '$lib/components/VerifyEmail.svelte';
  import { trpc } from '$lib/trpc/client';
  import type { IAccount } from '$lib/types';

  import '$lib/styles/reset.css';
  import '$lib/styles/globals.css';

  let formData: IAccount;
  let account: IAccount | null = $page.data.account;

  const handleLogout = () => {
    trpc()
      .account.logout.mutate()
      .then(() => {
        setAccount(null);
      })
      .catch((err) => {
        console.warn('logout failed', err);
      });
  };

  const setAccount = (_account: IAccount | null) => {
    account = _account;
  };
  console.log('this account', account);
</script>

<main>
  {#if account}
    <header>
      <h1>Logged in</h1>
    </header>
    <section>
      <pre>{JSON.stringify(account, null, 2)}</pre>
      <div>
        <button on:click={handleLogout}>Logout</button>
      </div>
    </section>
  {:else}
    <header>
      <h1>Guest page</h1>
    </header>
    <section>
      {#if !formData?.email}
        <CheckEmail bind:formData />
      {:else if formData?.email}
        <VerifyEmail bind:formData {setAccount} />
      {/if}
    </section>
  {/if}
</main>

<style>
  h1 {
    font-size: 1rem;
  }
  main {
    width: 500px;
    margin: 150px auto;
  }
  pre {
    border: 1px solid #ddd;
    padding: 8px;
    margin: 16px 0;
  }
  section {
    margin: 16px 0;
  }
</style>
