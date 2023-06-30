<script>
    import { showButton, getTokenFromLocalStorage} from '../utils/auth.js'
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { writable } from 'svelte/store'
    import { uploadMedia } from '../utils/s3-uploader.js';

    let window_display = writable(false);
    let formErrors = {}
    export let data;

    //for upload image window//
    function closeWindow(){
        window_display.set(false);
    }

    function openWindow(){
        window_display.set(true);
    }
    //create a variable ans set default value to no file chosen//
    let selectedFile = "No file chosen";

    //change the default message to selected image file name in choose file button//
    function handleFileInputChange(event) {
        /*assigns the selected file to the file variable. 
        If no file is selected, it will be undefined / show no file chosen message.*/
        const file = event.target.files[0];

        /*updates the selectedFile variable. 
        It checks if a file is selected (file is truthy) and assigns the 
        file name (file.name) to selectedFile. 
        If no file is selected (file is falsy or undefined), 
        it assigns the string "No file chosen" to selectedFile.*/
        selectedFile = file ? file.name : "No file chosen";
    }

    async function uploadImage(evt) {
    
    //Target id = fileInput, catch the first file//
    const [fileName, fileUrl] = await uploadMedia(evt.target['fileInput'].files[0]);

    // code to make POST request to your backend //
	const imgData = {
			fileUrl: fileUrl,
			price: evt.target['price'].value,
			title: evt.target['title'].value,
			description: evt.target['description'].value,
		};
    
    const token = await getTokenFromLocalStorage()

    //create and insert the new user data into database//
		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/upload', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(imgData)
		})

        if (resp.status == 200) {
            closeWindow()
		} else {
			const res = await resp.json();
			formErrors = res.error;
		}
  }

  async function checkout (ecomm){
    const imageId = ecomm.id;

    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/create-checkout-session', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
		body: JSON.stringify({ imageId })
    });
    if (resp.ok) {
    const sessionUrl = await resp.json();
    // Redirect the user to the Stripe checkout page using the session URL
    window.location.href = sessionUrl;
  } else {
    console.error('Failed to create checkout session:', resp.statusText);
    // Handle error scenario
  }
  }
</script>

<!-- This indicates that the Svelte component requires the AWS SDK for S3 (Simple Storage Service) 
    and is referencing the aws-sdk-s3.min.js file. -->
<svelte:head>
  <script src="/aws-sdk-s3.min.js"></script>
</svelte:head>

<div class="flex justify-between p-2">
<h1 class="text-3xl font-bold underline">Welcome to SvelteKit</h1>

{#if $window_display}
    <div class="fixed inset-0 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl border shadow-2xl w-96 h-500px">
        <form on:submit|preventDefault={uploadImage}>
            <div class="bg-gray-200 px-4 py-2 rounded-t-2xl flex justify-between">
                <h2 class="text-lg font-bold mt-1">Upload Image</h2>
                 <button class="bg-gray-300 py-2 px-4 rounded" on:click={closeWindow}>Close</button>
            </div>
            <div class="p-2">

                <div class="mt-1">
                <label for="fileInput" class="hover:border rounded-xl p-2 pl-0.5 w-60">
                        <input 
                            type="file" 
                            id="fileInput" 
                            accept=".jpg, .jpeg, .png" 
                            class="hidden" on:change={handleFileInputChange}
                        />

                        <!-- Customize the choose file button only -->
                        <label for="fileInput" class="bg-black text-white py-2 px-4 rounded-xl rounded-r-none cursor-pointer">
                             Choose File
                        </label>

                        <label for="fileInput" class="text-gray-500 h-4 cursor-pointer">{selectedFile}</label>

                        <!-- {#if 'fileUrl' in formErrors}
				        <label class="label" for="file Error">
					            <span class="label-text-alt text-red-500">{formErrors.fileUrl}</span>
				        </label>
			            {/if} -->
        
                </label>
                </div>

                <label class="label" for="price">
				    <span class="label-text">price</span>
			    </label>
			    <input
				    type="text"
				    name="price"
				    placeholder="1.96"
				    class="input input-bordered w-full"
			    />
                
                <!-- {#if 'price' in formErrors}
				        <label class="label" for="price Error">
					            <span class="label-text-alt text-red-500">{formErrors.price}</span>
				        </label>
			    {/if} -->

                <label class="label" for="title">
				    <span class="label-text">Title</span>
			    </label>
			    <input
				    type="text"
				    name="title"
				    placeholder="Sunset"
				    class="input input-bordered w-full"
			    />

                <!-- {#if 'title' in formErrors}
				        <label class="label" for="title Error">
					            <span class="label-text-alt text-red-500">{formErrors.title}</span>
				        </label>
			    {/if} -->

                <label class="label" for="description">
				    <span class="label-text">Description</span>
			    </label>
			    <input
				    type="text"
				    name="description"
				    placeholder="Beautiful sunset in San Marino"
				    class="input input-bordered w-full"
			    />

                <!-- {#if 'description' in formErrors}
				        <label class="label" for="description Error">
					            <span class="label-text-alt text-red-500">{formErrors.description}</span>
				        </label>
			    {/if} -->

                <div class="mt-4 flex justify-center">
                <button class="bg-black text-white py-2 px-4 rounded">Upload</button>
                </div>
            </div>
        </form>
        </div>
    </div>
    
    <div class="fixed inset-0 bg-white opacity-70"></div>
{/if}

{#if $showButton}
    <div class = "w-50">
        <button on:click={openWindow}>
            <div class="flex">
                <img src="plus.png" width="50px" height="50px" alt="plus icon"/>
                <p class="m-2 mt-3">Upload image</p>
            </div>
        </button>
    </div>
{/if}
</div>

<div class="grid grid-cols-4">
{#each data.img as ecomm}
<div class="mt-4 ml-2">
<div class="card w-72 bg-base-100 shadow-xl">
  <figure class="h-72"><img src= {ecomm.fileUrl} alt="ecomm-pic"></figure>
  <div class="card-body h-64">
    <h2 class="card-title">{ecomm.title}</h2>
    <p>{ecomm.price}</p>
    <p>{ecomm.description}</p>
    <div class="card-actions justify-end">
    <button on:click={() => checkout(ecomm)} class="btn btn-primary" type="submit" id="checkout-button">Buy Now</button>
      <!-- <button  on:click={openPaymentGateWay}>Buy Now</button> -->
    </div>
  </div>
</div>
</div>
{/each}
</div>


<!-- <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<a href="/about">About my site</a>
<button class="btn">Button</button>
<span class="badge">Badge</span> -->
