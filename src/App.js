import './App.css';
import data from "./data.json";
import { Component } from 'react';
import Header from './Header/index';
import ProductsList from './ProductsList';
import ProductDetails from './ProductDetails';
import { Routes, Route } from 'react-router-dom';
import { getProducts } from './services/apiCalls';

class App extends Component {
  constructor() {
    super();
    this.state = {
      categories: data.data.categories,
      products: [],
      selectedCategory: 'all',
      selectedProducts: []
    }

    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.handleSelectProduct = this.handleSelectProduct.bind(this);
    this.handleQuantityClick = this.handleQuantityClick.bind(this);
    this.handleAttributeChangeInCart = this.handleAttributeChangeInCart.bind(this);
  }

  handleCategoryClick(categoryName) {
    this.setState({ selectedCategory: categoryName });
  }
  
  objectsEqual(o1, o2) { 
    return (
      typeof o1 === 'object' && Object.keys(o1).length > 0 
        ? Object.keys(o1).length === Object.keys(o2).length 
            && Object.keys(o1).every(p => this.objectsEqual(o1[p], o2[p]))
        : o1 === o2
      );
  }

  arraysEqual(a1, a2) {
    return  a1?.length === a2?.length && a1.every((o, idx) => this.objectsEqual(o, a2[idx]));
  }

  handleSelectProduct(product, chosenAttributes) {
    const selectedProds = [...this.state.selectedProducts];

    let selectedAttributes = [];

    if (!chosenAttributes || !chosenAttributes.length) { 
      product.attributes.forEach(attribute => {
        selectedAttributes.push({
          id: attribute.id,
          value: attribute.items[0].value
        });
      });
    } else {
      selectedAttributes = chosenAttributes;
    }

    const existingProduct = selectedProds.findIndex((selectedProduct) => {
      return selectedProduct.id === product.id && this.arraysEqual(selectedProduct.selectedAttributes, selectedAttributes);
    });

    if (existingProduct >= 0) {
      this.handleQuantityClick(existingProduct, 'add');

      return;
    }

    selectedProds.push({
      productId: product.productId,
      id: product.id,
      name: product.name,
      quantity: 1,
      attributes: product.attributes,
      selectedAttributes,
      gallery: product.gallery,
      prices: product.prices
    });

    this.setState({ selectedProducts: selectedProds });
  }

  handleQuantityClick(key, action) {
    let tempArray = [...this.state.selectedProducts];

    if (tempArray[key].quantity === 1 && action === 'remove') {
        tempArray.splice(key, 1);

        this.setState({
          selectedProducts: tempArray
        })
        return;
    }
  
    action === 'add' ? tempArray[key].quantity ++ : tempArray[key].quantity --;

    this.setState({
      selectedProducts: tempArray
    })

  }

  handleAttributeChangeInCart(attributeId, value, productIndex) {
    const selectedProducts = [...this.state.selectedProducts];
    const product = selectedProducts[productIndex];

    const selectedAttributes = product.selectedAttributes;
    const existingAttribute = selectedAttributes.findIndex(attribute => attribute.id === attributeId);

    if (existingAttribute >= 0) {
        selectedAttributes.splice(existingAttribute, 1);
    }

    selectedAttributes.push({
      id: attributeId,
      value
  });

    product.selectedAttributes = selectedAttributes;
  }

  async getProducts() {
    this.setState({
      products: data.data.products
    });

    const result = await getProducts();

    if (result) {
      this.setState({
        products: result.data.getProducts
      })
    }
  }

  componentDidMount() {
    this.getProducts();
  }

  getFilteredProducts() {
    if (this.state.selectedCategory !== 'all') {
      return this.state.products.filter(product => product.category === this.state.selectedCategory);
  }

    return this.state.products;
  }

  render() {
    return (
      <div>
        <Header
          categories={this.state.categories}
          selectedCategory={this.state.selectedCategory}
          selectedProducts={this.state.selectedProducts}
          onQuantityClick={this.handleQuantityClick}
          onCategoryClick={this.handleCategoryClick}
          onChangeAttribute={this.handleAttributeChangeInCart}
        />
        <Routes>
          <Route path='/*' element={
              <ProductsList 
                selectedCategory={this.state.selectedCategory}
                products={this.getFilteredProducts()}
                onCartButtonClick={this.handleSelectProduct}
              />
            }
          />
          <Route path='/products/:id/:productId' element={ <ProductDetails products={this.state.products} onAddToCart={this.handleSelectProduct} />} />
        </Routes>
      </div>
    )
  }
}

export default App;
