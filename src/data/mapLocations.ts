
import { MapLocation } from '@/types/mapTypes';

export const getMapLocations = (t: (key: string) => string): MapLocation[] => [
  {
    id: 'campinas',
    name: 'Campinas, Brazil',
    type: t('contact.map.headquarters'),
    coordinates: { lat: -22.9056, lng: -47.0608 },
    flag: '🇧🇷',
    address: 'Rua Exemplo, 123\nCampinas, SP 13010-111\nBrazil',
    phone: '+55 19 998197775',
    email: 'infinity6@infinity6.ai'
  },
  {
    id: 'dover',
    name: 'Dover, United States',
    type: t('contact.map.branchOffice'),
    coordinates: { lat: 39.1612, lng: -75.5277 },
    flag: '🇺🇸',
    address: '123 Corporate Blvd\nDover, DE 19901\nUnited States',
    phone: '+1 (302) 555-0123',
    email: 'usa@infinity6.ai'
  },
  {
    id: 'milan',
    name: 'Milan, Italy',
    type: t('contact.map.branchOffice'),
    coordinates: { lat: 45.4642, lng: 9.1900 },
    flag: '🇮🇹',
    address: 'Via Giuseppe Verdi, 45\n20121 Milano MI\nItaly',
    phone: '+39 02 1234 5678',
    email: 'italia@infinity6.ai'
  }
];
