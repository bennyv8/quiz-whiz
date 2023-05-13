import { Typography, TableBody, TableCell, TableHead, TableRow, Table, Stack } from '@mui/material';
import FilterBar from './subComponents/FilterBar.jsx';
import FavoriteIcon from '@mui/icons-material/Favorite';
import useQuizzes from '../hooks/useQuizzes';
import useFilter from '../hooks/useFilter';
import useSort from '../hooks/useSort';

const Plays = (props) => {

  const quizzes = useQuizzes('history');
  const { filteredData, handleFilterChange, filter } = useFilter(quizzes);
  const { sortedData, sortData } = useSort(filteredData);

  const headersMapping = {
    'Quiz': 'quiz_name',
    'Category': 'category',
    'Plays': 'plays',
    'Best Score': 'score',
    'Best Time': 'duration',
    'Finished?': 'finished',
    'Last Played': 'date'
  };

  const handleLike = (e) => {
    console.log('like/unlike');
  };

  const handleClick = (e) => {
    const key = headersMapping[e.target.innerText];
    sortData(key);
  };

  return (
    <>
      <Stack direction='row' >
        <Typography variant='h4' sx={{ flexGrow: 1}}>History</Typography>
        <FilterBar onFilterChange={handleFilterChange} category={filter.category} />
      </Stack>
      <Table sx={{ width: '100%' }} aria-label='simple table'>
        <TableHead >
          <TableRow>
            <TableCell align='left' onClick={handleClick} >Quiz</TableCell>
            <TableCell align='center' onClick={handleClick} >Category</TableCell>
            <TableCell align='center' onClick={handleClick} >Plays</TableCell>
            <TableCell align='center' onClick={handleClick} >Best Score</TableCell>
            <TableCell align='center' onClick={handleClick} >Best Time</TableCell>
            <TableCell align='center' onClick={handleClick} >Finished?</TableCell>
            <TableCell align='right' onClick={handleClick} >Last Played</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow
              key={row.id}
            >
              <TableCell align='left' sx={{ border: 0 }}>
                {row.quiz_name}
              </TableCell>
              <TableCell align='center' sx={{ border: 0 }}>
                {row.category}
              </TableCell>
              <TableCell align='center' sx={{ border: 0 }}>
                {row.plays}
              </TableCell>
              <TableCell align='center' sx={{ border: 0 }}>
                {row.score}
              </TableCell>
              <TableCell align='center' sx={{ border: 0 }}>
                {row.duration}
              </TableCell>
              <TableCell align='center' sx={{ border: 0 }}>
                {row.finished ? 'v' : ''}
              </TableCell>
              <TableCell align='right' sx={{ border: 0 }} >
                {row.date}
              </TableCell>
              <TableCell align='center' sx={{ border: 0 }}>
                <FavoriteIcon onClick={handleLike}></FavoriteIcon>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </>
  );
};

export default Plays;