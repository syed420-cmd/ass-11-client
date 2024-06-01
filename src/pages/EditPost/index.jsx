import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Alert, FileInput } from 'flowbite-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/config';

const UpdateBlog = () => {
  const [imageUploadError, setImageUploadError] = useState(null);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    category: '',
    shortDescription: '',
    longDescription: '',
    newImage: '',
  });

  // Use useQuery to fetch the blog post data
  const { data, error, isLoading } = useQuery({
    queryKey: ['blogPost', id],
    queryFn: async () => {
      const { data } = await api.get(`/post/${id}`);
      setFormData({
        title: data.title,
        image: data.image,
        category: data.category,
        shortDescription: data.short_description,
        longDescription: data.long_description,
      });
      return data;
    },
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'imgUrl' && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result,
        }));
      };

      reader.readAsDataURL(file);
      formData.newImage = 'yes';
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Handle form submission, e.g., send data to an API
      const response = await api.put(
        `/post/updatepost/${id}/${data.userId._id}`,
        formData,
      );
      if (response.status === 200) {
        // Invalidate and refetch
        toast.success('Blog post updated successfully');
        queryClient.invalidateQueries(['blogPost', id]);
      }
    } catch (error) {
      console.log('Error updating blog post:', error);
    }
  };

  const handleUpdloadImage = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }

      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setFormData({
          ...formData,
          image: fileReader.result,
        });
      };
      fileReader.readAsDataURL(file);
    } catch (error) {
      setImageUploadError('Image upload failed');
      console.log(error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching blog post: {error.message}</div>;

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-4xl font-bold mb-6">
            Update Blog Post
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 bg-white p-6 rounded-lg shadow-lg"
        >
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
              id="title"
              name="title"
              type="text"
              placeholder="Enter blog title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Business">Business</option>
            </select>
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="shortDescription"
            >
              Short Description
            </label>
            <textarea
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
              id="shortDescription"
              name="shortDescription"
              placeholder="Enter short description"
              value={formData.shortDescription}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="longDescription"
            >
              Long Description
            </label>
            <textarea
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
              id="longDescription"
              name="longDescription"
              placeholder="Enter long description"
              value={formData.longDescription}
              onChange={handleChange}
              required
              rows="6"
            />
          </div>
          <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <FileInput
              type="file"
              accept="image/*"
              onChange={handleUpdloadImage}
            />
          </div>
          {imageUploadError && (
            <Alert color="failure">{imageUploadError}</Alert>
          )}
          {formData.image && (
            <img
              src={formData.image}
              alt="upload"
              className="w-full h-72 object-cover"
            />
          )}
          <div className="text-center">
            <button
              className="btn btn-primary bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateBlog;
