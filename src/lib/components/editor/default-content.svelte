<script lang="ts">
    import Editor from './editor.svelte';

    const content: string[] = [
        ...Array.from<string>({ length: 11 }).fill(''),
        '┌────────────────────────┐',
        '│ Still working on this! │',
        '└────────────────────────┘',
        '             \\   ^__^',
        '              \\  (oo)\\_______',
        '                 (__)\\       )\\/\\',
        '                     ||----w |',
        '                     ||     ||',
        ...Array.from<string>({ length: 11 }).fill('')
    ].map((l) => l.replaceAll(' ', '&nbsp;'));
</script>

<Editor {content} />
