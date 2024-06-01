import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/config';
import { calculateReadTime, formatDate } from '../../utils/helper';
const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const {
    data: blogData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['blogDetails'],
    queryFn: async () => {
      const { data } = await api.get(`/post/${id}`);
      return data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const content = formData.get('content');
    if (!content) {
      return toast.error('Please enter your comment');
    }

    try {
      const res = await api.post(`/comment/create`, {
        content,
        postId: id,
        userId: blogData.userId._id,
      });
      console.log('res', res);
      if (res.status === 200) {
        refetch();
        e.target.reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <Skeleton count={5} />;
  }

  if (isError) {
    return <div>Error loading blog details</div>;
  }

  return (
    <section className="section blog-single">
      <div className="container">
        <div className="row justify-center">
          <div className="lg:col-10">
            <img className="rounded-xl" src="/images/blog-single.png" alt="" />
          </div>
          <div className="mt-10 max-w-[810px] lg:col-9">
            <h1 className="h2">{blogData?.title}</h1>
            <div className="mt-6 mb-5 flex items-center space-x-2 justify-between">
              <div>
                <div className="blog-author-avatar h-[58px] w-[58px] rounded-full border-2 border-primary p-0.5">
                  <img
                    className="blog-author-avatar h-[50px] w-[58px] rounded-full border-2"
                    src={blogData?.userId?.profilePicture}
                    alt=""
                  />
                </div>
                <div className="">
                  <p className="text-dark">{blogData?.userId?.name}</p>
                  <span className="text-sm">
                    {formatDate(blogData?.createdAt)} •{' '}
                    {calculateReadTime(blogData?.long_description)}
                  </span>
                </div>
              </div>
              {/* blog update button */}
              {currentUser && currentUser.id === blogData.userId._id && (
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      navigate(`/blog/update/${id}`);
                    }}
                  >
                    Update Blog
                  </button>
                </div>
              )}
            </div>

            <div className="content">
              <p>{blogData?.long_description}</p>
            </div>
            <div className="comments">
              <h3 className="h5 inline-block border-b-[3px] border-primary font-primary font-medium leading-8">
                Comments
              </h3>
              {blogData?.comments?.length > 0 &&
                blogData?.comments?.map((comment) => (
                  <div
                    className="comment flex space-x-4 border-b border-border py-8"
                    key={comment._id}
                  >
                    <img
                      src={comment.userId.profilePicture}
                      className="h-[50px] w-[50px] rounded-full"
                      alt=""
                    />
                    <div>
                      <h4 className="font-primary text-lg font-medium capitalize">
                        {comment.userId.name}
                      </h4>
                      <p className="mt-2.5">{formatDate(comment.createdAt)}</p>
                      <p className="mt-5">{comment.content}</p>
                    </div>
                  </div>
                ))}
              {blogData?.comments?.length === 0 && (
                <div className="text-center w-full">No comments found</div>
              )}
            </div>
            {
              //Blog owner can't comment on his own blog
              currentUser && currentUser.id == blogData.userId._id ? (
                <p className="text-center text-dark mt-5">
                  You can not comment on your own blog
                </p>
              ) : (
                <form className="comment-form mt-10" onSubmit={handleSubmit}>
                  <p className="mb-4">LEAVE A COMMENT</p>
                  <div className="form-group">
                    <textarea cols="30" rows="10" name="content" />
                  </div>
                  <input
                    type="Submit"
                    className="btn btn-primary mt-8 min-w-[189px] cursor-pointer"
                    defaultValue="Post Comment"
                  />
                </form>
              )
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
