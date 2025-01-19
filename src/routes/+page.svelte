<script lang="ts">
    // TODO: Add hrefs to each command
    const COMMANDS = [
        { desc: 'Go to /about', key: '⌘ Cmd + a', sm: true },
        { desc: 'Go to /projects', key: '⌘ Cmd + p', sm: true },
        { desc: 'Open my GitHub profile', key: '⌘ Cmd + g', sm: true },
        { desc: 'See how I implemented this!', key: '⌘ Cmd + i', sm: true },
        { desc: 'Designs are also available!', key: '⌘ Cmd + d', sm: true },
        { desc: 'Change theme', key: '⌘ Cmd + t', sm: false }
    ];
</script>

<div class="flex h-full flex-col justify-center">
    <div class="mb-32 flex flex-col gap-2">
        <div class="flex items-center gap-4 text-sm md:text-md">
            <span>&nbsp;</span>
            <p class="text-overlay1">~/home</p>
        </div>
        <div class="flex items-center gap-4 text-sm md:text-md">
            <span class="text-overlay1">1</span>
            <p>Hi, I&apos;m</p>
        </div>
        <div class="flex items-end gap-4">
            <span class="text-overlay1">2</span>
            <h1 class="text-3xl font-bold sm:text-5xl md:text-6xl xl:text-7xl">Miquel de Domingo</h1>
        </div>
        <div class="flex items-center gap-4 text-sm md:text-md">
            <span class="text-overlay1">3</span>
            <p>a software engineer based in Girona</p>
        </div>
    </div>

    <!-- Currently hidden on sm devices -->
    <div class="flex flex-col gap-4 sm:gap-6 lg:mx-auto lg:w-1/2 lg:gap-9">
        <div>
            <p>Shortcuts</p>
            <p class="hidden italic md:block">You can run the shortcuts page wide!</p>
        </div>
        <!-- TODO: Decide if text should stay smaller -->
        <ul class="flex flex-col gap-1 text-sm md:text-md">
            {#each COMMANDS as { desc, key, sm }(key)}
                <li class:hidden={!sm} class="flex items-center justify-between">
                    <p>{desc}</p>
                    <p class="hidden text-peach md:block">{key}</p>
                </li>
            {/each}
        </ul>

        <p class="hidden italic md:block">Open the command palette with <span class="text-peach">:</span></p>
    </div>
</div>

<svg
    class="pointer-events-none absolute inset-0 hidden h-screen w-screen md:block"
    viewBox="0 0 1440 1024"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <g opacity="0.35" filter="url(#filter0_f_3_3774)">
        <rect
            x="899.434"
            y="52"
            width="401.074"
            height="416.279"
            transform="rotate(8.20843 899.434 52)"
            class="animate-blob fill-blue"
        />
        <path
            d="M109.517 443.151L231.791 748.988L-94.2085 701.961L109.517 443.151Z"
            class="animate-blob-alt fill-red"
            style="--delay: -10s"
        />
        <circle
            cx="1318.06"
            cy="571.061"
            r="308.213"
            transform="rotate(8.20843 1318.06 571.061)"
            class="animate-blob-alt fill-mauve"
            style="--delay: -6s"
        />
        <path
            d="M520 875L691.473 974V1172L520 1271L348.527 1172V974L520 875Z"
            class="animate-blob fill-overlay0"
            style="--delay: -4s"
        />
    </g>
    <defs>
        <filter
            id="filter0_f_3_3774"
            x="-294.208"
            y="-200"
            width="2120.52"
            height="1671"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
        >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
            />
            <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_3_3774" />
        </filter>
    </defs>
</svg>

<svg
    class="pointer-events-none absolute inset-0 block h-screen w-screen md:hidden"
    viewBox="0 0 390 844"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <g opacity="0.35" filter="url(#filter0_f_23_549)">
        <rect
            x="99.4341"
            y="-268"
            width="401.074"
            height="416.279"
            transform="rotate(8.20843 99.4341 -268)"
            class="animate-blob fill-blue"
        />
        <path
            class="animate-blob-alt fill-red"
            d="M19.5173 423.151L141.791 728.988L-184.208 681.961L19.5173 423.151Z"
            style="--delay: -10s"
        />
        <circle
            cx="396.38"
            cy="408.357"
            r="164.55"
            transform="rotate(8.20843 396.38 408.357)"
            class="animate-blob-alt fill-mauve"
            style="--delay: -6s"
        />
        <path
            d="M290 755L461.473 854V1052L290 1151L118.527 1052V854L290 755Z"
            class="animate-blob fill-overlay0"
            style="--delay: -4s"
        />
    </g>
    <defs>
        <filter id="filter0_f_23_549"
            x="-384.208"
            y="-468"
            width="1145.16"
            height="1819"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
        >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
            />
            <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_23_549" />
        </filter>
    </defs>
</svg>
