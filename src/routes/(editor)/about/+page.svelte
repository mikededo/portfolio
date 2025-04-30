<script lang="ts">
    import { Editor } from '$lib/components';
    import { About, parseContent } from '$lib/content';

    const content = About.AboutInfoContent;
</script>

<Editor.Editor text={content.map(parseContent).join(' ')} />

