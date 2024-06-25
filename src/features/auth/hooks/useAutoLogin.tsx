import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'store/hooks';
import { loginUserA } from '../state/authSlice';

function useAutoLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();
  console.log('Current URL:', window.location.href); // Add this line
  useEffect(() => {
    if (Cookies.get('accessToken')) {
      const user = JSON.parse(localStorage.getItem('userAInfo') || '{}');

      if (user.firstName && user.lastName && user.email && user.userId && user.quizId) {
        dispatch(
          loginUserA({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userId: user.userId,
            quizId: user.quizId,
          })
        );

        navigate(location.pathname + location.search);
      }
    }
  }, []);
}

export default useAutoLogin;
