import {Link} from 'react-router-dom'
import styles from './Card.module.css'

const Card = ({ dogData }) => {
  const { id, image, name, weight} = dogData;

  const temperamentList = dogData.temperament
    ? dogData.temperament.map((temp, index) => (
      <span key={index} className={styles['card-temperament']}>
        {temp}
        {index < dogData.temperament.length - 1 ? ', ' : ''}
      </span>
    ))
    : null;



  return (
    <div className={styles.card}> 
      <Link to={`/detail/${id}`} className={styles.link}>Ver Detalle</Link> 
      <img src={image} alt={`Imagen de ${name}`} className={styles['card-image']} /> 
      <div className={styles['card-details']}> 
        <h2 className={styles['card-name']}>Nombre: {name}</h2> 
        <p className={styles['card-temperament']}>Temperamento: {temperamentList}</p> 
        <p className={styles['card-weight']}>Peso: {weight} kg</p>
      </div>
    </div>
  );
};
export default Card;
