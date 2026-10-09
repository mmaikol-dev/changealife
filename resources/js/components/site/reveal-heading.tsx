import type { CSSProperties, ReactNode } from 'react';

import SplitText from '@/components/SplitText';
import { useMotionSafe } from '@/site/motion';

type RevealTag = 'h1' | 'h2' | 'h3';

interface RevealHeadingProps {
    text: ReactNode;
    /** Semantic heading level. Defaults to h2. */
    tag?: RevealTag;
    className?: string;
    textAlign?: CSSProperties['textAlign'];
    /** Per-character stagger, in milliseconds. */
    delay?: number;
    duration?: number;
}

/**
 * Reveals a heading with the React Bits SplitText effect. Falls back to a
 * plain, unanimated heading when the title contains markup (rich titles are
 * not splittable) or when the visitor prefers reduced motion.
 */
export function RevealHeading({
    text,
    tag = 'h2',
    className,
    textAlign = 'left',
    delay = 40,
    duration = 0.9,
}: RevealHeadingProps) {
    const { reduced } = useMotionSafe();

    if (typeof text !== 'string' || reduced) {
        const Tag = tag;

        return <Tag className={className}>{text}</Tag>;
    }

    return (
        <SplitText
            text={text}
            tag={tag}
            className={className}
            textAlign={textAlign}
            delay={delay}
            duration={duration}
            from={{ opacity: 0, y: 24 }}
            to={{ opacity: 1, y: 0 }}
        />
    );
}
