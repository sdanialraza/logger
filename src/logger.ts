import { lightBlue, lightGreen, lightRed, red, white, yellow } from "kolorist";
import type { LoggerOptions } from "./types/index.js";
import { formatMessage } from "./util/index.js";

/**
 * The different types of logs that can be used
 *
 * @internal
 */
enum LogType {
  Critical,
  Debug,
  Error,
  Info,
  Warn,
}

/**
 * The options for the private log method
 *
 * @internal
 */
type LogOptions = LoggerOptions & { type?: LogType };

/**
 * A logger class that provides methods for logging messages with different log types.
 *
 * Log types include Critical, Debug, Error, Info, Log, and Warn.
 *
 * Also supports logging to a file and custom timestamps.
 *
 * @example
 * ```ts
 * // Create a new logger instance and log a message
 * const logger = new Logger()
 * logger.log("Hello, world!")
 * ```
 * @example
 * ```ts
 * // Log a message statically
 * Logger.log("Hello, world!")
 * ```
 */
export class Logger {
  /**
   * The default options for the logger
   */
  public options: LoggerOptions;

  /**
   * Creates a new logger instance
   *
   * @param options - The default options for the logger
   * @returns The logger instance
   */
  public constructor(options?: LoggerOptions) {
    if (options) {
      this.options = options;
      return;
    }

    this.options = {
      timestamp: { hour: "2-digit", minute: "2-digit", second: "2-digit", fractionalSecondDigits: 3 },
    };
  }

  /**
   * A private static instance of the logger for static methods
   *
   * @internal
   */
  static readonly #instance = new Logger();

  /**
   * The internal log function
   *
   * @param message - The message to log
   * @param options - The options to use when logging
   * @internal
   */
  #log(message: TemplateStringsArray | string, options: LogOptions): void {
    const messageString = typeof message === "string" ? message : message.join("");
    const timestampOptions = options.timestamp ?? this.options.timestamp;
    const logsFilePath = options.logsFilePath ?? this.options.logsFilePath;

    switch (options.type) {
      case LogType.Critical:
        {
          const formattedMessage = formatMessage({
            logsFilePath,
            logType: "CRITICAL",
            message: messageString,
            timestampOptions,
          });

          console.error(lightRed(formattedMessage));
        }

        break;
      case LogType.Debug:
        {
          const formattedMessage = formatMessage({
            logsFilePath,
            logType: "Debug",
            message: messageString,
            timestampOptions,
          });

          console.debug(lightBlue(formattedMessage));
        }

        break;
      case LogType.Error:
        {
          const formattedMessage = formatMessage({
            logsFilePath,
            logType: "Error",
            message: messageString,
            timestampOptions,
          });

          console.error(red(formattedMessage));
        }

        break;
      case LogType.Info:
        {
          const formattedMessage = formatMessage({
            logsFilePath,
            logType: "Info",
            message: messageString,
            timestampOptions,
          });

          console.info(lightGreen(formattedMessage));
        }

        break;
      case LogType.Warn:
        {
          const formattedMessage = formatMessage({
            logsFilePath,
            logType: "Warn",
            message: messageString,
            timestampOptions,
          });

          console.warn(yellow(formattedMessage));
        }

        break;
      default: {
        const formattedMessage = formatMessage({
          logsFilePath,
          logType: "Log",
          message: messageString,
          timestampOptions,
        });

        console.log(white(formattedMessage));
      }
    }
  }

  /**
   * Sets the default options for the logger
   *
   * @param options - The default options to set
   */
  public setOptions(options: LoggerOptions): void {
    this.options = options;
  }

  /**
   * Logs a critical message
   *
   * @param message - The message to log
   * @param options - The options to use when logging, overriding the default options
   */
  public critical(message: TemplateStringsArray | string, options?: LoggerOptions): void {
    this.#log(message, { ...options, type: LogType.Critical });
  }

  /**
   * Logs a critical message
   *
   * @param message - The message to log
   * @param options - The options to use when logging
   */
  public static critical(message: TemplateStringsArray | string, options?: LoggerOptions): void {
    this.#instance.critical(message, options);
  }

  /**
   * Logs a debug message
   *
   * @param message - The message to log
   * @param options - The options to use when logging, overriding the default options
   */
  public debug(message: TemplateStringsArray | string, options?: LoggerOptions): void {
    this.#log(message, { ...options, type: LogType.Debug });
  }

  /**
   * Logs a debug message
   *
   * @param message - The message to log
   * @param options - The options to use when logging
   */
  public static debug(message: TemplateStringsArray | string, options?: LoggerOptions): void {
    this.#instance.debug(message, options);
  }

  /**
   * Logs an error message
   *
   * @param message - The message to log
   * @param options - The options to use when logging, overriding the default options
   */
  public error(message: TemplateStringsArray | string, options?: LoggerOptions): void {
    this.#log(message, { ...options, type: LogType.Error });
  }

  /**
   * Logs an error message
   *
   * @param message - The message to log
   * @param options - The options to use when logging
   */
  public static error(message: TemplateStringsArray | string, options?: LoggerOptions): void {
    this.#instance.error(message, options);
  }

  /**
   * Logs an info message
   *
   * @param message - The message to log
   * @param options - The options to use when logging, overriding the default options
   */
  public info(message: TemplateStringsArray | string, options?: LoggerOptions): void {
    this.#log(message, { ...options, type: LogType.Info });
  }

  /**
   * Logs an info message
   *
   * @param message - The message to log
   * @param options - The options to use when logging
   */
  public static info(message: TemplateStringsArray | string, options?: LoggerOptions): void {
    this.#instance.info(message, options);
  }

  /**
   * Logs a normal log message
   *
   * @param message - The message to log
   * @param options - The options to use when logging, overriding the default options
   */
  public log(message: TemplateStringsArray | string, options?: LoggerOptions): void {
    this.#log(message, { ...options });
  }

  /**
   * Logs a normal log message
   *
   * @param message - The message to log
   * @param options - The options to use when logging
   */
  public static log(message: TemplateStringsArray | string, options?: LoggerOptions): void {
    this.#instance.log(message, options);
  }

  /**
   * Logs a warn message
   *
   * @param message - The message to log
   * @param options - The options to use when logging, overriding the default options
   */
  public warn(message: TemplateStringsArray | string, options?: LoggerOptions): void {
    this.#log(message, { ...options, type: LogType.Warn });
  }

  /**
   * Logs a warn message
   *
   * @param message - The message to log
   * @param options - The options to use when logging
   */
  public static warn(message: TemplateStringsArray | string, options?: LoggerOptions): void {
    this.#instance.warn(message, options);
  }
}
