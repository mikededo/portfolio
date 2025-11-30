import { onMount } from 'svelte';

export type TOCItem = {
  id: string;
  level: number;
  text: string;
};

export const useHeadingsState = () => {
  let active = $state<{ id: string; index: number }>({ id: '', index: -1 });
  let scrollProgress = $state(0);
  let headings = $state<TOCItem[]>([]);

  onMount(() => {
    headings = [
      ...document.querySelectorAll('h2,h3,h4,h5,h6').values()
    ].map((e) => {
      const element = e as HTMLHeadingElement;

      return {
        id: e.id,
        level: Number.parseInt(element.tagName.charAt(1)) - 2,
        text: element.textContent || ''
      };
    });
  });

  $effect(() => {
    if (headings.length === 0) {
      return;
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      // 64 as the footer height
      const progress = docHeight > 0 ? (scrollTop / (docHeight - 64)) * 100 : 0;

      scrollProgress = (progress);

      const viewportOffset = window.innerHeight * 0.5;
      const headingElements = headings.map((h) => document.getElementById(h.id)).filter(Boolean);

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        if (!element) {
          continue;
        }

        const rect = element.getBoundingClientRect();
        if (rect.top <= viewportOffset) {
          const id = headings[i].id;
          if (id !== active.id) {
            active = { id, index: i };
          }

          break;
        }
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const gotoId = (id: string) => {
    const element = document.getElementById(id);
    if (!element) {
      return;
    }

    const offset = window.innerHeight * 0.35;
    const pos = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      behavior: 'smooth',
      top: pos - offset
    });
  };

  const gotoPrev = () => {
    const currentIndex = headings.findIndex((h) => h.id === active.id);
    if (currentIndex === -1 && currentIndex > 0) {
      return;
    }

    const prevHeading = headings[currentIndex - 1];
    document.getElementById(prevHeading.id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const gotoNext = () => {
    const currentIndex = headings.findIndex((h) => h.id === active.id);
    if (currentIndex === -1 && currentIndex >= headings.length - 1) {
      return;
    }

    const prevHeading = headings[currentIndex + 1];
    document.getElementById(prevHeading.id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return {
    actions: {
      gotoId,
      gotoNext,
      gotoPrev
    },
    get active() {
      return active;
    },
    get headings() {
      return headings;
    },
    get progress() {
      return scrollProgress;
    }
  };
};
