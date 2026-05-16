import React, { useState, useEffect, CSSProperties } from 'react';
import { typedStyles } from '../styles';

// Typing animation configuration
type TypedStyle = CSSProperties & {
  animation?: string;
  animationDelay?: string;
};

type TypedProps = {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
  startDelay?: number;
  loop?: boolean;
  showCursor?: boolean;
  className?: string;
  style?: TypedStyle;
  cursorStyle?: CSSProperties;
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
  style = {},
  cursorStyle = {},
}: TypedProps) => {
  const defaultClass = 'luna-typed';
  const combinedClassName = `${defaultClass} ${className}`.trim();

  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [cursorOpacity, setCursorOpacity] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPaused(false);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (isPaused) return;

    const currentString = strings[currentStringIndex] || '';

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentString.length) {
          setCurrentText(currentText + currentString[currentText.length]);
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

  // Cursor fade effect
  useEffect(() => {
    if (!showCursor) return;
    const fadeTimer = setInterval(() => {
      setCursorOpacity(prev => prev === 1 ? 0 : 1);
    }, 500);

    return () => clearInterval(fadeTimer);
  }, [showCursor]);

  const uiStyles = typedStyles(style, cursorStyle, cursorOpacity);

  return (
    <span className={combinedClassName} style={uiStyles.container}>
      <span>{currentText}</span>
      {showCursor && (
        <span
          aria-hidden="true"
          style={uiStyles.cursor}
        />
      )}
    </span>
  );
};

export default Typed;