const getProducts = async () => {
    const res = await fetch('https://ackata.000webhostapp.com/graphql', {
        method: 'POST',
        body: JSON.stringify({
          query: `
            query {
              getProducts
              {
                productId,
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
                        symbol
                    },
                }
              }
            }
          `
        })
    });
  
    return res.json();
};


const placeOrder = async (order) => {
    const res = await fetch('https://ackata.000webhostapp.com/graphql', {
        method: 'POST',
        body: JSON.stringify({
          query: `
            mutation {
                insertOrder (
                    product_id: ${order.productId},
                    chosen_attributes: ${JSON.stringify(JSON.stringify(order.selectedAttributes))},
                    total_price: ${order.prices[0].amount * order.quantity},
                    quantity: ${order.quantity}
                )
            }
          `
        })
    });
  
    return res.json();
}

export { getProducts, placeOrder};