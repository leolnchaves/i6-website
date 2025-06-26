
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY_HERE';

export const loadGoogleMapsScript = (callback: () => void) => {
  if (window.google) {
    callback();
    return;
  }

  window.initMap = callback;

  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
  script.async = true;
  script.defer = true;
  script.onerror = () => {
    console.error('Erro ao carregar Google Maps API');
  };
  document.head.appendChild(script);
};
