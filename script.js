document.addEventListener("DOMContentLoaded", function() {
    const container  = document.getElementById('seq-container');
    if (container) {
        const frames     = Array.from(document.querySelectorAll('.seq-frame'));
        const panels     = Array.from(document.querySelectorAll('.seq-panel'));
        const dots       = Array.from(document.querySelectorAll('.seq-dot'));
        const scrollHint = document.getElementById('seq-scroll-hint');
        const trustBar   = document.getElementById('seq-trust-bar');
        const TOTAL      = frames.length; // 5

        let currentFrame = 0;

        function setFrame(idx) {
            idx = Math.max(0, Math.min(TOTAL - 1, idx));
            if (idx === currentFrame) return;
            currentFrame = idx;

            frames.forEach((f, i) => f.classList.toggle('active', i === idx));
            panels.forEach((p, i) => p.classList.toggle('active', i === idx));
            dots.forEach((d, i)   => d.classList.toggle('active', i === idx));

            if (trustBar) trustBar.classList.toggle('active', idx === TOTAL - 1);
            if (scrollHint) scrollHint.style.opacity = idx === TOTAL - 1 ? '0' : '1';
        }

        function onScroll() {
            const rect     = container.getBoundingClientRect();
            const total_h  = container.offsetHeight - window.innerHeight;
            const scrolled = -rect.top;
            const progress = Math.max(0, Math.min(1, scrolled / total_h));
            const frameIdx = Math.floor(progress * TOTAL);
            setFrame(Math.min(frameIdx, TOTAL - 1));
        }

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                const total_h = container.offsetHeight - window.innerHeight;
                const target  = container.offsetTop + (i / TOTAL) * total_h;
                window.scrollTo({ top: target, behavior: 'smooth' });
            });
        });

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.remove('bg-transparent', 'text-white', 'pt-6', 'pb-4');
                header.classList.add('bg-[#fbf9f6]/95', 'backdrop-blur-md', 'text-[#1C1410]', 'border-b', 'border-[#e4c285]/20', 'py-4');
                header.querySelectorAll('a, button, span').forEach(el => {
                    if(el.classList.contains('text-white')) {
                        el.classList.replace('text-white', 'text-[#1C1410]');
                    }
                    if(el.classList.contains('text-white/80')) {
                        el.classList.replace('text-white/80', 'text-[#4e4541]');
                    }
                    if(el.classList.contains('border-white/40')) {
                        el.classList.replace('border-white/40', 'border-[#1C1410]/20');
                    }
                });
            } else {
                header.classList.add('bg-transparent', 'text-white', 'pt-6', 'pb-4');
                header.classList.remove('bg-[#fbf9f6]/95', 'backdrop-blur-md', 'text-[#1C1410]', 'border-b', 'border-[#e4c285]/20', 'py-4');
                header.querySelectorAll('a, button, span').forEach(el => {
                    if(el.classList.contains('text-[#1C1410]')) {
                        el.classList.replace('text-[#1C1410]', 'text-white');
                    }
                    if(el.classList.contains('text-[#4e4541]')) {
                        el.classList.replace('text-[#4e4541]', 'text-white/80');
                    }
                    if(el.classList.contains('border-[#1C1410]/20')) {
                        el.classList.replace('border-[#1C1410]/20', 'border-white/40');
                    }
                });
            }
        });
    }
});
