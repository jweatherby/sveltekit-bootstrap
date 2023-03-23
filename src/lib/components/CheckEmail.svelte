<script lang="ts">
  import { trpc } from '$lib/trpc/client';
  import type { IAccount } from '$lib/types';

  export let formData: IAccount;

  const checkEmail = (e: SubmitEvent) => {
    const _formData = new FormData(e.target as HTMLFormElement);
    const email = _formData.get('email') as string;
    trpc()
      .account.checkEmail.query({
        email,
      })
      .then(({ userId }) => {
        formData = {
          email,
          userId: userId || undefined,
        };
      })
      .catch((errors) => {});
  };
</script>

<form method="POST" on:submit|preventDefault={checkEmail}>
  <p>Enter your email to get started</p>
  <input
    type="email"
    name="email"
    placeholder="Your email"
    value="jamie@test.com"
  />
  <p>We'll send you an email asking you to verify this address</p>
  <div>
    <button type="submit">Check Email</button>
  </div>
</form>

<style>
  * {
    margin: 8px 0;
  }
</style>
