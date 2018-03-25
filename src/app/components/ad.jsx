import React, { Component } from 'react';

class Ad extends Component {

  render() {
    const {ad, cart, incrementCart, decrementCart} = this.props;
    if(!cart || !ad) {
      return null;
    }
    const adInCart = cart.find((cartItem) => cartItem.id === ad.id);
    return (
      <div key={ad.id} className="ad">
        <h2 className="title">
          {ad.name}
        </h2>
        <div className="content">
          <p className="regular-price">Regular Price: <strong>${ad.price}</strong></p>
          <div className="button-wrap">
            <button className={`remove-button ${ad.id}`} onClick={decrementCart(ad)}>
              <span className="screen-reader-only">remove {ad.name} from cart</span>
            </button>
            <span className="large-text"><span className="screen-reader-only-inline">Items in cart:</span>{adInCart.items}</span>
            <button className={`add-button ${ad.id}`} onClick={incrementCart(ad)}>
              <span className="screen-reader-only">add {ad.name} to cart</span>
            </button>
          </div>
          <p className="large-text">Subtotal: <strong>${adInCart.total}</strong></p>
        </div>
      </div>
    );
  }
}

export default Ad;
