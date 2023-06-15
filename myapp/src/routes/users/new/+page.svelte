<!-- Create new user page -->

<script>
  import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
  let formErrors = {};
  
  async function postSignUp() {
      goto('/');
    }

  async function createUser(evt) {
    //prevent the page go to the top when button is clicked//
    evt.preventDefault();

    // if (evt.target['password'].value != evt.target['password-confirmation'].value) 
    // {
    //   formErrors['password'] = { message: 'Password confirmation does not match' };
    //   return;
    // }

    const userData = {
      name: evt.target['name'].value,
      email: evt.target['email'].value,
      password: evt.target['password'].value,
      // passwordConfirm: evt.target['password-confirmation'].value
    };

    //create and insert the new user data into database//
    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/user', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (resp.status == 200) {

      if (resp.success) {
        postSignUp();
      } else {
        throw 'Sign up succeeded but authentication failed';
      }
    } else {
      const res = await resp.json();
      formErrors = res.data;
    }
  }
</script>

<svelte:head>
  <title>Create User | Next Ecomm</title>
</svelte:head>

<h1 class="text-center text-xl mt-4">Create an Account to Post Picture</h1>
<div class="text-center">
    <a class="link-hover italic text-xs" href="/login">Already have an account? Click here to login instead.</a>
</div>
<div class="flex justify-center items-center mt-8">
    <form on:submit={createUser} class="w-1/3">
      <!-- Username input section -->
        <div class="form-control w-full">
            <label class="label" for="username">
                <span class="label-text">Name</span>
            </label>
            <input type="text" name="username" placeholder="johndoe" class="input input-bordered w-full" />
            {#if 'name' in formErrors}
            <label class="label" for="username Error">
                <span class="label-text-alt text-red-500">{formErrors['name'].message}</span>
            </label>
            {/if}
        </div>

      <!-- Email input section -->
        <div class="form-control w-full">
            <label class="label" for="email">
                <span class="label-text">Email</span>
            </label>
            <input type="email" name="email" placeholder="john@example.com" class="input input-bordered w-full" required/>
            {#if 'email' in formErrors}
            <label class="label" for="Email Error">
                <span class="label-text-alt text-red-500">{formErrors['email'].message}</span>
            </label>
            {/if}
        </div>

      <!-- Password input section -->
        <div class="form-control w-full">
            <label class="label" for="password">
                <span class="label-text">Password</span>
            </label>
            <input type="password" name="password" placeholder="" class="input input-bordered w-full" required />
            {#if 'password' in formErrors}
            <label class="label" for="password">
                <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
            </label>
            {/if}
        </div>

      <!-- Confirm password input section -->
        <div class="form-control w-full">
            <label class="label" for="password">
                <span class="label-text">Confirm Password</span>
            </label>
            <input type="password" name="password-confirmation" placeholder="" class="input input-bordered w-full" required />
            {#if 'password' in formErrors}
            <label class="label" for="password">
                <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
            </label>
            {/if}
        </div>

      <!-- Create User Button -->
        <div class="mt-5 flex justify-center">
          <button class="bg-white hover:bg-black hover:text-white w-48 flex justify-around rounded-lg my-8 py-4 border flex justify-center">
          <div class="flex justify-around">
              <div>CREATE USER</div>
              <!-- If the isLoading store is true, show the spinner animation -->
              <!-- {#if $isLoading}
                <div class="pl-3">
                <span class="loading loading-spinner loading-md"></span>
                </div>
              {/if} -->
          </div>
          </button>
      </div>
    </form>
</div>


    