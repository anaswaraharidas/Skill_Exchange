
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function useInView<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, []);

  return { ref, inView };
}

export function useStaggeredAnimation(index: number) {
  const BASE_DELAY = 50; // base delay in ms
  const animationDelay = `${index * BASE_DELAY}ms`;
  
  return { animationDelay };
}

export function usePageTransition() {
  const location = useLocation();
  const [pageClass, setPageClass] = useState('page-transition-enter page-transition-enter-active');
  
  useEffect(() => {
    setPageClass('page-transition-enter page-transition-enter-active');
    
    const timer = setTimeout(() => {
      setPageClass('');
    }, 300);
    
    return () => {
      clearTimeout(timer);
      setPageClass('page-transition-exit page-transition-exit-active');
    };
  }, [location]);
  
  return { pageClass };
}
