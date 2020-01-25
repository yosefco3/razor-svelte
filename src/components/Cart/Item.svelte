<script>
  import { removeItem } from "../../stores/cart";
  export let id;
  export let image;
  export let title;
  export let price;
  export let amount;
  //   import cart methods
</script>

<!-- cart items -->
<div class="cart-item">
  <img src={image} alt={title} />
  <div class="item-center">
    <h4>{title}</h4>
    <h5>${price}</h5>
    <button class="cart-btn remove-btn" on:click={() => removeItem(id)}>
      remove
    </button>
  </div>
  <div class="item-side">
    <button
      class="cart-btn amount-btn"
      on:click={() => console.log('increase item')}>
      <i class="fas fa-chevron-up" />
    </button>
    <p class="item-amount">{amount}</p>
    <button
      class="cart-btn amount-btn"
      on:click={() => console.log('decrease item')}>
      <i class="fas fa-chevron-down" />
    </button>
  </div>
</div>
