/**
 * Get string minutes by seconds
 */
export const getFormatCountDown = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const leftSeconds = seconds - minutes * 60;

  const stringMinutes = String(minutes);
  const stringLefSeconds = String(leftSeconds);

  return `${stringMinutes.length < 2 ? '0' : ''}${minutes}:${
    stringLefSeconds.length < 2 ? '0' : ''
  }${leftSeconds}`;
};
