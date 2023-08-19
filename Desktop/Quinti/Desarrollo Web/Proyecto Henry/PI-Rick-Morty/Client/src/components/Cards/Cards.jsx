import Card from '../Card/Card'
import style from './Cards.module.css'

export default function Cards (props) {
  return (
    <div className={style.container}>
      {props.characters.map(character => (
        <Card
        key = {character.id}
        character={character}
        onClose={() => props.onClose(character.id)}
        />
      ))
      }
      </div>
  )
}
