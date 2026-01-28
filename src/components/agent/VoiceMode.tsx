import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, X, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VoiceModeProps {
  open: boolean;
  onClose: () => void;
}

const simulatedTranscript = [
  { speaker: "Agent", text: "How can I help you today with your account?" },
  { speaker: "Customer", text: "I received an invoice for twelve hundred dollars but I think there was an error." },
  { speaker: "Agent", text: "Let me look into that for you. I can see there was a service delay that qualifies for a credit." },
  { speaker: "Customer", text: "That would be great. Can we also set up a payment plan?" },
];

export function VoiceMode({ open, onClose }: VoiceModeProps) {
  const [transcriptIndex, setTranscriptIndex] = useState(0);
  const [displayedTranscript, setDisplayedTranscript] = useState<typeof simulatedTranscript>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Waveform animation
  useEffect(() => {
    if (!open || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bars = 50;
    const barWidth = canvas.width / bars;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "hsl(var(--primary))";

      for (let i = 0; i < bars; i++) {
        const height = Math.random() * (canvas.height * 0.8) + canvas.height * 0.1;
        const x = i * barWidth;
        const y = (canvas.height - height) / 2;
        
        ctx.beginPath();
        ctx.roundRect(x + 1, y, barWidth - 2, height, 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [open]);

  // Simulated transcript
  useEffect(() => {
    if (!open) {
      setTranscriptIndex(0);
      setDisplayedTranscript([]);
      return;
    }

    const interval = setInterval(() => {
      setTranscriptIndex((prev) => {
        if (prev >= simulatedTranscript.length) {
          return prev;
        }
        setDisplayedTranscript((dt) => [...dt, simulatedTranscript[prev]]);
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [open]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          <X className="w-6 h-6" />
        </Button>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 glow-primary">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Mic className="w-12 h-12 text-primary" />
            </motion.div>
          </div>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xl font-semibold text-primary"
          >
            Cortex Voice Listening...
          </motion.p>
        </motion.div>

        {/* Waveform Visualization */}
        <div className="w-full max-w-2xl px-8 mb-8">
          <canvas
            ref={canvasRef}
            width={600}
            height={100}
            className="w-full h-[100px] rounded-xl bg-card/50"
          />
        </div>

        {/* Live Transcript */}
        <div className="w-full max-w-2xl px-8">
          <div className="flex items-center gap-2 mb-4">
            <Volume2 className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Live Transcript</span>
          </div>
          <div className="glass-card rounded-xl p-4 h-[200px] overflow-auto">
            <AnimatePresence>
              {displayedTranscript.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-3 ${line.speaker === "Agent" ? "text-right" : "text-left"}`}
                >
                  <span className="text-xs text-muted-foreground block mb-1">
                    {line.speaker}
                  </span>
                  <span className={`inline-block px-3 py-2 rounded-xl text-sm ${
                    line.speaker === "Agent" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  }`}>
                    {line.text}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {displayedTranscript.length === 0 && (
              <motion.p
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-center text-muted-foreground text-sm"
              >
                Waiting for speech...
              </motion.p>
            )}
          </div>
        </div>

        <Button
          variant="outline"
          onClick={onClose}
          className="mt-8"
        >
          End Voice Session
        </Button>
      </motion.div>
    </AnimatePresence>
  );
}
