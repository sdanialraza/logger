import { appendFile } from "node:fs";
import { gray, stripColors } from "kolorist";

/**
 * Logs an error to the console if there's one.
 *
 * @param error - The error to log
 * @internal
 */
export function logError(error: unknown | null): void {
  if (error) {
    console.error(error);
  }
}

/**
 * The options for the formatMessage function
 *
 * @internal
 */
export type FormatMessageOptions = {
  logType: "CRITICAL" | "Debug" | "Error" | "Info" | "Log" | "Warn";
  logsFilePath: string | undefined;
  message: string;
  timestampOptions: Intl.DateTimeFormatOptions | undefined;
};

/**
 * Formats the message to be logged
 *
 * @param options - The options to use when formatting the message
 * @returns The formatted message
 * @internal
 */
export function formatMessage(options: FormatMessageOptions): string {
  const { logType, logsFilePath, message, timestampOptions } = options;

  const fileTime = gray(`[${new Date().toISOString()}]`);
  const logTime = gray(`[${new Date().toLocaleTimeString(undefined, timestampOptions)}]`);

  const formattedMessage = `${logTime} [${logType}] ${message}`;

  if (logsFilePath) {
    appendFile(logsFilePath, `${stripColors(formattedMessage.replace(logTime, fileTime))}\n`, logError);
  }

  return formattedMessage;
}
