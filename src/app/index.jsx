import React, { Component } from 'react';
import './app.css';
import Header from './components/header';
import SelectOrganization from './components/select-organization';
import ListAds from './components/list-ads';

class App extends Component {

  constructor(props) {
    super(props);
    if(props.data) {
      const {ads, organizations} = props.data;
      const cart = ads.map((ad) => {
        return { id: ad.id, items: 0, total: 0 };
      });
      const orgList = organizations.map((organization) => {
        return { name: organization.name, selected: 0, pricingRules: organization.pricingRules  };
      });
      orgList[0].selected = 1;
      this.state = {
        cart,
        orgList,
        ads,
        selectedOrganization: orgList[0],
        showDropDown: false
      }
      this.setOrganization = this.setOrganization.bind(this);
      this.toggleDropdown = this.toggleDropdown.bind(this);
      this.incrementCart = this.incrementCart.bind(this);
      this.decrementCart = this.decrementCart.bind(this);
    }
  }

  setOrganization(org) {
    let {orgList} = this.state;
    return (() => {
      const state = this.state;
      orgList = orgList.map((organization) => {
        if(org.name === organization.name) {
          organization.selected = 1;
          state.selectedOrganization = organization;
        }
        else {
          organization.selected = 0;
        }
        return organization;
      });
      state.orgList = orgList;
      state.showDropDown = false;
      state.cart = this.updateCart(this.state.ads, this.state.cart);
      this.setState({state});
    })
  }

  toggleDropdown() {
    const state = this.state;
    state.showDropDown = !state.showDropDown;
    this.setState({state});
  }

  calculateSpecialPricing (minBuy, productsOnOffer, specialPrice, regularPrice, productsInCart, total) {
    if(minBuy === 0) {// all products on special price
      total = specialPrice * productsInCart;
    }
    else if (productsInCart >= minBuy){
      if(productsOnOffer === undefined || minBuy <= productsOnOffer) {// special pricing for all products on minimum purchase
        total = specialPrice * productsInCart;
      }
      else {
        const quotient = Math.floor(productsInCart / minBuy);
        const remainder = productsInCart % minBuy;
        const regularPriceProducts = ((minBuy - productsOnOffer) * quotient) + remainder;
        const regularPriceTotal = regularPriceProducts * regularPrice;
        const specialPriceTotal = quotient * specialPrice;
        total = regularPriceTotal + specialPriceTotal;
      }
    }
    return Math.round(total * 100) / 100;
  }

  getCartItemTotal(cartItem, selectedAd) {
    let cartItemTotal = cartItem.items * selectedAd.price;
    const selectedOrganization = this.state.selectedOrganization;
    const pricingRules = selectedOrganization.pricingRules;
    if(pricingRules && pricingRules[selectedAd.id]) {
      const { minBuy, productsOnOffer, specialPrice } = pricingRules[selectedAd.id];
      cartItemTotal = this.calculateSpecialPricing(
        minBuy,
        productsOnOffer,
        specialPrice,
        selectedAd.price,
        cartItem.items,
        cartItemTotal
      );
    }
    return Math.round(cartItemTotal * 100) / 100;
  }

  getTotal () {
    const {ads,cart} = this.state;
    let total = 0;
    cart.forEach((cartItem) => {
      const selectedAd = ads.find((ad) => ad.id === cartItem.id)
      total += this.getCartItemTotal(cartItem, selectedAd);
    })
    return Math.round(total * 100) / 100;
  }

  updateCart (ads, cart) {
    cart.forEach((cartItem) => {
      const selectedAd = ads.find((ad) => ad.id === cartItem.id)
      cartItem.total = this.getCartItemTotal(cartItem, selectedAd);
    })
    return cart;
  }

  incrementCart(selectedAd) {
    return (() => {
      const state = this.state;
      state.cart = state.cart.map((cartItem) => {
        if(cartItem.id === selectedAd.id) {
          cartItem.items++;
          cartItem.total = this.getCartItemTotal(cartItem, selectedAd);
        }
        return cartItem;
      });
      this.setState({state});
    })
  }

  decrementCart(selectedAd) {
    return (() => {
      const state = this.state;
      state.cart = state.cart.map((cartItem) => {
        if(cartItem.id === selectedAd.id && cartItem.items > 0) {
          cartItem.items--;
          cartItem.total = this.getCartItemTotal(cartItem, selectedAd);
        }
        return cartItem;
      });
      this.setState({state});
    })
  }

  render() {
    if (!this.state) {
      return null;
    }
    const {ads, orgList, cart, showDropDown} = this.state;
    return (
      <div>
        <Header title="Ads Cart">
          <SelectOrganization
            showDropDown={showDropDown}
            orgList={orgList}
            setOrganization={this.setOrganization}
            toggleDropdown={this.toggleDropdown}
          />
        </Header>
        <section className="main">
          <div className="container">
            <ListAds
              ads={ads}
              cart={cart}
              incrementCart={this.incrementCart}
              decrementCart={this.decrementCart}
            />
            <div className="cart-total">
              <span className="large-text">
                Cart total : ${this.getTotal()}
              </span>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
