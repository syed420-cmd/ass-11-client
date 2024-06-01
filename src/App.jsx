import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import api from './api/config.js';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import NotFound from './pages/404/index.jsx';
import AddPost from './pages/AddPost/AddPost.jsx';
import AllBlogs from './pages/AllBlogs/index.jsx';
import BlogDetails from './pages/BlogDetails/index.jsx';
import UpdateBlog from './pages/EditPost/index.jsx';
import FeatureBlogs from './pages/FeatureBlogs/index.jsx';
import Home from './pages/Home';
import MyProfile from './pages/MyProfile/index.jsx';
import Login from './pages/SignIn/index.jsx';
import SignUp from './pages/SignUp/index.jsx';
import WishList from './pages/WishList/index.jsx';
import PrivateRoute from './pages/protected/index.jsx';
import { signInSuccess, signoutSuccess } from './redux/user/userSlice.js';

const App = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.get('/user/whoami');
        if (res.data) {
          dispatch(signInSuccess(res.data));
        }
      } catch (error) {
        dispatch(signoutSuccess());
      }
    };

    if (!currentUser) {
      getUser();
    }
  }, [currentUser]);
  return (
    <Suspense fallback={<p>loading...</p>}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-blogs" element={<AllBlogs />} />
        <Route path="/feature-blogs" element={<FeatureBlogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* Authenticated */}
        <Route element={<PrivateRoute />}>
          <Route path="/wishlist-posts" element={<WishList />} />
          <Route path="/add-blog" element={<AddPost />} />
          <Route path="/blog/update/:id" element={<UpdateBlog />} />
          <Route path="/my-profile" element={<MyProfile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Suspense>
  );
};

export default App;
