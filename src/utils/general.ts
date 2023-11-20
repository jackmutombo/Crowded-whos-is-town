export const logInfo = <T>(arg: T, logType: string = 'INFO') => {
    // Ensure logging is enabled
    if (process.env.REACT_APP_LOG_INFO_ACTIVE === 'true') {
      // Show the logs in the console
      console.log(arg, `*${logType}`);
    }
  };

export const emptyTextFixer = <T>(text: T) => {
  if (text === undefined) return '-';
  return text;
}