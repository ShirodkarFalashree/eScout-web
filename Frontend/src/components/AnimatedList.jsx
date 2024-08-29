"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

export const AnimatedList = React.memo(
  ({ className, children, delay = 1000 }) => {
    const [index, setIndex] = useState(0);
    const childrenArray = React.Children.toArray(children);

    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearInterval(interval);
    }, [delay]);

    const itemsToShow = useMemo(
      () => childrenArray.slice(0, index + 1),
      [index, childrenArray],
    );

    return (
      <div className={`flex flex-col items-center gap-4 ${className}`}>
        {itemsToShow.map((item) => (
          <AnimatedListItem key={item.key}>
            {item}
          </AnimatedListItem>
        ))}
      </div>
    );
  },
);

AnimatedList.displayName = "AnimatedList";

export function AnimatedListItem({ children }) {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  };

  return (
    <motion.div
      initial={animations.initial}
      animate={animations.animate}
      transition={animations.transition}
      className="mx-auto w-full"
    >
      {children}
    </motion.div>
  );
}
