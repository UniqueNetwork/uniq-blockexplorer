// Calculate how much time passed (ex. 10seconds, 5 hours, 3 days, 25weeks)
const timeDifference = (when: number, sinceWhen: number | null = null) => {
  const currentDate = new Date();
  const currentUtcDate = new Date(
    currentDate.getUTCFullYear(),
    currentDate.getUTCMonth(),
    currentDate.getUTCDate(),
    currentDate.getUTCHours(),
    currentDate.getUTCMinutes(),
    currentDate.getUTCSeconds(),
  );
  const currentUtcTime = sinceWhen || currentUtcDate.getTime();

  // https://stackoverflow.com/questions/16767301/calculate-difference-between-2-timestamps-using-javascript
  let difference = currentUtcTime - when;

  const daysDifference = Math.floor(difference / 60 / 60 / 24);

  difference -= daysDifference * 60 * 60 * 24;

  const hoursDifference = Math.floor(difference / 60 / 60);

  difference -= hoursDifference * 60 * 60;

  const minutesDifference = Math.floor(difference / 60);

  difference -= minutesDifference * 60;

  // just an example, later on oculd be extended to calculate time difference (trying to avoid any external libs for this matter)
  let amount = minutesDifference;
  let timeType = 'minute';

  if (hoursDifference >= 1) {
    timeType = 'hour';
    amount = hoursDifference;
  }

  if (daysDifference >= 1) {
    timeType = 'day';
    amount = daysDifference;
  }

  if (daysDifference >= 7) {
    timeType = 'week';
    amount = Math.round(daysDifference / 7);
  }

  if (amount < 1 && timeType === 'second') return 'Less than a second ago';

  // shrink 'second' and 'minute' to 'sec' and 'min'
  if (timeType === 'second' || timeType === 'minute')
    return `${amount} ${timeType.substr(0, 3)} ago`;

  return `${amount} ${timeType}${amount >= 2 ? 's' : ''} ago`;
};

const timestampFormat = (timestamp: number | undefined) => {
  if (!timestamp) return 'undefined';

  return new Date(timestamp * 1000).toLocaleString('en-US', {
    day: '2-digit',
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
    month: 'long',
    second: 'numeric',
    timeZone: 'GMT',
    timeZoneName: 'short',
    year: 'numeric',
  });
};

const tokenPageTimestampFormat = (timestamp: number | undefined) => {
  if (!timestamp) return 'undefined';

  const localeStringSplitted = new Date(timestamp * 1000)
    .toLocaleString('en-US', {
      day: '2-digit',
      hour: '2-digit',
      hour12: false,
      minute: '2-digit',
      month: 'short',
      second: 'numeric',
      timeZone: 'GMT',
      timeZoneName: 'short',
      year: 'numeric',
    })
    .split(',');
  // convert "Sep 13" to "13 Sep"
  localeStringSplitted[1] = `${localeStringSplitted[0].split(' ')[1]} ${
    localeStringSplitted[0].split(' ')[0]
  } ${localeStringSplitted[1]}`;
  localeStringSplitted.shift();
  return localeStringSplitted.join(',');
};

const timestampTableFormat = (timestamp: number) => {
  const formatted = new Date(timestamp * 1000)
    .toLocaleString('en-GB', {
      hour12: false,
      timeZone: 'GMT',
    })
    .replaceAll('/', '-');

  if (formatted.includes('01-01-1970')) {
    return 'date is uploading';
  }

  return formatted;
};

export {
  timeDifference,
  timestampFormat,
  timestampTableFormat,
  tokenPageTimestampFormat,
};
