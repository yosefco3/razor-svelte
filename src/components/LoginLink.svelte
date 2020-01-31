<script>
  import user from "../stores/user";
  import { link } from "svelte-routing";
  import globalStore from "../stores/globalStore";
  //   logout func
</script>

{#if $user.jwt}
  <a
    href="/"
    use:link
    class="logout-btn"
    on:click={() => globalStore.toggleItem('sidebar', false)}>
    logout
  </a>
{:else}
  <a
    href="/login"
    use:link
    class="logout-btn"
    on:click={() => globalStore.toggleItem('sidebar', false)}>
    login
  </a>
{/if}
