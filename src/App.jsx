import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);
  const [snowflakes, setSnowflakes] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Generate snowflakes (fewer on mobile for performance)
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const flakeCount = isMobile ? 30 : 50;
    const flakes = Array.from({ length: flakeCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 3 + Math.random() * 5,
      opacity: 0.3 + Math.random() * 0.7,
      size: isMobile ? 5 + Math.random() * 10 : 5 + Math.random() * 15,
    }));
    setSnowflakes(flakes);
  }, []);

  // Auto-play music on user interaction
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.log("Audio play failed:", err));
      }
    };

    
    //// Try to play immediately
    playAudio();

    // Also play on first user interaction
    document.addEventListener('click', playAudio, { once: true });
    document.addEventListener('touchstart', playAudio, { once: true });

    return () => {
      document.removeEventListener('click', playAudio);
      document.removeEventListener('touchstart', playAudio);
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="page">
      {/* Background Music */}
      <audio
        ref={audioRef}
        loop
        autoPlay
        muted={isMuted}
      >
        <source src="/jingle-bells-445113.mp3" type="audio/mpeg" />
      </audio>

      {/* Music Control Button */}
      <motion.button
        className="music-control"
        onClick={toggleMute}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {isMuted ? "🔇" : "🔊"}
      </motion.button>

      {/* Snowfall */}
      <div className="snowfall">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="snowflake"
            style={{
              left: `${flake.left}%`,
              animationDuration: `${flake.animationDuration}s`,
              opacity: flake.opacity,
              fontSize: `${flake.size}px`,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      {/* Christmas Lights */}
      <div className="lights-container">
        <div className="light red"></div>
        <div className="light green"></div>
        <div className="light blue"></div>
        <div className="light yellow"></div>
        <div className="light red"></div>
        <div className="light green"></div>
        <div className="light blue"></div>
        <div className="light yellow"></div>
        <div className="light red"></div>
        <div className="light green"></div>
      </div>

      {/* Floating Christmas Elements */}
      <div className="floating-decorations">
        <motion.div
          className="floating-item"
          animate={{ y: [-20, 20, -20], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ left: "10%", top: "20%" }}
        >
          🎄
        </motion.div>
        <motion.div
          className="floating-item"
          animate={{ y: [20, -20, 20], rotate: [0, -10, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{ right: "10%", top: "15%" }}
        >
          🎁
        </motion.div>
        <motion.div
          className="floating-item"
          animate={{ y: [-15, 15, -15], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          style={{ left: "5%", bottom: "25%" }}
        >
          ⛄
        </motion.div>
        <motion.div
          className="floating-item"
          animate={{ y: [15, -15, 15], rotate: [0, -15, 15, 0] }}
          transition={{ duration: 4.5, repeat: Infinity }}
          style={{ right: "8%", bottom: "30%" }}
        >
          🔔
        </motion.div>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key="input"
            className="card"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="santa-icon"
            >
              🎅
            </motion.div>
            <motion.h1
              className="title"
              animate={{ textShadow: [
                "0 0 20px #ff0000",
                "0 0 40px #00ff00",
                "0 0 20px #ff0000"
              ]}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Ho Ho Ho! Santa's here
            </motion.h1>
            <p className="subtitle">✨ Santa wants to know your name for a special wish ✨</p>
            
            <div className="input-container">
              <input
                className="input"
                placeholder="🎄 Enter your name here..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && name && setDone(true)}
              />
            </div>

            <motion.button
              className="primaryBtn"
              onClick={() => setDone(true)}
              disabled={!name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={name ? {
                boxShadow: [
                  "0 0 20px #ff0000",
                  "0 0 40px #00ff00",
                  "0 0 20px #ff0000"
                ]
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🎁 Open Santa's Wish 🎁
            </motion.button>

            <div className="decorative-stars">
              <span>⭐</span>
              <span>✨</span>
              <span>⭐</span>
              <span>✨</span>
              <span>⭐</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="message"
            className="card celebration-card"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -180 }}
            transition={{ type: "spring", duration: 1 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="gift-icon"
            >
              🎁
            </motion.div>

            <motion.p
              className="message-header"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              🎁 Santa's Special Message
            </motion.p>

            <motion.h1
              className="title celebration-title"
              animate={{
                scale: [1, 1.05, 1],
                color: ["#FFD700", "#FF6B6B", "#4ECDC4", "#FFD700"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Merry Christmas, {name}! 🎄 and Happy new year 2026
            </motion.h1>
            
            <motion.div
              className="wish-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="wish-message">
                <p><span className="highlight-name">{name}</span>, this year wasn't easy.</p>
                
                <p>There were challenges, ups and downs, moments of doubt —<br/>
yet you showed up and kept moving forward.</p>
                
                <p className="emphasis">That strength matters, <span className="highlight-name">{name}</span>.<br/>
That effort counts more than you realize.</p>
                
                <p>As this year comes to a close,<br/>
may the coming one reward you with success in your work, and ofcourse Money,<br/>
peace at home, and prosperity for your family.</p>
                
                <p>May clarity replace confusion,<br/>
confidence replace fear,<br/>
and joy find you more often than stress. ✨</p>
                
                <p className="emphasis final">You've earned a better year ahead.</p>
              </div>
            </motion.div>

            <div className="celebration-emojis">
              <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 1, repeat: Infinity }}>🎅</motion.span>
              <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 1, delay: 0.2, repeat: Infinity }}>🎄</motion.span>
              <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 1, delay: 0.4, repeat: Infinity }}>🎁</motion.span>
              <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 1, delay: 0.6, repeat: Infinity }}>⛄</motion.span>
              <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 1, delay: 0.8, repeat: Infinity }}>🔔</motion.span>
            </div>

            <motion.div
              className="santa-footer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <p>🎅 Santa says if you <span className="sparkle-text">like</span> this -<br/>
              go back shower with <span className="sparkle-text">likes</span> and <span className="sparkle-text">share</span><br/>
              <span className="handle">@silicontothesoil</span></p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Santa Sleigh Animation */}
      <motion.div
        className="santa-sleigh"
        animate={{ x: [-200, window.innerWidth + 200] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        🛷🦌
      </motion.div>
    </div>
  );
}
