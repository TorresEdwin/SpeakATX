import { Link } from 'react-router-dom';

const MyButton = ({ targetPage, buttonText }) => {
  return (
        <Link to={targetPage}>
          <button 
            className="btn btn-primary" 
            style={{
              backgroundColor: "#bf5700",
              outline: "none",
              border: "none",
              boxShadow: "none",
              transition: "transform 0.1s ease-in-out",
            }}
            onMouseDown={(e) => e.target.style.transform = "scale(0.95)"}
            onMouseUp={(e) => e.target.style.transform = "scale(1)"}
            >
            {buttonText}
          </button>
        </Link>
    );
};

export default MyButton;
