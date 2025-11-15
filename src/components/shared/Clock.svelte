<script>
  import { onMount } from 'svelte';

  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'America/Caracas',
    timeZoneName: 'short',
    hourCycle: 'h12'
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  
  // 1. Variable reactiva
  let time = 'Loading hour...';

  // 2. onMount, equivalent a useEffect[] of React
  onMount(() => {
    const updateClock = () => {
      const now = new Date();
      time = formatter.format(now).toUpperCase();
    };

    updateClock(); // Ejecutar al inicio
    const timerId = setInterval(updateClock, 1000);

    // 3. Limpieza: se ejecuta cuando el componente se destruye
    return () => clearInterval(timerId);
  });
</script>

<span id="clock">{time}</span>

<style>
  #clock {
    position: relative;
    width: max-content;
    font-family: var(--font-family-monospace);
    font-feature-settings: "zero", "tnum";
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0em;
    line-height: 1em;
    color: oklch(0.64 0 0);
    user-select: text;
    cursor: text
  }
</style>