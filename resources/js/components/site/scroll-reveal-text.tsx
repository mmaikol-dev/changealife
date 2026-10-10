import { useMotionSafe } from '@/site/motion';
import SplitText from '@/components/SplitText';

type ScrollRevealTag = 'p' | 'span' | 'h2' | 'h3' | 'h4';

interface ScrollRevealTextProps {
    text: string;
    className?: string;
    tag?: ScrollRevealTag;
    /** Per-unit stagger, in milliseconds. */
    delay?: number;
    splitType?: 'words' | 'chars' | 'words, chars';
}

/**
 * Animates a block of text as it scrolls into view, using the shared GSAP
 * SplitText effect that powers the section headings. Falls back to plain,
 * unanimated text when the visitor prefers reduced motion.
 */
export function ScrollRevealText({
    text,
    className,
    tag = 'p',
    delay = 32,
    splitType = 'words',
}: ScrollRevealTextProps) {
    const { reduced } = useMotionSafe();

    if (reduced) {
        const Tag = tag;

        return <Tag className={className}>{text}</Tag>;
    }

    return (
        <SplitText
            text={text}
            tag={tag}
            className={className}
            textAlign="left"
            splitType={splitType}
            delay={delay}
            duration={0.8}
            from={{ opacity: 0, y: 18 }}
            to={{ opacity: 1, y: 0 }}
        />
    );
}
