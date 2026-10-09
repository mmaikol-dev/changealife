import { Variants } from 'framer-motion';

export const checkboxVariants: Variants = {
    initial: { scale: 1 },
    selected: {
        scale: [1, 1.05, 1],
        transition: { duration: 0.2, times: [0, 0.4, 1] },
    },
};

export const buttonTap = { scale: 0.97 };

export const successCheckmark: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
};
