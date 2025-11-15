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

<div class="reloj-venezuela">
  {time}
</div>

<style>
  /* Estilos de Svelte están encapsulados (scoped) por defecto */
  .reloj-venezuela {
    font-family: monospace;
    font-size: 1.1rem;
    font-weight: bold;
    color: #333;
  }
</style>