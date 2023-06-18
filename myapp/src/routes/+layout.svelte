<script>
  import "../app.css";
  import { goto } from '$app/navigation';

  function signUp() {
    goto("/users/new");
  }

  function signIn() {
    goto("/login");
  }

</script>

<nav class="flex justify-between bg-cover bg-no-repeat">
  <div>
    <a class="text-2xl font-bold m-4 border-none btn btn-active hover:bg-white hover:text-black btn-ghost text-white" href="/">Next-Ecomm</a>
  </div>
  <div>
    <button on:click={signUp} class="p-4 m-3 btn btn-active border-none hover:bg-white hover:text-black btn-ghost text-white">Sign Up</button>
    <button class="p-4 m-3 btn btn-active border-none btn-ghost hover:bg-white hover:text-black text-white">Log Out</button>
    <button on:click={signIn} class="p-4 m-3 btn btn-active border-none hover:bg-white hover:text-black btn-ghost text-white">Log In</button>
  </div>
</nav>

<slot />
