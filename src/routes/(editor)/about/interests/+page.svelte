<script lang="ts">
    import { Editor } from '$lib/components';
    import { About, parseContent } from '$lib/content';

    const content = About.InterestContent;
</script>

<Editor.Editor text={content.map(parseContent).join(' ')} />
