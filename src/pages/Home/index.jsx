import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../../api/config';
import BlogCard from '../../components/blogs/BlogCard';
import {
  calculateReadTime,
  formatDate,
  getisWislistedOrNot,
} from '../../utils/helper.js';
const fetchRecentPosts = async () => {
  const { data } = await api.get('/post/getposts?limit=6');
  return data;
};

const Index = () => {
  const { currentUser } = useSelector((state) => state.user);

  const {
    data: RecentPosts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['RecentPosts'],
    queryFn: fetchRecentPosts,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    if (!email) {
      return toast.error('Please enter your email');
    }

    try {
      const res = await api.post('/newsletter/subscribe', { email });
      if (res.status === 201) {
        toast.success('You have successfully subscribed to our newsletter');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  const { ref: newsletterRef, inView: newsletterInView } = useInView({
    triggerOnce: true,
    threshold: 0.1, // Adjust as needed to trigger earlier/later
  });

  if (isError) {
    return <div>Error loading recent posts</div>;
  }

  return (
    <section className="section pt-0">
      <div className="container">
        {/* Banner Section */}
        <div className="relative w-full h-96 mb-10">
          <img
            className="absolute inset-0 object-cover w-full h-full"
            src="/images/post-11.png" // Replace with your external image URL
            alt="Banner"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Welcome to Our Blog
            </h1>
            <p className="text-lg md:text-2xl mb-6">
              Stay updated with the latest news and articles
            </p>
            <a
              className="btn btn-primary bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
              href="#recent-blogs"
            >
              Explore Now
            </a>
          </div>
        </div>
        <h2 className="h4 mb-4">Recent Blogs</h2>
        <div className="row">
          {isLoading && (
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
          )}
          {RecentPosts && RecentPosts.posts.length > 0
            ? RecentPosts.posts.map((post, index) => (
                <BlogCard
                  key={index}
                  postId={post._id}
                  image={post.image}
                  category={post.category}
                  title={post.title}
                  date={formatDate(post.createdAt)}
                  readTime={`${calculateReadTime(post.long_description)} Min To Read`}
                  short_description={post.short_description}
                  isWishlisted={getisWislistedOrNot(post._id, currentUser)}
                  index={index}
                />
              ))
            : RecentPosts?.posts?.length === 0 &&
              !isLoading && (
                <div className="text-center w-full">No posts found</div>
              )}
        </div>
        {/* Newsletter Section */}
        <motion.div
          ref={newsletterRef}
          initial={{ opacity: 20, y: 20 }}
          animate={{
            opacity: newsletterInView ? 1 : 0,
            y: newsletterInView ? 0 : 20,
          }}
          transition={{ duration: 1.5 }}
          className="newsletter mt-10 bg-gray-100 p-6 rounded-lg text-center"
        >
          <h2 className="text-xl font-semibold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 mb-4">
            Stay updated with the latest news and promotions by subscribing to
            our newsletter.
          </p>
          {/* Newsletter Form (Add your form here) */}
          <form
            className="flex flex-col sm:flex-row items-center justify-center"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              className="w-full sm:w-auto bg-white border border-gray-300 px-4 py-2 rounded-md mr-0 sm:mr-4 mb-2 sm:mb-0"
            />
            <button className="btn btn-primary bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Index;
