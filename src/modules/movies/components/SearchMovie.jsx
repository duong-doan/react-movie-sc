import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Grid, Box } from '@mui/material';
import useDebounce from 'utils/hooks/useDebounce';
import Spinner from 'components/Spinner/index';
import { useSelector } from 'react-redux';
import { selectLoadingSearch, selectMoviesSearch } from '../store/selector';
import { useNavigate } from 'react-router-dom';

const SearchMovie = ({ onChange }) => {
  const [search, setSearch] = useState('');
  const [selectValue, setSelectValue] = useState(null);
  const [options, setOptions] = useState([]);
  const debounceSearch = useDebounce(search, 1000);
  const loading = useSelector(selectLoadingSearch);
  const moviesSearch = useSelector(selectMoviesSearch);
  const navigate = useNavigate();

  const handleChange = (_, newValueSearch) => {
    setSearch(newValueSearch);
  };

  useEffect(() => {
    if (!!moviesSearch.length) {
      setOptions(() => {
        return moviesSearch.map((item) => ({
          id: item._id,
          label: item.title,
        }));
      });
      return;
    }
    setOptions([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesSearch]);

  useEffect(() => {
    if (!debounceSearch) {
      setOptions([]);
      return;
    }
    onChange(debounceSearch);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch]);

  const handleChangeValue = (_, newValue) => {
    setSelectValue(newValue.id);
    navigate(`/movies/${newValue.id}`);
  };

  return (
    <Grid container marginTop='70px'>
      <Grid item sm={10} md={8} margin='auto'>
        <Autocomplete
          disablePortal
          value={selectValue}
          onChange={handleChangeValue}
          inputValue={search}
          onInputChange={handleChange}
          options={options.map((option) => option)}
          renderInput={(params) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                marginBottom: '20px',
              }}
            >
              <TextField {...params} color='primary' label='Movie' />
              {loading && (
                <Spinner
                  customStyle={{
                    width: '20px',
                    height: '20px',
                    right: '40px',
                    left: 'unset',
                    top: 'unset',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                  }}
                />
              )}
            </Box>
          )}
        />
      </Grid>
    </Grid>
  );
};

export default SearchMovie;
