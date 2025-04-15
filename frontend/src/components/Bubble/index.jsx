import React from "react";

const SpeechBubbleBackground = () => {
  return (
    <div className="speech-bubble-container">
      {[...Array(10)].map((_, i) => (
        <div key={i} className={`bubble bubble-${i % 5}`} >
            <img src="/edwin.jpg" alt="edwin" className="bubble-img" />
        </div>
      ))}
    </div>
  );
};

export default SpeechBubbleBackground;
