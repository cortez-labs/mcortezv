import { orwel } from '$lib/orwel';
import { getTrafficParams } from '$lib/utm';

function gtag(...args) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
}

function withUTM(data) {
  return { ...data, ...getTrafficParams() };
}

export function trackLeadConversion(conversionCode, formData) {
  try {
    orwel.conversion(conversionCode, withUTM(formData));
  } catch {}

  gtag('event', 'generate_lead', {
    event_category: 'lead',
    event_label: conversionCode,
    value: 1,
    ...formData
  });
}

export function trackWhatsAppConversion(source, formData) {
  try {
    orwel.conversion('whatsapp_lead', withUTM({
      ...formData,
      source,
      contact_method: 'whatsapp'
    }));
  } catch {}

  gtag('event', 'whatsapp_contact', {
    event_category: 'lead',
    event_label: source,
    value: 1,
    contact_method: 'whatsapp'
  });
}

export function trackPhoneClick(source) {
  try {
    orwel.track('phone_click', withUTM({ source }));
  } catch {}

  gtag('event', 'phone_click', {
    event_category: 'engagement',
    event_label: source,
    value: 1
  });
}

export function trackCTAClick(ctaId, section) {
  try {
    orwel.track('cta_click', withUTM({ cta_id: ctaId, section }));
  } catch {}

  gtag('event', 'cta_click', {
    event_category: 'engagement',
    event_label: ctaId,
    value: 1,
    section
  });
}

export function setupFormTracking(formElement, formId) {
  if (!formElement) return;
  try {
    orwel.form(formElement, {
      formId,
      trackFocus: true,
      trackInput: true,
      trackChange: true,
      trackSubmit: false,
      trackAbandon: true,
      autoUntrack: true
    });
  } catch {}
}
