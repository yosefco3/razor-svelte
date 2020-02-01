<script>
  import products from "../../stores/products";
  import Product from "./Product.svelte";
  import Loading from "../Loading.svelte";
  export let title = "";
  $: featured = $products.filter(item => item.featured);
</script>

{#if featured.length === 0}
  <Loading />
{:else}
  <section class="section">
    <h2 class="section-title">{title}</h2>
    <div class="products-center">
      {#each featured as product (product.id)}
        <Product {product} />
      {/each}
    </div>
  </section>
{/if}
