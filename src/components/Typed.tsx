import React, { useState, useEffect, CSSProperties } from 'react';

type TypedProps = {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
  startDelay?: number;
  loop?: boolean;
  showCursor?: boolean;
  className?: string;
  style?: CSSProperties;
};

const Typed = ({
  strings,
  typeSpeed = 50,
  backSpeed = 30,
  backDelay = 500,
  startDelay = 0,
  loop = true,
  showCursor = true,
  className = '',
  style,
}: TypedProps) => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPaused(false);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (isPaused) return;

    const currentString = strings[currentStringIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentString.length) {
          setCurrentText(currentString + currentString[currentText.length]);
        } else {
          // Finished typing, wait before deleting
          if (loop) {
            setIsPaused(true);
            setTimeout(() => {
              setIsPaused(false);
              setIsDeleting(true);
            }, backDelay);
          }
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Finished deleting, move to next string
          setIsDeleting(false);
          setCurrentStringIndex((prevIndex) =>
            prevIndex === strings.length - 1 ? 0 : prevIndex + 1
          );
        }
      }
    }, isDeleting ? backSpeed : typeSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentStringIndex, strings, typeSpeed, backSpeed, backDelay, loop, isPaused]);

  return (
    <span className={`inline-block ${className}`} style={style}>
      <span className="typed">{currentText}</span>
      {showCursor && (
        <span
          className="typed-cursor ml-1 inline-block w-0.5 h-5 bg-current animate-pulse"
          aria-hidden="true"
        >
          |
        </span>
      )}
    </span>
  );
};

export default Typed;