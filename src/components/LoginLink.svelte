<script>
  import user from "../stores/user";
  import { link } from "svelte-routing";
  import globalStore from "../stores/globalStore";
  import { logoutUser } from "../stores/user";

  function logout() {
    logoutUser();
    globalStore.toggleItem("sidebar", false);
  }
</script>

{#if $user.jwt}
  <a href="/" use:link class="logout-btn" on:click={() => logout()}>logout</a>
{:else}
  <a
    href="/login"
    use:link
    class="logout-btn"
    on:click={() => globalStore.toggleItem('sidebar', false)}>
    login
  </a>
{/if}
