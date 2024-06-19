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

    const res = await fetch('http://localhost:8000/graphql', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: `
          query {
            echo
            {
              id,
              name,
              in_stock,
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
                      attribute_id,
                      ID_AI,
                      __typename
                  },
                  type,
                  __typename,
                  product_id,
                  ID_A
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
                  product_id
              }
              ID_P,
            }
          }
        `
      })
    });
    
    const result = await res.json();

    this.setState({
      products: result.data.echo
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
