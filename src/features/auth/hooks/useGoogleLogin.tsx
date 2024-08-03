// import { useEffect } from 'react';
// function useGoogleLogin() {
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const access_token = urlParams.get('access_token');
//     // const refresh_token = urlParams.get('refresh_token');
//     const first_name = Cookies.get('first_name');
//     const last_name = Cookies.get('last_name');
//     const email = Cookies.get('user_email');
//     const user_id = Cookies.get('user_uuid');
//     const quiz_id = Cookies.get('quiz_id');

//     console.log(first_name, last_name, email, user_id, quiz_id);
//     if (access_token) {
//       //this sets the access token to be reused in the future
//       Cookies.set('accessToken', access_token, { secure: true });
//       console.log(first_name, last_name, email, user_id, quiz_id);
//       dispatch(
//         loginUserA({
//           firstName: first_name as string,
//           lastName: last_name as string,
//           email: email as string,
//           quizId: quiz_id as string,
//           userId: user_id as string,
//         })
//       );
//       navigate(ROUTES.CLIMATE_FEED_PAGE);
//     } else {
//       console.error('No access token found');
//     }
//   }, [location.search, dispatch]);
// }

// export default useGoogleLogin;
