import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useMediaQuery } from '@mui/material';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter,
  Paper, TablePagination
} from '@mui/material';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import styles from './customTable.module.scss';

type Player = {
  attributes: {
    name: string;
    profile: {
      data: {
        attributes: {
          url: string;
        }
      }
    };
    tournaments: number;
    points: number;
  };
};

type CustomTableProps = {
  players: Player[];
  rowsPerPage: number;
  page: number;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
};

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement>,
      newPage: number,
    ) => void;
  }
  
  function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  

const CustomTable: React.FC<CustomTableProps> = ({
  players,
  rowsPerPage,
  page,
  setPage,
  setRowsPerPage
}) => {
  const isTabletLand = useMediaQuery('(min-width:975px)');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - players.length) : 0;

  return (
    <TableContainer component={Paper} style={{ marginBottom: isTabletLand ? 128 : 0}} className={styles.table}>
        <Table aria-label="simple table">
        <TableHead>
            <TableRow>
            <TableCell><strong>RANKING</strong></TableCell>
            <TableCell align="center"><strong>NOME</strong></TableCell>
            {isTabletLand && (
                <TableCell align="center"><strong>TORNEIOS JOGADOS</strong></TableCell>
            )}
            <TableCell align="center"><strong>PONTOS</strong></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {players.length === 0 ? (
            <TableRow>
                <TableCell colSpan={6} align="center">
                Não há jogadores cadastrados no momento
                </TableCell>
            </TableRow>
            ) : (
            players.map((player, index) => (
                <TableRow
                key={`${player.attributes.name}-${uuidv4()}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell style={{ fontSize: 18 }} component="th" scope="row">
                    <strong>{index + 1}</strong>
                </TableCell>
                <TableCell align="center">
                    <div className={styles.userCell}>
                    <div className={styles.userThumbContainer}>
                        <img className={styles.userThumb} src={player.attributes.profile.data.attributes.url} alt="Profile" />
                    </div>
                    <div className={styles.userNameContainer}>
                        <p>{player.attributes.name}</p>
                    </div>
                    </div>
                </TableCell>
                {isTabletLand && (
                    <TableCell align="center">{player.attributes.tournaments}</TableCell>
                )}
                <TableCell align="center">{player.attributes.points}</TableCell>
                </TableRow>
            ))
            )}
            {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
            </TableRow>
            )}
        </TableBody>
        {players.length > 10 && (
            <TableFooter>
            <TableRow>
                <TablePagination
                rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                colSpan={3}
                count={players.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage="Máx de itens:"
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                />
            </TableRow>
            </TableFooter>
        )}
        </Table>
    </TableContainer>
  );
};

export default CustomTable;
