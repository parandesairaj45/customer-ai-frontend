import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';

/**
 * SpeechMicButton
 * Native Web Speech API speech-to-text button.
 * Inserts transcribed text into input without automatically sending.
 * Does NOT store or upload audio anywhere.
 */
export const SpeechMicButton = ({ onTranscript, className = '', title = 'Dictate with microphone' }) => {
  const [isListening, setIsListening] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore cleanup errors
        }
      }
    };
  }, []);

  const toggleListening = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErrorMessage('Speech recognition is not supported in this browser. Please use Google Chrome, Microsoft Edge, or Safari.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = navigator.language || 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setErrorMessage('');
      };

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript;
          }
        }
        if (!transcript && event.results[0] && event.results[0][0]) {
          transcript = event.results[0][0].transcript;
        }

        const trimmed = transcript.trim();
        if (trimmed && onTranscript) {
          onTranscript(trimmed);
        }
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setErrorMessage('Microphone access was denied. Please allow microphone permissions in your browser address bar.');
        } else if (event.error === 'no-speech') {
          // No speech detected, quietly end
        } else {
          setErrorMessage(`Speech recognition error (${event.error}). Please try again.`);
        }
        setTimeout(() => setErrorMessage(''), 5000);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.warn('SpeechRecognition failed to start:', err);
      setIsListening(false);
      setErrorMessage('Unable to activate microphone. Please verify browser permissions.');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <button
        type="button"
        onClick={toggleListening}
        title={
          !isSupported
            ? 'Speech recognition not supported in this browser'
            : isListening
            ? 'Listening... Click to stop dictating'
            : title
        }
        aria-label={isListening ? 'Stop listening' : 'Start voice dictation'}
        className={`relative p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
          isListening
            ? 'bg-red-500/20 text-red-400 border border-red-500/60 shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-pulse'
            : 'bg-[#181a22] text-[var(--text-muted)] hover:text-[var(--orange-bright)] border border-[var(--border-subtle)] hover:border-[var(--orange-vibrant)]/60 hover:shadow-[0_0_10px_rgba(255,106,0,0.2)]'
        }`}
      >
        {isListening ? (
          <div className="relative flex items-center justify-center">
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <Mic size={15} className="text-red-400" />
          </div>
        ) : !isSupported ? (
          <MicOff size={15} className="opacity-50 text-[var(--text-muted)]" />
        ) : (
          <Mic size={15} />
        )}
      </button>

      {/* Floating Listening Indicator Badge */}
      {isListening && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-full bg-red-950/90 border border-red-500/50 text-red-200 text-[11px] font-mono shadow-lg flex items-center gap-1.5 pointer-events-none z-30 animate-card-in">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
          <span>Listening... speak now</span>
        </div>
      )}

      {/* Floating Error Message Toast */}
      {errorMessage && (
        <div className="absolute bottom-full mb-2 right-0 max-w-xs whitespace-normal p-2.5 rounded-xl bg-[#1c1313] border border-red-500/50 text-red-300 text-xs shadow-xl flex items-start gap-2 z-40 animate-card-in">
          <AlertCircle size={15} className="shrink-0 text-red-400 mt-0.5" />
          <span className="leading-tight">{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default SpeechMicButton;
