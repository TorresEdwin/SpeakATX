import { Link } from 'react-router-dom';

const MyButton = ({ targetPage, buttonText }) => {
  return (
    <Link to={targetPage}>
      <button className="btn btn-primary">
        {buttonText}
      </button>
    </Link>
  );
};

export default MyButton;
