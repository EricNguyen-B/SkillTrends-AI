"use client";

import * as React from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number; // milliseconds per character
}

export function TypewriterText({ text, speed = 50 }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = React.useState("");

  React.useEffect(() => {
    let currentIndex = 0;
    setDisplayedText(""); // reset text on new input
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text[currentIndex]);
      currentIndex++;
      if (currentIndex >= text.length) {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return (
    <p className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
      {displayedText}
    </p>
  );
}
