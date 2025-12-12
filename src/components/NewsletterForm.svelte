<script lang="ts">
  import { fade } from 'svelte/transition';
  import Button from '@components/Button.astro';

  export let buttonText: string = "Subscribe";
  export let placeholder: string = "you@example.com";

  // Internal State
  let email: string = "";
  let status: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  let message: string = "";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleSubmit() {
    // 1. Basic Validation
    if (!email || !emailRegex.test(email)) {
      status = 'error';
      message = "Please enter a valid email address.";
      return;
    }

    // 2. Loading State
    status = 'loading';
    message = "";

    try {
      // TODO: Replace with your actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      status = 'success';
      message = "Thanks for subscribing! Check your inbox.";
      email = "";
      
      // Optional: Reset after delay
      setTimeout(() => {
        status = 'idle';
        message = "";
      }, 5000);

    } catch (err) {
      status = 'error';
      message = "Something went wrong. Please try again later.";
      console.error(err);
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="newsletter-form" aria-label="Newsletter subscription form">
  <div class="input-group">
    <div class="input-wrapper">
      <!-- Mail Icon -->
      <svg class="icon input-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>

      <input type="email" name="email" bind:value={email} disabled={status === 'loading' || status === 'success'} {placeholder} class:error={status === 'error'} aria-invalid={status === 'error'} aria-describedby="form-message" autocomplete="email" required />
    </div>

    <Button type="submit" disabled={status === 'loading' || status === 'success'} class:success={status === 'success'} client:load>
      {#if status === 'loading'}
        <svg class="icon spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
        </svg>
        <span>Processing...</span>
      {:else if status === 'success'}
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        <span>Subscribed</span>
      {:else}
        {buttonText}
      {/if}
    </Button>
  </div>

  <div id="form-message" class="message-area"aria-live="polite">
    {#if status === 'error'}
      <span class="msg error" transition:fade={{ duration: 200 }}>
        {message}
      </span>
    {:else if status === 'success'}
      <span class="msg success" transition:fade={{ duration: 200 }}>
        {message}
      </span>
    {/if}
  </div>
</form>

<style>
  /* Scoped CSS */
  .newsletter-form {
    width: 100%
  }

  .input-group {
    display: flex;
    gap: 0.75rem;
    align-items: stretch;
  }

  @media (max-width: 480px) {
    .input-group {
      flex-direction: column;
    }
  }

  .input-wrapper {
    position: relative;
    flex-grow: 1;
    display: flex;
    align-items: center;
  }

  /* Icons */
  .icon {
    display: inline-block;
    vertical-align: middle;
  }

  .input-icon {
    position: absolute;
    left: 0.75rem;
    color: #888;
    pointer-events: none;
  }

  /* Input Styles */
  input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem; /* Left padding for icon */
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    background-color: #fff;
    color: #111;
  }

  input:focus {
    border-color: #3b82f6; /* Blue */
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  input.error {
    border-color: #ef4444; /* Red */
  }

  input:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background-color: #f9fafb;
  }

  /* Animations */
  .spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Messages */
  .message-area {
    min-height: 1.5rem;
    margin-top: 0.5rem;
    font-size: 0.875rem;
  }

  .msg {
    display: block;
  }

  .msg.error {
    color: #ef4444;
  }

  .msg.success {
    color: #16a34a;
  }
</style>