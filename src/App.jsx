import React, { useState, useRef, useEffect } from "react";
import { Heart, Gift, PartyPopper, Music, Moon, Sun, Play } from "lucide-react";

const App = () => {
  const [showFullMessage, setShowFullMessage] = useState(false);
  const [name, setName] = useState("Kunjuuuss");
  const [darkMode, setDarkMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [birthdayStarted, setBirthdayStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  const audioRef = useRef(null);

  const primaryColor = darkMode ? "#FFD700" : "#FF69B4";
  const secondaryColor = darkMode ? "#FF69B4" : "#FFD700";

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMessage = () => {
    setShowFullMessage(!showFullMessage);
  };

  const calculateTimeLeft = () => {
    const now = new Date();
    const birthdayTime = new Date(now.getFullYear(), 11, 15, 0, 0, 0); // December 15th

    if (now > birthdayTime) {
      birthdayTime.setFullYear(now.getFullYear() + 1); // Move to next year
    }

    const difference = birthdayTime - now;

    if (difference <= 0) {
      setBirthdayStarted(true);
      setTimeLeft("");
    } else {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }
  };

  useEffect(() => {
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
        minHeight: "100vh",
        color: darkMode ? "black" : "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
        position: "relative",
        transition: "background 0.5s ease",
        padding: "20px",
      }}
    >
      {/* Background Music */}
      <audio ref={audioRef} preload="auto">
        <source
          src="https://res.cloudinary.com/dozsrgs3w/video/upload/v1734192680/gwalsqrg4ffc5m7ydbkf.mp3"
          type="audio/mp3"
        />
        Your browser does not support the audio element.
      </audio>

      {/* Dark Mode & Audio Controls */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.5rem",
          }}
          onClick={toggleDarkMode}
        >
          {darkMode ? <Sun color={secondaryColor} /> : <Moon color={secondaryColor} />}
        </button>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.5rem",
          }}
          onClick={toggleAudio}
        >
          {isPlaying ? (
            <Music color={secondaryColor} />
          ) : (
            <Play color={secondaryColor} />
          )}
        </button>
      </div>

      {/* Name Input */}
      <input
        type="text"
        placeholder="Enter name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          marginBottom: "20px",
          padding: "10px",
          borderRadius: "10px",
          border: "none",
          outline: "none",
          fontSize: "1rem",
          width: "90%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      />

      {/* Countdown Timer */}
      {!birthdayStarted && (
        <div style={{ marginBottom: "20px", fontSize: "1.25rem" }}>
          <p>🎉 Richu janikkaan poon!: {timeLeft} 🎉</p>

        </div>
      )}

      {/* Birthday Card */}
      {birthdayStarted && (
        <div
          onClick={toggleMessage}
          style={{
            backgroundColor: "rgba(255,255,255,0.2)",
            padding: "20px",
            borderRadius: "15px",
            maxWidth: "90%",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            transform: showFullMessage ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 1s",
            perspective: "1000px",
            cursor: "pointer",
          }}
        >
          {!showFullMessage ? (
            <div>
              <h1
                style={{
                  fontSize: "2rem",
                  marginBottom: "15px",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                Happy 23rd Birthday, {name}!
                <Heart
                  style={{
                    display: "inline-block",
                    marginLeft: "10px",
                  }}
                  color={secondaryColor}
                  size={36}
                  fill={primaryColor}
                />
              </h1>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  margin: "15px 0",
                  flexWrap: "wrap",
                }}
              >
                <PartyPopper size={48} color={primaryColor} />
                <Gift size={48} color={secondaryColor} />
                <PartyPopper size={48} color={primaryColor} />
              </div>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: "1rem" }}>
                🎉പ്രിയപ്പെട്ട റിച്ചൂസിന്,
കൂടെ നിന്നതിനും ഒരുപാട് എനിക്ക് വേണ്ടി ഇപ്പോഴും സഹിക്കുന്നതിനും നന്ദി!
മരണം വരെയും സന്തോഷത്തോടെ ഒരുമിച്ച് ജീവിക്കാൻ പറ്റട്ടെ എന്നു അല്ലാഹുവിനോട് പ്രാർത്ഥിക്കുന്നു..മുകളിൽ ഓഡിയോ ബട്ടണിൽ നിനക്കായി ഒരു സമ്മാനം വച്ചിട്ടുണ്ട്, മറക്കാതെ കേൾക്കണം.  
ഒരുപാടധികം സ്നേഹത്തോടെ,
നിന്റെ ബന്നക്കാക്ക 
 💖🎂
              </p>
            </div>
          )}
        </div>
      )}

      {/* Balloons */}
      <div className="floating-balloons">
        {Array.from({ length: 15 }).map((_, index) => (
          <div key={index} className="balloon" />
        ))}
      </div>

      {/* Responsive Styles */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(100vh); }
          100% { transform: translateY(-10vh); }
        }

        .floating-balloons .balloon {
          position: absolute;
          bottom: -50px;
          width: 20px;
          height: 30px;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          animation: float 10s linear infinite;
          left: calc(10% + 80% * random());
        }

        @media (min-width: 768px) {
          .floating-balloons .balloon {
            width: 40px;
            height: 60px;
          }
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 1.5rem;
          }

          .floating-balloons .balloon {
            width: 15px;
            height: 25px;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
