import { faDollarSign, faEuroSign, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Card, CardDeck } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ingredientString } from '../../Utilities/IngredientString'
import './Card.scss'

const CardComponent = ({ products, currency }) => products.map((el) => (
  <CardDeck className="product-card" key={el.name + Math.random()}>
    <Card>
      <div>
        <Card.Img
          variant="center"
          src={el.image_thumb_path}
          style={{
            display: 'block',
          }}
          width="100%"
          height="250rem"
        />
      </div>

      <Card.Body className="product-card--body">
        <Card.Title as="h1">
          <b>{el.name}</b>
        </Card.Title>
        <Card.Text>{ingredientString(el.ingredients)}</Card.Text>
        <div className="card-summary d-flex justify-content-between text-center">
          {el.sizes.map((s) => (
            <div className="d-flex flex-column card-summary--responsive" key={s.size}>
              <Card.Text>Size: {s.size}</Card.Text>
              <Card.Text>
                Price: <FontAwesomeIcon icon={currency === 'eur' ? faEuroSign : faDollarSign} />{' '}
                <b>{s.price}</b>
              </Card.Text>
            </div>
          ))}
        </div>
      </Card.Body>

      <Card.Footer>
        <small className="text-muted d-flex align-items-center">
          <Link to={`/products/${el.id}`} className="m-auto">
            <Button variant="outline-dark" onClick={() => {}}>
              <FontAwesomeIcon className="mr-2" icon={faExternalLinkAlt} />
              See more
            </Button>
          </Link>
        </small>
      </Card.Footer>
    </Card>
  </CardDeck>
))

export default CardComponent
