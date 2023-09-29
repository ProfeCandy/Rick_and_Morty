import axios from 'axios'
import SearchBar from '../../Components/SearchBar/SearchBar'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setAllDogs, setSearchResults, getAllDogs, setCurrentPage, filterDogs, sortDogs } from '../../Redux/dogsReducer'
import Card from '../../Components/Card/Card'
import Pagination from '../Page/Pagination'
import styles from './Home.module.css'

const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector(getAllDogs)
  const currentPage = useSelector((state) => state.dogs.currentPage);
  const dogsPerPage = useSelector((state) => state.dogs.dogsPerPage);
  const searchResults = useSelector((state) => state.dogs.searchResults)

  // Calcula el índice inicial y final de los perros a mostrar en la página actual
  const startIndex = (currentPage - 1) * dogsPerPage;
  const endIndex = startIndex + dogsPerPage;

  // Filtra los perros según la página actual
  const dogsToDisplay = searchResults.slice(startIndex, endIndex);

  const handleFilterChange = (origin) => {
    dispatch(filterDogs({ origin }))
    dispatch(setCurrentPage(1))
  }

  const handleSortChange = (field, order) => {
    dispatch(sortDogs({ field, order }))
    dispatch(setCurrentPage(1))
  }

  useEffect(() => {
    axios.get('http://localhost:3001/dogs')
      .then((response) => {
        dispatch(setAllDogs(response.data));
      });
  }, [dispatch])

  const handleSearch = (searchTerm) => {
    const filteredDogs = allDogs.filter((dog) =>
      dog.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    dispatch(setSearchResults(filteredDogs));
    dispatch(setCurrentPage(1)); // Reinicia la página actual después de la búsqueda
  }

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  }

  const totalPageCount = searchResults.length > 0 ? Math.ceil(searchResults.length / dogsPerPage) : Math.ceil(allDogs.length / dogsPerPage);

  return (
    <section className={styles.section}>
      <SearchBar onSearch={handleSearch} />
      <div className={styles.filters}>
        <button onClick={() => handleFilterChange('API')}>Filtrar por origen API</button>
        <button onClick={() => handleFilterChange('DB')}>Filtrar por origen Base de Datos</button>
        <button onClick={() => handleSortChange('name', 'ASC')}>Ordenar A-Z</button>
        <button onClick={() => handleSortChange('name', 'DESC')}>Ordenar Z-A</button>
        <button onClick={() => handleSortChange('weight', 'ASC')}>Ordenar por Peso Ascendente</button>
        <button onClick={() => handleSortChange('weight', 'DESC')}>Ordenar por Peso Descendente</button>
        <div className={styles.cardContainer}>
          {dogsToDisplay.map((dog) => (
            <Card key={dog.id} dogData={dog} />
          ))}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPageCount}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default Home;