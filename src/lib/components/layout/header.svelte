<script lang="ts">
    type Props = {
        title: string;
        description: string;
    };
    const { description, title }: Props = $props();
</script>

<h1 class="mb-2 text-2xl font-bold">{title}</h1>
<p class="mb-2 text-sm">
    {description}
</p>
