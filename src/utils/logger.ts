
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
  private maxLogs = 500; // Reduced from 1000 to improve performance
  private logBuffer: LogEntry[] = [];
  private batchTimeout: NodeJS.Timeout | null = null;

  /**
   * Set the minimum log level
   */
  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  /**
   * Batch log processing to improve performance
   */
  private processBatch(): void {
    if (this.logBuffer.length === 0) return;

    // Add batched logs to main log array
    this.logs.push(...this.logBuffer);
    
    // Trim logs if necessary
    if (this.logs.length > this.maxLogs) {
      this.logs.splice(0, this.logs.length - this.maxLogs);
    }

    // Clear buffer
    this.logBuffer = [];
    this.batchTimeout = null;
  }

  /**
   * Generic log method with batching
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

    // Add to buffer for batching
    this.logBuffer.push(logEntry);

    // Console output with formatting (immediate)
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

    // Batch process logs (debounced)
    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout);
    }
    this.batchTimeout = setTimeout(() => this.processBatch(), 100);
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
    // Process any pending batch before returning logs
    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout);
      this.processBatch();
    }
    return [...this.logs, ...this.logBuffer];
  }

  /**
   * Clear all stored logs
   */
  clearLogs(): void {
    this.logs = [];
    this.logBuffer = [];
    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout);
      this.batchTimeout = null;
    }
  }
}

// Export singleton instance
export const logger = new Logger();
