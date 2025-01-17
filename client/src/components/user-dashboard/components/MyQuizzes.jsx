import { Typography, TableBody, TableCell, TableHead, TableRow, Table, Stack, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import FilterBar from './subComponents/FilterBar';
import DeleteRounded from '@mui/icons-material/DeleteRounded';
import useQuizzes from '../hooks/useQuizzes';
import useFilter from '../hooks/useFilter';
import useSort from '../hooks/useSort';
import { useContext } from 'react';
import { UserContext } from '../../global/UserContext';
import { CountsContext } from '../context/CountsContext';
import useDeviceDetect from '../hooks/useDeviceDetect';

const MyQuizzes = (props) => {

  const { quizzes, getQuizzes } = useQuizzes('quizzes');
  const { filteredData, handleFilterChange, filter } = useFilter(quizzes);
  const { sortedData, sortData } = useSort(filteredData);
  const { profile } = useContext(UserContext);
  const { getCounts } = useContext(CountsContext);
  const { isMobile } = useDeviceDetect();

  const headersMapping = {
    'Quiz': 'quiz_name',
    'Category': 'category',
    'Type': 'type',
    'Plays': 'plays',
    'Likes': 'likes',
    'Created At': 'created_at'
  };

  // handle deleting quiz
  const handleDelete = async (quizId) => {
    const endpoint = `${import.meta.env.VITE_APP_API_URI}/dashboard/quizzes/${quizId}`;
    try {
      const response = await fetch(endpoint, {method: 'delete'})
      if (response.ok) {
        getQuizzes(profile.userId);
        getCounts(profile.userId);
      }
    } catch (err) {
      console.error(err.stack);
      alert('Failed to delete quiz');
    }
  };

  const handleClick = (e) => {
    const key = headersMapping[e.target.innerText];
    sortData(key);
  };

  const headers = ['Quiz', 'Category', 'Plays', 'Likes', 'Created At'];
  const responsiveHeaderStyles = isMobile ? {fontSize: '0.8rem'} : {fontSize: '1.5rem'};
  const responsiveStyles = isMobile ? {border:0, fontSize: '0.65rem'} : {border: 0, fontSize: '1.1rem'};
  const inherit = { color: 'inherit', textDecoration: 'inherit', fontWeight: 'bold'};

  return (
    <Grid>
      <Stack direction='row' >
        <Typography variant='h5' sx={{ flexGrow: 1}}>Quizzes</Typography>
        <FilterBar onFilterChange={handleFilterChange} category={filter.category} />
      </Stack>

      <Table aria-label="simple table" padding={isMobile ? 'none' : 'normal'}>
        <TableHead >
          <TableRow hover={true}>
            {headers.map((header, idx) => {
              const alignment = idx < 1 ? 'left' : idx === headers.length - 1 ? 'right' : 'center';
              return <TableCell key={idx} align={alignment} onClick={handleClick} >
              <Typography variant='h6' sx={responsiveHeaderStyles}> {header} </Typography>
            </TableCell>
            })}
            <TableCell>{/* Placeholder */}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(sortedData.length &&
            sortedData.map((row, idx) => (
            <TableRow
              key={row.id}
              hover={true}
              className={ idx % 2 === 0 ? 'stripe': '' }
            >
              <TableCell align='left' sx={responsiveStyles}>
                <Link to={`/quiz/${row.id}/start`} style={inherit}> {row.quiz_name} </Link>
              </TableCell>
              <TableCell align='center' sx={responsiveStyles}>
                {row.category}
              </TableCell>
              <TableCell align='center' sx={responsiveStyles}>
                {row.plays}
              </TableCell>
              <TableCell align='center' sx={responsiveStyles}>
                {row.likes}
              </TableCell>
              <TableCell align='right' sx={responsiveStyles} >
                {row.created_at}
              </TableCell>
              <TableCell align='center' sx={responsiveStyles}>
                <DeleteRounded id='delete-icon' onClick={() => handleDelete(row.id)} sx={isMobile ? {fontSize: 13}: {}}></DeleteRounded>
              </TableCell>
            </TableRow >
          ))) || <TableRow><Typography component='td' align='center'> No quiz found </Typography></TableRow>}
        </TableBody>
      </Table>

    </Grid>
  );
};

export default MyQuizzes;