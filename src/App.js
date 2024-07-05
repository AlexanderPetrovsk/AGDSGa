import './App.css';
import data from "./data.json";
import { Component } from 'react';
import Header from './Header/index';
import ProductsList from './ProductsList';
import ProductDetails from './ProductDetails';
import { Routes, Route } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      categories: data.data.categories,
      products: [],
      selectedCategory: 'all'
    }

    this.handleCategoryClick = this.handleCategoryClick.bind(this);
  }

  handleCategoryClick(categoryName) {
    this.setState({ selectedCategory: categoryName });
  }

  async getProducts() {
    this.setState({
      products: data.data.products
    });

    const res = await fetch('https://ackata.000webhostapp.com/graphql', {
      method: 'POST',
      body: JSON.stringify({
        query: `
          query {
            getProducts
            {
              id, 
              name,
              inStock,
              gallery,
              description,
              category,
              brand,
              __typename,
              attributes {
                  id,
                  name,
                  items {
                      displayValue,
                      value,
                      id,
                      __typename
                  },
                  type,
                  __typename
              },
              prices {
                  id,
                  amount,
                  __typename,
                  currency {
                      id,
                      label,
                      symbol,
                      __typename
                  },
              }
            }
          }
        `
      })
    });

    const result = await res.json();

    this.setState({
      products: result.data.getProducts
    })
  }

  async componentDidMount() {
    await this.getProducts();
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
          onCategoryClick={this.handleCategoryClick}
        />
        <Routes>
          <Route path='/' element={
              <ProductsList 
                selectedCategory={this.state.selectedCategory}
                products={this.getFilteredProducts()} 
              />
            }
          />
          <Route path='/products/:productId' element={ <ProductDetails />} />
        </Routes>
      </div>
    )
  }
}

export default App;
