/**
 * The options for the logger
 */
export type LoggerOptions = {
  /**
   * The file path to store the logs in
   *
   * A `.log` file is recommended
   */
  logsFilePath?: string
  /**
   * The options for the timestamp
   */
  timestamp?: Intl.DateTimeFormatOptions
}
