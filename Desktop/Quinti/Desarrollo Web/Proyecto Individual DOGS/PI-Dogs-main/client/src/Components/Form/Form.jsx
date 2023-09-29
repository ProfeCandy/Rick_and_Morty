import { useState } from 'react';
import axios from 'axios'
import styles from './Form.module.css';


function Form () {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    height: '',
    weight: '',
    life_span: '',
    temperaments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Formatea el campo "temperaments" como una cadena separada por comas
    const temperamentsArray = formData.temperaments.split(',').map((temp) => temp.trim());
    const formattedData = { ...formData, temperaments: temperamentsArray };

    try {
      const response = await axios.post('http://localhost:3001/dogs', formattedData);

      if (response.status === 201) {
        // La creación fue exitosa, puedes manejar la respuesta aquí
        console.log('Raza creada exitosamente:', response.data);
        // Reiniciar el formulario
        setFormData({
          name: '',
          image: '',
          height: '',
          weight: '',
          life_span: '',
          temperaments: '',
        });
      } else {
        // Manejar otros estados de respuesta según sea necesario
        console.log('Error al crear la raza:', response.data);
      }
    } catch (error) {
      // Manejar errores de red u otros errores aquí
      console.error('Error al crear la raza:', error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>Crear Nueva Raza de Perro</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="image">Imagen:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <label htmlFor="height">Altura:</label>
        <input
          type="text"
          id="height"
          name="height"
          value={formData.height}
          onChange={handleChange}
          required
        />

        <label htmlFor="weight">Peso:</label>
        <input
          type="text"
          id="weight"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          required
        />

        <label htmlFor="life_span">Años de Vida:</label>
        <input
          type="number"
          id="life_span"
          name="life_span"
          value={formData.life_span}
          onChange={handleChange}
          required
        />

        <label htmlFor="temperaments">Temperamentos (separados por comas):</label>
        <input
          type="text"
          id="temperaments"
          name="temperaments"
          value={formData.temperaments}
          onChange={handleChange}
          required
        />

        <button type="submit">Crear Raza</button>
      </form>
    </div>
  );
}

export default Form;
