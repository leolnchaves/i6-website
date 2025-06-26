
/**
 * Debug panel component for development environment
 * Displays performance metrics, logs, and system information
 */

import { useState, useEffect } from 'react';
import { logger, LogLevel, LogEntry } from '@/utils/logger';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { X, ChevronDown, ChevronRight, Bug, Activity, Info } from 'lucide-react';

const DebugPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [selectedLogLevel, setSelectedLogLevel] = useState<LogLevel>(LogLevel.DEBUG);
  const [expandedLogs, setExpandedLogs] = useState<Set<number>>(new Set());

  // Update logs every second
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setLogs(logger.getLogs());
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Filter logs by selected level
  const filteredLogs = logs.filter(log => log.level >= selectedLogLevel);

  const toggleLogExpansion = (index: number) => {
    const newExpanded = new Set(expandedLogs);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedLogs(newExpanded);
  };

  const getLevelBadgeColor = (level: LogLevel) => {
    switch (level) {
      case LogLevel.DEBUG: return 'bg-gray-500';
      case LogLevel.INFO: return 'bg-blue-500';
      case LogLevel.WARN: return 'bg-yellow-500';
      case LogLevel.ERROR: return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getLevelName = (level: LogLevel) => {
    switch (level) {
      case LogLevel.DEBUG: return 'DEBUG';
      case LogLevel.INFO: return 'INFO';
      case LogLevel.WARN: return 'WARN';
      case LogLevel.ERROR: return 'ERROR';
      default: return 'UNKNOWN';
    }
  };

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      {/* Debug toggle button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-50 p-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg transition-all duration-300"
          title="Open Debug Panel"
        >
          <Bug size={20} />
        </button>
      )}

      {/* Debug panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-end p-4">
          <Card className="w-full max-w-2xl h-3/4 bg-white shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <div className="flex items-center gap-2">
                <Bug size={20} className="text-orange-500" />
                <h3 className="font-semibold">Debug Panel</h3>
                <Badge variant="outline" className="text-xs">
                  DEV
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X size={16} />
              </Button>
            </div>

            {/* Content */}
            <div className="flex flex-col h-full">
              {/* Controls */}
              <div className="p-4 border-b space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity size={16} />
                    <span className="text-sm font-medium">System Info</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {navigator.userAgent.includes('Chrome') ? 'Chrome' : 'Other'} • 
                    {window.innerWidth}x{window.innerHeight} • 
                    React {React.version}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Info size={16} />
                    <span className="text-sm font-medium">Log Level</span>
                  </div>
                  <select
                    value={selectedLogLevel}
                    onChange={(e) => setSelectedLogLevel(Number(e.target.value) as LogLevel)}
                    className="text-xs border rounded px-2 py-1"
                  >
                    <option value={LogLevel.DEBUG}>DEBUG</option>
                    <option value={LogLevel.INFO}>INFO</option>
                    <option value={LogLevel.WARN}>WARN</option>
                    <option value={LogLevel.ERROR}>ERROR</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => logger.clearLogs()}
                  >
                    Clear Logs
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const logsText = filteredLogs.map(log => 
                        `[${log.timestamp}] ${getLevelName(log.level)} ${log.component ? `[${log.component}] ` : ''}${log.message}${log.data ? '\n' + JSON.stringify(log.data, null, 2) : ''}`
                      ).join('\n\n');
                      navigator.clipboard.writeText(logsText);
                    }}
                  >
                    Copy Logs
                  </Button>
                </div>
              </div>

              {/* Logs */}
              <div className="flex-1 overflow-auto p-4 space-y-2">
                {filteredLogs.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    No logs available
                  </div>
                ) : (
                  filteredLogs.slice(-50).reverse().map((log, index) => (
                    <div key={index} className="border rounded p-2 text-xs">
                      <Collapsible>
                        <CollapsibleTrigger
                          onClick={() => toggleLogExpansion(index)}
                          className="w-full text-left"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {expandedLogs.has(index) ? 
                                <ChevronDown size={12} /> : 
                                <ChevronRight size={12} />
                              }
                              <Badge className={`text-xs ${getLevelBadgeColor(log.level)} text-white`}>
                                {getLevelName(log.level)}
                              </Badge>
                              {log.component && (
                                <Badge variant="outline" className="text-xs">
                                  {log.component}
                                </Badge>
                              )}
                              <span className="truncate">{log.message}</span>
                            </div>
                            <span className="text-gray-400 text-xs">
                              {new Date(log.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          {log.data && (
                            <pre className="mt-2 p-2 bg-gray-50 rounded text-xs overflow-auto">
                              {JSON.stringify(log.data, null, 2)}
                            </pre>
                          )}
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default DebugPanel;
