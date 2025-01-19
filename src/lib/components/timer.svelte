<script lang="ts">
    let date = $state(new Date());
    let interval = $state<number | undefined>();

    const formatTime = () => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    const formatDate = () => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    $effect(() => {
        interval = setInterval(() => {
            date = new Date();
        }, 10);

        return () => {
            clearInterval(interval);
        };
    });
</script>

<div>
    <span>{formatTime()}</span>
    <span>{formatDate()}</span>
</div>

