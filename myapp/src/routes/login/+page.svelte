<!-- Login page -->

<script>
    import { goto } from '$app/navigation';
    import { authenticateUser, isLoggedIn } from '../../utils/auth.js';
    import { writable } from 'svelte/store';


    let isLoading = writable(false);
    let email = '';
    let password = '';
    let loginStatus = writable(false);
    

    async function signIn(evt) {
        //prevent page go to the top when the button is clicked//
        evt.preventDefault();

        isLoading.set(true);

        const login = await authenticateUser(email, password);
        if(login.success == true){
            goto('/');
            loginStatus.set(false);
            isLoggedIn();
        }else{
            loginStatus.set(true);
        }
        isLoading.set(false);
    }
    
</script>

<svelte:head>
  <title>Login Page | Next Ecomm</title>
</svelte:head>

<!-- If loginStatus is true, show the warning message -->
<!-- {#if $loginStatus}
<div class="alert alert-warning flex p-4 rounded-lg">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    <span>Warning: Invalid password/email address!</span>
</div>
{/if} -->

<h1 class="text-center m-3 text-3xl p-4">Login</h1>

<div class="flex justify-center items-center mt-8">
    <form on:submit={signIn} class="w-1/3">
        <div>
            <div class="form-control w-full">
			<label class="label" for="email">
				<span class="label-text">Email</span>
			</label>
			<input
				type="email"
				name="email"
                bind:value={email}
				placeholder="john@example.com"
				class="input input-bordered w-full"
			/>
		</div>

            <label class="label" for="username">Password</label>
            <input 
                type="password"
                name="Password"
                bind:value={password}
                password=""
                class="input input-bordered w-full"
                required
                />
        </div>        
        <div class="mt-5 flex justify-center">
            <button class="bg-black text-white w-48 flex justify-around rounded-lg my-8 py-4 border flex justify-center">
                <div class="flex justify-around">
                    <div>Login</div>
                    <!-- If isLoading is true, show spinner -->
                    {#if $isLoading}
                    <div class="pl-3">
                        <span class="loading loading-spinner loading-md"></span>
                    </div>
                    {/if}
                </div>
            </button>
        </div>
    </form>
</div>
