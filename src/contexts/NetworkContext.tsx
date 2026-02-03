import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { toast } from "sonner";

interface QueuedAction {
  id: string;
  type: string;
  content: string;
  timestamp: Date;
}

interface NetworkContextType {
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  queuedActions: QueuedAction[];
  queueAction: (type: string, content: string) => string;
  syncQueue: () => void;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export function NetworkProvider({ children }: { children: ReactNode }) {
  const [isOffline, setIsOfflineState] = useState(false);
  const [queuedActions, setQueuedActions] = useState<QueuedAction[]>([]);

  const setIsOffline = useCallback((offline: boolean) => {
    setIsOfflineState(offline);
    
    if (offline) {
      toast.warning("Offline Mode active. Actions are being queued locally.", {
        duration: 3000,
      });
    } else if (queuedActions.length > 0) {
      // Sync queued actions when coming back online
      setTimeout(() => {
        setQueuedActions([]);
        toast.success(`Connection Restored. ${queuedActions.length} queued action${queuedActions.length > 1 ? 's' : ''} synced to Cloud.`, {
          duration: 4000,
        });
      }, 500);
    } else {
      toast.success("Connection Restored.", {
        duration: 2000,
      });
    }
  }, [queuedActions.length]);

  const queueAction = useCallback((type: string, content: string): string => {
    const id = crypto.randomUUID();
    setQueuedActions(prev => [...prev, {
      id,
      type,
      content,
      timestamp: new Date(),
    }]);
    return id;
  }, []);

  const syncQueue = useCallback(() => {
    setQueuedActions([]);
  }, []);

  return (
    <NetworkContext.Provider value={{ isOffline, setIsOffline, queuedActions, queueAction, syncQueue }}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error("useNetwork must be used within a NetworkProvider");
  }
  return context;
}
