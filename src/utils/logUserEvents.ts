import amplitude from 'amplitude-js';

export const logUserEvents = (event: string) => {
  if (process.env.NODE_ENV !== 'development') {
    amplitude.getInstance().logEvent(event);
  }
};
