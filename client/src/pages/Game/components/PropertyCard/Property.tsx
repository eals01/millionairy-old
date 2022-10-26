import styled, { css } from 'styled-components'
import { Space } from '../../../../../../types/Space'

export default function Property({ space }: { space: Space }) {
  return (
    <Card>
      <Color color={space.color} />
      <h3>{space.name}</h3>
      <table>
        <tbody>
          <tr>
            <td>Rent</td>
            <td>{space.price.parking[0]}</td>
          </tr>
          <tr>
            <td>1 house</td>
            <td>{space.price.parking[1]}</td>
          </tr>
          <tr>
            <td>2 houses</td>
            <td>{space.price.parking[2]}</td>
          </tr>
          <tr>
            <td>3 houses</td>
            <td>{space.price.parking[3]}</td>
          </tr>
          <tr>
            <td>4 houses</td>
            <td>{space.price.parking[4]}</td>
          </tr>
          <tr>
            <td>Hotel</td>
            <td>{space.price.parking[5]}</td>
          </tr>
        </tbody>
      </table>
      <p>House and hotel cost: {space.price.house}</p>
      <p>Mortgage amount: {space.price.buy / 2}</p>
    </Card>
  )
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  height: 400px;
  background: white;
  border: 1px solid black;

  > img {
    width: 100%;
    height: 100px;
  }

  > ul {
    list-style: none;
    padding: 0;
  }

  > table > tbody > tr {
    width: 100%;
  }

  > table > tbody > tr > td {
    width: 50%;

    &:nth-child(2) {
      text-align: right;
    }
  }

  > p {
    margin-bottom: 0;
  }
`
const Color = styled('div')(
  ({ color }) => css`
    width: 100%;
    height: 60px;
    background: ${color};
  `
)
