import { gql } from '@apollo/client';
import { client } from "..";

export const fetchAllProducts = async() => {
  const query = await client.query({
    query: QUERYES.ALL_PRODUCTS,
  });

  const result = structuredClone(query);
  return result;
}

export const fetchOtherData = async() => {
  const query = await client.query({
    query: QUERYES.OTHER_DATA,
  });
  
  const result = structuredClone(query);
  return result;
}

export const QUERYES = {
  ALL_PRODUCTS: gql`
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
  `,
  OTHER_DATA: gql`
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