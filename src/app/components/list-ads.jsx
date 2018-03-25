import React, { Component } from 'react';
import Ad from './ad';

class ListAds extends Component {

  render() {
    const {ads, cart, incrementCart, decrementCart, ...props} = this.props;
    return (
      <div className="flex-row-resp space-between" {...props}>
        {ads.map((ad, key) =>
          <Ad ad={ad} key={key} cart={cart} incrementCart={incrementCart} decrementCart={decrementCart} />
        )}
      </div>
    );
  }
}

export default ListAds;
