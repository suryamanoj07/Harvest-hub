import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { storeContext } from '../pages/redux/context/storeContext';
import { useContext } from 'react';
import { loginInSuccess } from '../pages/redux/user/userSlice';


export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {setToken} = useContext(storeContext)

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result.user);    
      const res = await fetch('http://localhost:3000/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(loginInSuccess(data.user));
      setToken(data.token)
    localStorage.setItem("token",data.token)
      navigate('/');
    } catch (error) {
      console.log('could not login with google', error);
    }
  };
  return (
    <button
    //   type='button'
    onClick={handleGoogleClick}
      className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'
    >
      Continue with google
    </button>
  );
}