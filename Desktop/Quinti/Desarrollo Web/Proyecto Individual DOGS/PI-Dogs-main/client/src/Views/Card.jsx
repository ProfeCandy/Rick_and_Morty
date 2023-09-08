
function Card({ Dogdata }) {
  console.log(Dogdata)
  const {image, name, temperamento, weight } = Dogdata

  return (
    <div>
      <img src = {image} alt= 'Dog'></img>
      <h2> {name}</h2>
      <h2>{temperamento}</h2>
      <h2>{weight}</h2>
  </div>
)
}

export default Card