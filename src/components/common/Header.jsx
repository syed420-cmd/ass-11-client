import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/config';
import { signoutSuccess } from '../../redux/user/userSlice';
const Header = () => {
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await api.post('/user/signout');
      dispatch(signoutSuccess());
      toast.success('Sign out successfully');
      navigate('/');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
      console.log('error', error);
    }
  };

  return (
    <header className="header">
      <nav className="navbar container">
        {/* logo */}
        <div className="order-0">
          <Link to="/">
            {/* <img src="images/logo.svg" height="30" width="147" alt="logo" /> */}
            <h1 className="text-2xl font-bold">Blogr</h1>
          </Link>
        </div>
        {/* navbar toggler */}
        <input id="nav-toggle" type="checkbox" className="hidden" />
        <label
          id="show-button"
          htmlFor="nav-toggle"
          className="order-1 flex cursor-pointer items-center lg:order-1 lg:hidden"
        >
          <svg className="h-6 fill-current" viewBox="0 0 20 20">
            <title>Menu Open</title>
            <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
          </svg>
        </label>
        <label
          id="hide-button"
          htmlFor="nav-toggle"
          className="order-2 hidden cursor-pointer items-center lg:order-1"
        >
          <svg className="h-6 fill-current" viewBox="0 0 20 20">
            <title>Menu Close</title>
            <polygon
              points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
              transform="rotate(45 10 10)"
            />
          </svg>
        </label>
        {/* /navbar toggler */}
        <ul
          id="nav-menu"
          className="navbar-nav order-2 hidden w-full flex-[0_0_100%] lg:order-1 lg:flex lg:w-auto lg:flex-auto lg:justify-center lg:space-x-5"
        >
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/add-blog"
              className={`nav-link ${pathname === '/add-blog' ? 'active' : ''}`}
            >
              Add Blog
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/all-blogs"
              className={`nav-link ${pathname === '/all-blogs' ? 'active' : ''}`}
            >
              All Blogs
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/feature-blogs"
              className={`nav-link ${pathname === '/feature-blogs' ? 'active' : ''}`}
            >
              Feature Blogs
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/wishlist-posts"
              className={`nav-link ${pathname === '/wishlist-posts' ? 'active' : ''}`}
            >
              Wishlists
            </Link>
          </li>
          {!currentUser && (
            <>
              <li className="nav-item">
                <Link
                  to="/sign-in"
                  className={`nav-link ${pathname === '/sign-in' ? 'active' : ''}`}
                >
                  SIgn In
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/sign-up"
                  className={`nav-link ${pathname === '/sign-up' ? 'active' : ''}`}
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
          {currentUser && (
            <>
              <li className="nav-item">
                <Link
                  to="/my-profile"
                  className={`nav-link ${pathname === '/my-profile' ? 'active' : ''}`}
                >
                  Profile
                </Link>
              </li>
              <li className="nav-item cursor-pointer">
                <a className={`nav-link `} onClick={handleSignOut}>
                  Sign Out
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
