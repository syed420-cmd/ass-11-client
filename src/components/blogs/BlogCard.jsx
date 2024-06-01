import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/config';
import { signInSuccess } from '../../redux/user/userSlice';

const BlogCard = ({
  postId,
  image,
  category,
  title,
  date,
  readTime,
  short_description,
  isWishlisted,
  index,
}) => {
  const dispatch = useDispatch();
  const handleWishlistClick = async () => {
    try {
      if (isWishlisted) {
        const response = await api.post('/wishlist/remove', { postId });
        if (response.status === 200) {
          toast.success('Post removed from wishlist');
        }
      } else {
        const response = await api.post('/wishlist/add', { postId });
        if (response.status === 200) {
          toast.success('Post added to wishlist');
        }
      }
      const res = await api.get('/user/whoami');
      if (res.data) {
        dispatch(signInSuccess(res.data));
      }
    } catch (error) {
      console.error('Error updating wishlist', error);
    }
  };

  return (
    <div className="mb-8 md:col-6 lg:col-4">
      <motion.div
        key={postId}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: index * 0.3 }}
      >
        <div className="card border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <PhotoView src={image} visible={false}>
            <img
              className="card-img w-full h-52 object-cover"
              src={image}
              alt={title}
            />
          </PhotoView>
          <div className="card-content p-4">
            <div className="card-tags mb-2">
              <Link
                className="tag bg-blue-200 text-blue-800 px-2 py-1 rounded"
                to="#"
              >
                {category}
              </Link>
            </div>
            <h3 className="h4 card-title text-xl font-semibold mb-2">
              <Link to={`/blogs/${postId}`}>{title}</Link>
            </h3>
            <p className="text-gray-600 mb-4">{short_description}</p>
            <div className="card-footer flex justify-between items-center">
              <div className="text-xs text-gray-600 flex space-x-4">
                <span className="inline-flex items-center">
                  <svg
                    className="mr-1.5"
                    width="14"
                    height="16"
                    viewBox="0 0 14 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5 2H11V0.375C11 0.16875 10.8313 0 10.625 0H9.375C9.16875 0 9 0.16875 9 0.375V2H5V0.375C5 0.16875 4.83125 0 4.625 0H3.375C3.16875 0 3 0.16875 3 0.375V2H1.5C0.671875 2 0 2.67188 0 3.5V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V3.5C14 2.67188 13.3281 2 12.5 2ZM12.3125 14.5H1.6875C1.58438 14.5 1.5 14.4156 1.5 14.3125V5H12.5V14.3125C12.5 14.4156 12.4156 14.5 12.3125 14.5Z"
                      fill="#939393"
                    />
                  </svg>
                  {date}
                </span>
                <span className="inline-flex items-center">
                  <svg
                    className="mr-1.5"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.65217 0C3.42496 0 0 3.58065 0 8C0 12.4194 3.42496 16 7.65217 16C11.8794 16 15.3043 12.4194 15.3043 8C15.3043 3.58065 11.8794 0 7.65217 0ZM7.65217 14.4516C4.24264 14.4516 1.48107 11.5645 1.48107 8C1.48107 4.43548 4.24264 1.54839 7.65217 1.54839C11.0617 1.54839 13.8233 4.43548 13.8233 8C13.8233 11.5645 11.0617 14.4516 7.65217 14.4516ZM9.55905 11.0839L6.93941 9.09355C6.84376 9.01935 6.78822 8.90323 6.78822 8.78065V3.48387C6.78822 3.27097 6.95484 3.09677 7.15849 3.09677H8.14586C8.34951 3.09677 8.51613 3.27097 8.51613 3.48387V8.05484L10.5773 9.62258C10.7439 9.74839 10.7778 9.99032 10.6575 10.1645L10.0774 11C9.95708 11.171 9.72567 11.2097 9.55905 11.0839Z"
                      fill="#939393"
                    />
                  </svg>
                  {readTime}
                </span>
              </div>
              <div>
                <button
                  className={`inline-flex items-center px-3 py-2 ${
                    isWishlisted ? 'bg-red-600' : 'bg-gray-400'
                  } text-white text-sm font-medium rounded hover:bg-red-600`}
                  aria-label={
                    isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'
                  }
                  onClick={handleWishlistClick}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {isWishlisted ? (
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    ) : (
                      <path d="M16.5 3C14.76 3 13.09 3.81 12 5.09 10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zM12 19.35l-1.45-1.32C5.4 14.36 2 11.28 2 8.5 2 6.42 3.92 4.5 6 4.5c1.74 0 3.41.81 4.5 2.09C11.09 5.31 12.76 4.5 14.5 4.5 16.58 4.5 18.5 6.42 18.5 8.5c0 2.78-3.4 5.86-8.55 11.54L12 19.35z" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

BlogCard.propTypes = {
  postId: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  readTime: PropTypes.string.isRequired,
  short_description: PropTypes.string.isRequired,
  isWishlisted: PropTypes.bool.isRequired,
};

export default BlogCard;
