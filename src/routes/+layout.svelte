<script lang="ts">
    import '../app.css';

    const { children } = $props();
</script>

<div class="flex shrink-0 flex-col h-screen">
    <header class="w-full h-header bg-crust/75 flex justify-between px-4 py-3 z-10">
        <p class="font-semibold text-xl">
            @mikededo
        </p>
        <nav class="flex gap-6 items-center">
            <a href="/" class="text-sm text-mauve">home</a>
            <a href="/projects" class="text-sm hover:text-mauve">projects</a>
            <a href="/about" class="text-sm hover:text-mauve">about</a>
        </nav>
    </header>
    <main class="bg-base h-full flex-1">
        <div class="container h-full w-full">
            {@render children()}
        </div>
    </main>
    <footer class="bg-crust/75 z-10 flex p-3 justify-end">
        <p class="text-sm text-mauve leading-4">@mikededo</p>
    </footer>
</div>

