import { Typography, TableBody, TableCell, TableHead, TableRow, Table } from '@mui/material';
import FilterBar from './subComponents/FilterBar.jsx';

const Favorites = (props) => {

  const dummyData = [
    {id: 1, quiz: 'quiz 1', totalPlays: 1, totalLikes: 23, dateLike: 'mm/dd/yyyyThh:mm:ss'},
    {id: 2, quiz: 'quiz 2', totalPlays: 2, totalLikes: 80, dateLike: 'mm/dd/yyyyThh:mm:ss'},
    {id: 3, quiz: 'quiz 3', totalPlays: 3, totalLikes: 10, dateLike: 'mm/dd/yyyyThh:mm:ss'},
    {id: 4, quiz: 'quiz 4', totalPlays: 4, totalLikes: 75, dateLike: 'mm/dd/yyyyThh:mm:ss'},
    {id: 5, quiz: 'quiz 5', totalPlays: 5, totalLikes: 36, dateLike: 'mm/dd/yyyyThh:mm:ss'}
  ];

  return (
    <>
      <Typography variant='h5'>Favorites</Typography>

      <FilterBar />

      <Table sx={{ width: '100%' }} aria-label="simple table">
        <TableHead >
          <TableRow>
            <TableCell align='left'>Quiz</TableCell>
            <TableCell align='center'>Total Plays</TableCell>
            <TableCell align='center'>Total Likes</TableCell>
            <TableCell align='right'>Date Like</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dummyData.map((row) => (
            <TableRow
              key={row.id}
            >
              <TableCell align='left' sx={{ border: 0 }}>
                {row.quiz}
              </TableCell>
              <TableCell align='center' sx={{ border: 0 }}>
                {row.totalPlays}
              </TableCell>
              <TableCell align='center' sx={{ border: 0 }}>
                {row.totalLikes}
              </TableCell>
              <TableCell align='right' sx={{ border: 0 }}>
                {row.dateLike}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </>
  );
};

export default Favorites;