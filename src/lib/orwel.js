import { orwel } from "orwel";

let initialized = false;

export function initOrwel() {
  if (initialized) return;
  const key = import.meta.env.PUBLIC_ORWEL_KEY;
  if (!key) return;
  orwel.init({
    apiKey: key,
    autoMonitor: true,
    autoEventDetection: true,
    eventDetectionOptions: {
      enabledCategories: ['navigation'],
      confidenceThreshold: 0.7
    }
  });
  initialized = true;
}

export { orwel };
