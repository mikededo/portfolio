<script lang="ts">
    import { Editor } from '$lib/components';
    import { About } from '$lib/content';

    const content = About.InterestContent;
</script>

<Editor.Editor {content} />
