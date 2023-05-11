import { useEffect, useState } from 'react';

export default function useWindowSizeReport() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", changeWidth)

    return () => {
      window.removeEventListener("resize", changeWidth)
    }
  }, [])

  return [screenWidth];
}