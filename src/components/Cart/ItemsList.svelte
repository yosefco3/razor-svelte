<script>
  import Item from "./Item.svelte";
  import cartStore, { cartTotal, setStorageCart } from "../../stores/cart";
  import { fly } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { afterUpdate } from "svelte";

  afterUpdate(() => {
    setStorageCart($cartStore);
  });
</script>

<section class="cart-items">
  <article>
    {#each $cartStore as { id, image, title, price, amount }, index (id)}
      <div
        in:fly={{ delay: (index + 1) * 500, x: 100 }}
        out:fly={{ x: -100 }}
        animate:flip>
        <Item {id} {image} {title} {price} {amount} />
      </div>
    {:else}
      <h2 class="empty-cart">is currently empty</h2>
    {/each}
  </article>
  <h3 class="cart-total">total : ${$cartTotal}</h3>
</section>
