import notFoundImgPath from '../assets/images/404.jpeg';
import '../assets/styles/notFound.css';

function NotFound() {
    return (
        <div>
            <img className="not-found" src={notFoundImgPath} alt="" />
        </div>
    );
};

export { NotFound };
