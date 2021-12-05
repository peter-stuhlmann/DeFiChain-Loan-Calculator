import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

const trackingCode = process.env.REACT_APP_GA;

export default function useGoogleAnalytics() {
  const location = useLocation();

  const init = () => {
    const isDev =
      !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    ReactGA.initialize(trackingCode, { debug: isDev });
    ReactGA.set({ anonymizeIp: true });
  };

  const sendPageview = (path) => {
    ReactGA.set({ page: path });
    ReactGA.pageview(path);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const currentPath = location.pathname + location.search;
    sendPageview(currentPath);
  }, [location]);
}
