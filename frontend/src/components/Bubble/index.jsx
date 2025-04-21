import React from "react";

const countryCodes = ["es", "in", "fr", "kr", "eg", "ph", "cn", "vn", "de"];

const SpeechBubbleBackground = () => {
  return (
    <div className="speech-bubble-container">
      {[...Array(10)].map((_, i) => {
        const code = countryCodes[i % countryCodes.length];
        const flagUrl = `https://flagcdn.com/w80/${code}.png`; // 80px wide SVG
        return (
          <div key={i} className={`bubble bubble-${i % 5}`}>
            <img
              src={flagUrl}
              alt={`Flag of ${code.toUpperCase()}`}
              className="flag-img"
            />
          </div>
        );
      })}
    </div>
  );
};

export default SpeechBubbleBackground;
