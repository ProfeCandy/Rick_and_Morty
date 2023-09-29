import styles from './Detail.module.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
  const { id } = useParams();
  const [dogDetail, setDogDetail] = useState(null);

  useEffect(() => {
    // Hacer una solicitud a la API para obtener detalles de la raza por ID
    axios.get(`http://localhost:3001/dogs/${id}`)
      .then((response) => {
        setDogDetail(response.data);
      })


      .catch((error) => {
        console.error('Error al obtener detalles de la raza:', error);
      });
  }, [id]);

  if (!dogDetail) {
    return <p>Cargando detalles de la raza...</p>;
  }


  return (
    <div className={styles.card}>
      <h2>Detalles de la Raza</h2>
      <div>
        <h2 className={styles['card-name']}>ID:{dogDetail.id}</h2>
        <img src={dogDetail.image} alt={`Imagen de ${dogDetail.name}`} className={styles['card-image']} />
        <h2 className={styles['card-name']}>Nombre: {dogDetail.name}</h2>
        <h2 className={styles['card-name']}>Altura: {dogDetail.height} cm</h2>
        <h2 className={styles['card-name']}>Peso: {dogDetail.weight} kg</h2>
        <h2 className={styles['card-name']}>Temperamento: {dogDetail.temperament}</h2>
        <h2 className={styles['card-name']}>Años de vida: {dogDetail.life_span}</h2>
      </div>
    </div>
  );
};

export default Detail;
