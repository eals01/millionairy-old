export default function generateDiceValues() {
  return {
    velocity: [
      Math.ceil(Math.random() * 10 - 5),
      Math.ceil(Math.random() * 10 - 5),
      Math.ceil(Math.random() * 10 - 5),
      Math.ceil(Math.random() * 10 - 5),
      Math.ceil(Math.random() * 10 - 5),
      Math.ceil(Math.random() * 10 - 5)
    ],
    rotation: [
      Math.random() * 2 * Math.PI,
      Math.random() * 2 * Math.PI,
      Math.random() * 2 * Math.PI,
      Math.random() * 2 * Math.PI,
      Math.random() * 2 * Math.PI,
      Math.random() * 2 * Math.PI
    ],
    angularVelocity: [
      Math.ceil(Math.random() * 10 - 5),
      Math.ceil(Math.random() * 10 - 5),
      Math.ceil(Math.random() * 10 - 5),
      Math.ceil(Math.random() * 10 - 5),
      Math.ceil(Math.random() * 10 - 5),
      Math.ceil(Math.random() * 10 - 5)
    ]
  }
}
