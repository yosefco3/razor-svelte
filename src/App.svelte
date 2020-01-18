<script>
  // pages
  import Login from "./pages/Login.svelte";
  import Checkout from "./pages/Checkout.svelte";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Products from "./pages/Products.svelte";
  import ProductTemplate from "./pages/ProductTemplate.svelte";

  //   router
  import { Router, Route, Link } from "svelte-routing";
</script>

<Router>
  <nav class="navbar">
    <Link to="/">home</Link>
    <Link to="/about">about</Link>
    <Link to="/products">products</Link>

  </nav>
  <Route path="/" component={Home} />
  <Route path="/login" component={Login} />
  <Route path="/about" component={About} />
  <Route path="/products" component={Products} />
  <Route path="/checkout" component={Checkout} />
  <Route path="/products/:id" component={ProductTemplate} />
</Router>
