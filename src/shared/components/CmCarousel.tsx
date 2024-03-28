import React, { useEffect, useState, useRef } from "react";
import { Fab } from "@mui/material";
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

import CmCard from "./CmCard";

interface Props {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

function CmCarousel({ children, style }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const [maxHeight, setMaxHeight] = useState(0);
  const maxContentRef = useRef<HTMLDivElement>(null);

  function handleNext() {
    setActiveIndex((prevIndex) => (prevIndex + 1) % React.Children.count(children));
  }

  function handlePrev() {
    setActiveIndex((prevIndex) => (prevIndex - 1 + React.Children.count(children)) % React.Children.count(children));
  }

  useEffect(() => {
    setActiveIndex(0);
  }, [children]);

  useEffect(() => {
    if (maxContentRef.current) {
      const children = maxContentRef.current.children;
      let newMaxHeight = 0;

      const loadListener = () => {
        const heights = Array.from(children).map(child => child.getBoundingClientRect().height);
        console.log(heights);
        const maxChildHeight = Math.max(...heights);
        if (maxChildHeight > newMaxHeight) {
          setMaxHeight(maxChildHeight);
        }
      };

      Array.from(children).forEach(child => {
        const images = child.querySelectorAll("img");
        if (images.length === 0) {
          loadListener();
        } else {
          images.forEach(image => {
            if (!image.complete) {
              image.addEventListener("load", loadListener);
            } else {
              loadListener();
            }
          });
        }
      });

      return () => {
        Array.from(children).forEach(child => {
          const images = child.querySelectorAll("img");
          images.forEach(image => {
            image.removeEventListener("load", loadListener);
          });
        });
      };
    }
  }, [children])

  return (
    <CmCard style={{ ...style }}>
      <div style={styles.arrowContainer}>
        <Fab onClick={handlePrev} size="medium" sx={{ marginLeft: '10px', backgroundColor: 'white' }}>
          <ChevronLeft fontSize="large" />
        </Fab>
        <Fab onClick={handleNext} size="medium" sx={{ marginRight: '10px', backgroundColor: 'white' }}>
          <ChevronRight fontSize="large" />
        </Fab>
      </div>

      <div style={{ visibility: 'hidden', position: 'absolute', top: 2000, left: 2000 }} ref={maxContentRef}>
        {React.Children.map(children, (child) => child)}
      </div>

      {React.Children.map(children, (child, index) => (
        <div key={index} style={{ display: index === activeIndex ? 'block' : 'none', marginTop: -40, minHeight: maxHeight }}>
          {child}
        </div>
      ))}

      <div style={styles.dotsContainer}>
        {React.Children.map(children, (_, index) => (
          <div key={index} style={{ ...styles.dot, backgroundColor: index === activeIndex ? 'gray' : 'white' }}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </CmCard>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  arrowContainer: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '100%',
    height: 40,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dotsContainer: {
    position: 'relative',
    top: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    border: '1px solid gray',
    margin: '0 5px',
    cursor: 'pointer',
    backgroundColor: 'white',
    transition: 'background-color 0.3s',
  },
};

export default CmCarousel;
