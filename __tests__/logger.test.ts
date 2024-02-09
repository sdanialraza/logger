import { readFile, unlink } from "node:fs/promises"
import { setTimeout } from "node:timers/promises"
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest"
import { Logger } from "../src/logger.js"

describe("Logger", () => {
  const consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => undefined)
  const consoleDebugMock = vi.spyOn(console, "debug").mockImplementation(() => undefined)
  const consoleInfoMock = vi.spyOn(console, "info").mockImplementation(() => undefined)
  const consoleLogMock = vi.spyOn(console, "log").mockImplementation(() => undefined)
  const consoleWarnMock = vi.spyOn(console, "warn").mockImplementation(() => undefined)

  let logger: Logger

  beforeAll(() => {
    logger = new Logger()
  })

  afterAll(async () => {
    consoleErrorMock.mockRestore()
    consoleDebugMock.mockRestore()
    consoleInfoMock.mockRestore()
    consoleLogMock.mockRestore()
    consoleWarnMock.mockRestore()

    await unlink("./test.log")
  })

  it("should set the options", () => {
    const newLogger = new Logger()

    expect(newLogger.options.logsFilePath).toBe(undefined)

    newLogger.setOptions({ logsFilePath: "./test.log", timestamp: { hour12: true } })
    expect(newLogger.options.logsFilePath).toBe("./test.log")
    expect(newLogger.options.timestamp).toStrictEqual({ hour12: true })
  })
  it("should log a critical message", () => {
    logger.critical("A critical message")

    expect(consoleErrorMock).toHaveBeenCalledWith(expect.stringContaining("[CRITICAL] A critical message"))
  })
  it("should log a debug message", () => {
    logger.debug("A debug message")

    expect(consoleDebugMock).toHaveBeenCalledWith(expect.stringContaining("[Debug] A debug message"))
  })
  it("should log an error message statically", () => {
    Logger.error("A static error message")

    expect(consoleErrorMock).toHaveBeenCalledWith(expect.stringContaining("[Error] A static error message"))
  })
  it("should log an info message statically", () => {
    Logger.info("A static info message")

    expect(consoleInfoMock).toHaveBeenCalledWith(expect.stringContaining("[Info] A static info message"))
  })
  it("should log and store a normal log message", async () => {
    logger.log("A normal log message", { logsFilePath: "./test.log" })

    await setTimeout(500)

    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining("[Log] A normal log message"))

    const file = await readFile("./test.log", "utf8")

    expect(file).toContain("[Log] A normal log message")
  })
  it("should log and store a warning message", async () => {
    logger.warn("A warning message", { logsFilePath: "./test.log" })

    await setTimeout(500)

    expect(consoleWarnMock).toHaveBeenCalledWith(expect.stringContaining("[Warn] A warning message"))

    const file = await readFile("./test.log", "utf8")

    expect(file).toContain("[Warn] A warning message")
  })
})
