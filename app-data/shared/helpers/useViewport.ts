import React from 'react';

const useViewport = () => {
  if (typeof window !== 'undefined') {
    const [width, setWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleWindowResize);
      return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    // Return the width so we can use it in our components
    return { width };
  }
  return { width: 0 };
};

export default useViewport;
