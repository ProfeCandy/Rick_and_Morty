import Card from './Card';

export default function Cards(props) {

   const characters = props.characters;

   return <div> {characters.map( char => (<Card
      key={char.id}
      name={char.name}
      status={char.status}
      species={char.species}
      gender={char.gender}
      origin={char.origin.name}
      image={char.image}
      onClose={props.onClose}
   />))}

   </div>;
}
