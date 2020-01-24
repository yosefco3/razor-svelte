<script>
  import links from "../../constants/links";
  import { link } from "svelte-routing";
  import globalStore from "../../stores/globalStore";
  import { fly, fade } from "svelte/transition";
  let closeSidebar = globalStore.toggleItem;
</script>

<div class="sidebar-container" transition:fly={{ x: -1000 }}>
  <div class="sidebar" transition:fade={{ delay: 400 }}>
    <div class="sidebar-header">
      <button class="btn-close" on:click={() => closeSidebar('sidebar', false)}>
        <i class="fas fa-window-close" />
      </button>
    </div>
    <!-- site logo -->
    <img
      src="/assets/images/logo.svg"
      alt="razors logo"
      class="logo sidebar-logo" />
    <!-- links -->
    <ul class="sidebar-links">
      {#each links as { text, url }}
        <li>
          <a
            href={url}
            use:link
            on:click={() => closeSidebar('sidebar', false)}>
            {text}
          </a>
        </li>
      {/each}

    </ul>
  </div>
</div>
