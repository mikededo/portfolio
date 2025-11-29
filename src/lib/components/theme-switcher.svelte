<script lang="ts">
    import { getThemeContext, toggleTheme } from '$lib/context/theme.svelte';
    import { Theme } from '$lib/utils/theme';

    const theme = getThemeContext();

    const onThemeChange = () => {
        toggleTheme();
    };
</script>

<button
    class="ml-auto cursor-pointer hover:underline"
    type="button"
    onclick={onThemeChange}
>
    {theme() === Theme.Light ? 'dark' : 'light'}
</button>
