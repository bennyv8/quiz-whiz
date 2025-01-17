import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useContext } from 'react';
import { UserContext } from '../../../global/UserContext';
import { CountsContext } from '../../context/CountsContext';
import useDeviceDetect from '../../hooks/useDeviceDetect';

const LikeIcon = ({liked, quizId, getQuizzes, favoriteId}) => {

  const url = import.meta.env.VITE_APP_API_URI;
  const { profile } = useContext(UserContext);
  const { getCounts } = useContext(CountsContext);
  const { isMobile } = useDeviceDetect();

  const likeQuiz = async (userId, quizId) => {

    const opt = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId: userId,
        quizId: quizId
      })
    };

    try {
      const response = await fetch(`${url}/dashboard/favorites`, opt);
      if (response.ok) {
        getQuizzes(userId);
        getCounts(userId);
      }
    } catch (err) {
      console.error(err.stack);
      alert('Something went wrong');
    }
  };

  const unlikeQuiz = (favoriteId, userId, quizId) => {
    if (favoriteId) {
      fetch(`${url}/dashboard/favorites/${favoriteId}`, {method: 'DELETE'})
      .then(res => {
        getQuizzes(userId);
        getCounts(userId);
      })
      .catch(err => {
        console.error(err.stack);
        alert('Something went wrong');
      });
    } else {
      fetch(`${url}/dashboard/favorites/one/?userId=${userId}&quizId=${quizId}`)
      .then(async res => {
        const { id } = await res.json();
        return fetch(`${url}/dashboard/favorites/${id}`, {method: 'DELETE'});
      })
      .then(res => {
        getQuizzes(userId);
        getCounts(userId);
      })
      .catch(err => {
        console.error(err.stack);
        alert('Something went wrong');
      });
    }
  };

  const style = isMobile ? {fontSize: 15} : {};

  if (liked) {
    return <FavoriteIcon
      className='pointer'
      color='secondary'
      onClick={() => unlikeQuiz(favoriteId, profile.userId, quizId)}
      sx={style}/>;
  }
  return <FavoriteBorderIcon
    className='pointer'
    color='secondary'
    onClick={() => likeQuiz(profile.userId, quizId)}
    sx={style}/>

}

export default LikeIcon;