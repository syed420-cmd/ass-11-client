/* eslint-disable no-unused-vars */
import { Alert, FileInput } from 'flowbite-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api/config.js';
const AddBlog = () => {
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    category: '',
    short_description: '',
    long_description: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.title ||
        !formData.category ||
        !formData.short_description ||
        !formData.long_description
      ) {
        setImageUploadError('Please fill all fields');
        return;
      }
      if (!formData.image) {
        setImageUploadError('Please select an image');
        return;
      }
      const response = await api.post('/post/create', formData);
      if (response.status === 201) {
        setFormData({
          title: '',
          image: '',
          category: '',
          short_description: '',
          long_description: '',
        });

        setImageUploadError(null);
        toast.success('Blog post created successfully');
      }
    } catch (error) {
      console.log(error);
      setImageUploadError('Failed to create blog post');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-4xl font-bold mb-6">Add Blog Post</h1>
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
              htmlFor="short_description"
            >
              Short Description
            </label>
            <textarea
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
              id="short_description"
              name="short_description"
              placeholder="Enter short description"
              value={formData.short_description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="long_description"
            >
              Long Description
            </label>
            <textarea
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
              id="long_description"
              name="long_description"
              placeholder="Enter long description"
              value={formData.long_description}
              onChange={handleChange}
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddBlog;
