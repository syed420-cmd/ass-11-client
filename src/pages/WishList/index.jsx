import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../api/config';
import BlogCard from '../../components/blogs/BlogCard';
import { calculateReadTime, getisWislistedOrNot } from '../../utils/helper';

const fetchWishlist = async () => {
  const { data } = await api.get('/wishlist');
  return data;
};

const Wishlist = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const {
    data: wishlist,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['wishlist'],
    queryFn: fetchWishlist,
  });

  if (isError) {
    return <div>Error loading wishlist</div>;
  }

  return (
    <section className="section pt-0">
      <div className="container">
        <div className="mb-10 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            My Wishlist ({wishlist?.length || 0})
          </h2>
        </div>
        {isLoading ? (
          <div className="w-full">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="mb-4">
                <Skeleton height={200} />
                <Skeleton height={20} width="80%" />
                <Skeleton height={20} width="60%" />
                <Skeleton height={20} width="40%" />
              </div>
            ))}
          </div>
        ) : wishlist?.length > 0 ? (
          <div className="row">
            {wishlist.map((post, index) => (
              <BlogCard
                key={post._id}
                postId={post._id}
                image={post.image}
                category={post.category}
                title={post.title}
                date={post.createdAt}
                readTime={`${calculateReadTime(post.long_description)} Min To Read`}
                short_description={post.short_description}
                isWishlisted={getisWislistedOrNot(post._id, currentUser)}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-full flex-col">
            <p className="text-center text-gray-600 text-xl">
              No items in wishlist. Start adding your favorite posts!
            </p>
            <div className="flex justify-center items-center mt-5">
              <button
                className="btn btn-primary bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                onClick={() => navigate('/all-blogs')}
              >
                Explore Blogs
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
