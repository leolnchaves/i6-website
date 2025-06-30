
import React from 'react';
import CookieBanner from './CookieBanner';
import CookieDetailsModal from './CookieDetailsModal';

/**
 * Main Cookie Consent Manager component
 * Handles all cookie consent functionality including banner and detailed preferences
 */
const CookieConsentManager = () => {
  return (
    <>
      <CookieBanner />
      <CookieDetailsModal />
    </>
  );
};

export default CookieConsentManager;
