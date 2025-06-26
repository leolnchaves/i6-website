
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY_HERE';

export const loadGoogleMapsScript = (callback: () => void) => {
  // Verifica se o Google Maps já foi carregado
  if (window.google && window.google.maps) {
    callback();
    return;
  }

  // Remove script anterior se existir
  const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Cria função global para callback
  window.initMap = callback;

  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${AIzaSyDuLm8Nlg1wH4BfG8bXJwXOAkijpLlfnM4}&callback=initMap&libraries=places`;
  script.async = true;
  script.defer = true;
  
  script.onerror = (error) => {
    console.error('Erro ao carregar Google Maps API:', error);
    // Remove o script com erro
    script.remove();
  };

  script.onload = () => {
    console.log('Google Maps API carregada com sucesso');
  };

  document.head.appendChild(script);
};
