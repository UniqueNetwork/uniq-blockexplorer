export const scrollLock = () => {
  document.getElementsByTagName('body')[0].style.overflow = 'hidden';
};

export const scrollUnlock = () => {
  document.getElementsByTagName('body')[0].style.overflow = 'unset';
};
