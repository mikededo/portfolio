<script lang="ts">
    import { Editor } from '$lib/components';
    import { About } from '$lib/content';

    const content = About.AboutInfoContent;
</script>

<Editor.LineNumbers count={content.length} />
<Editor.Code code={content} />

