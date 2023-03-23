import { useEffect, useState } from 'react';

export default function useWindowSizeReport() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const reportWindowSize = () => {
    setInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    let isMounted = true;
    isMounted && (window.onresize = reportWindowSize);
    return () => { isMounted = false }
  }, [])

  return [innerWidth];
}