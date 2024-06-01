import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';
import api from '../../api/config.js';
import BlogCard from '../../components/blogs/BlogCard';
import {
  calculateReadTime,
  formatDate,
  getisWislistedOrNot,
} from '../../utils/helper.js';
const fetchAllPosts = async (category, searchTerm) => {
  const params = {};
  if (category) {
    params.category = category;
  }
  if (searchTerm) {
    params.searchTerm = searchTerm;
  }

  const { data } = await api.get('/post/getposts', { params });
  return data;
};

const AllBlogs = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // Debounce search term by 500ms

  const {
    data: AllPosts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['AllPosts', selectedCategory, debouncedSearchTerm],
    queryFn: () => fetchAllPosts(selectedCategory, debouncedSearchTerm),
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTagChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  if (isError) {
    return <div>Error loading recent posts</div>;
  }

  return (
    <section className="section pt-0">
      <div className="container">
        {/* Filter and Search Section */}
        <div className="mb-10 p-6 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            Search and Filter Blogs
          </h2>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full md:w-1/2 bg-white border border-gray-300 px-4 py-2 rounded-md"
            />
            <select
              value={selectedCategory}
              onChange={handleTagChange}
              className="w-full md:w-1/2 bg-white border border-gray-300 px-4 py-2 rounded-md"
            >
              <option value="">All Categories</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Business">Business</option>
            </select>
          </div>
        </div>
        {/* Blog Posts Section */}
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
          {AllPosts &&
            AllPosts.posts.map((post, index) => (
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
            ))}
          {AllPosts?.posts?.length === 0 && isLoading && (
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
          {AllPosts?.posts?.length === 0 && !isLoading && (
            <div className="text-center w-full">No posts found</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllBlogs;
