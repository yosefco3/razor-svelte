<script>
  import { onMount } from "svelte";
  import { navigate, link } from "svelte-routing";
  import user from "../stores/user";
  import cart, { cartTotal } from "../stores/cart";
  import submitOrder from "../strapi/submitOrder";
  import globalStore from "../stores/globalStore";
  let name = "";
  // stripe vars :
  let cardElement;
  let cardErrors;
  let card;
  let stripe;
  let elements;

  $: isEmpty = !name || $globalStore.alert;

  onMount(() => {
    if (!$user.jwt) {
      navigate("/");
      return;
    }
    if ($cartTotal > 0) {
      stripe = Stripe("pk_test_ADzS26mJcQpjDZAL0fMeXDnY00JbLpPJU1");
      elements = stripe.elements();
      card = elements.create("card");
      card.mount(cardElement);
      // card isn't element on our DOM-  we get it from stripe , so we couldn't use on:change
      card.addEventListener("change", event => {
        event.error
          ? (cardErrors.textContent = event.error.message)
          : (cardErrors.textContent = "");
      });
    }
  });
  async function handleSubmit() {
    globalStore.toggleItem("alert", true, "submitting order....please wait");
    let response = await stripe
      .createToken(card)
      .catch(err => console.log(err));
    const { token } = response;

    if (token) {
      const { id } = token;
      let order = await submitOrder({
        name,
        total: $cartTotal,
        items: $cart,
        stripeTokenId: id,
        userToken: $user.jwt
      });
      if (order) {
        globalStore.toggleItem("alert", true, "your order is complete!");
        cart.set([]);
        localStorage.setItem("cart", JSON.stringify([]));
        navigate("/");
        return;
      }
    } else {
      globalStore.toggleItem(
        "alert",
        true,
        "there was an error with your order"
      );
    }
  }
</script>

{#if $cartTotal > 0}
  <section class="form">
    <h2 class="section-title">checkout</h2>
    <form class="checkout-form" on:submit|preventDefault={handleSubmit}>
      <h3>order total : ${$cartTotal}</h3>
      <!-- single input  -->
      <div class="form-control">
        <label for="name">your name</label>
        <input type="text" id="name" bind:value={name} />
      </div>
      <!-- / single input -->
      <!-- stripe stuff -->

      <!-- /stripe stuff -->
      <div class="stripe-input">
        <!-- info -->
        <label for="card-element">Credit or Debit Card</label>
        <p class="stripe-info">
          Test using this credit card:
          <span>4242 4242 4242 4242</span>
          <br />
          enter any 5 digits for the zip code
          <br />
          enter any 3 digits for the CVC code
        </p>
        <!-- bind:this - binds element , all the div -->
        <div id="card-element" bind:this={cardElement}>
          <!-- stripe -->
        </div>
        <!-- / info -->
        <div id="card-errors" bind:this={cardErrors} role="alert" />
      </div>
      <!-- error message -->
      {#if isEmpty}
        <p class="form-empty">please fill out name field</p>
      {/if}
      <!-- submit button -->
      <button
        type="submit"
        class="btn btn-block btn-primary"
        disabled={isEmpty}
        class:disabled={isEmpty}>
        submit
      </button>

    </form>
  </section>
{:else}
  <div class="checkout-empty">
    <h2>your cart is empty</h2>
    <a href="/products" use:link class="btn btn-primary">fill it</a>
  </div>
{/if}
