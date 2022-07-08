import axios from "axios";

export const fetchAllProducts = async() => {
    const query = { 
    query: `
    query {
        category {
          products{
            id
            name
            category
            brand
            inStock
            gallery
            prices
            {
              amount
              currency
              {
                symbol
              }
            }
            description
            attributes{
              name
              type
              items{
                value
                displayValue
              }
            }
            }
          }
        }
    `
  }

    const response = await axios({
        method: "POST",
        url: "http://localhost:4000",
        data: query,
    })
    const result = response.data;
    return result;
}

export const fetchOtherData = async() => {
  const query = { 
  query: `
  query {
    currencies{
      label
      symbol
    }
    categories
    {
      name
    }
  }
  `
  }

  const response = await axios({
      method: "POST",
      url: "http://localhost:4000",
      data: query,
  })
  const result = response.data;
  return result;
}