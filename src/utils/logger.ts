
/**
 * Centralized logging utility for the application
 * Provides different log levels and formatted output for debugging
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  component?: string;
}

class Logger {
  private logLevel: LogLevel = process.env.NODE_ENV === 'development' ? LogLevel.DEBUG : LogLevel.INFO;
  private logs: LogEntry[] = [];
  private maxLogs = 1000;

  /**
   * Set the minimum log level
   */
  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  /**
   * Generic log method
   */
  private log(level: LogLevel, message: string, data?: any, component?: string): void {
    if (level < this.logLevel) return;

    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      component,
    };

    // Add to internal log storage
    this.logs.push(logEntry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Console output with formatting
    const levelColors = {
      [LogLevel.DEBUG]: 'color: #888;',
      [LogLevel.INFO]: 'color: #0066cc;',
      [LogLevel.WARN]: 'color: #ff9900;',
      [LogLevel.ERROR]: 'color: #cc0000;',
    };

    const levelNames = {
      [LogLevel.DEBUG]: 'DEBUG',
      [LogLevel.INFO]: 'INFO',
      [LogLevel.WARN]: 'WARN',
      [LogLevel.ERROR]: 'ERROR',
    };

    const prefix = `%c[${levelNames[level]}] ${component ? `[${component}] ` : ''}${message}`;
    
    if (data) {
      console.log(prefix, levelColors[level], data);
    } else {
      console.log(prefix, levelColors[level]);
    }
  }

  /**
   * Debug level logging
   */
  debug(message: string, data?: any, component?: string): void {
    this.log(LogLevel.DEBUG, message, data, component);
  }

  /**
   * Info level logging
   */
  info(message: string, data?: any, component?: string): void {
    this.log(LogLevel.INFO, message, data, component);
  }

  /**
   * Warning level logging
   */
  warn(message: string, data?: any, component?: string): void {
    this.log(LogLevel.WARN, message, data, component);
  }

  /**
   * Error level logging
   */
  error(message: string, data?: any, component?: string): void {
    this.log(LogLevel.ERROR, message, data, component);
  }

  /**
   * Get all stored logs
   */
  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  /**
   * Clear all stored logs
   */
  clearLogs(): void {
    this.logs = [];
  }
}

// Export singleton instance
export const logger = new Logger();
