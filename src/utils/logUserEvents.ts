import amplitude from 'amplitude-js';

export const logUserEvents = (event: string) => {
  amplitude.getInstance().logEvent(event);
};
