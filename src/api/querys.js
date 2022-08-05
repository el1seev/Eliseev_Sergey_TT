import { gql } from "@apollo/client";

import { client } from "..";

export const fetchProducts = async (name) => {
  const query = await client.query({
    query: 
    gql`
  query {
    category(input: {
      title: "${name}"
    }){
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
        attributes
        {
          name
          type
          items
          {
            value
            displayValue
          }
        }
      }
    }
  }
  `,
  });
  const result = structuredClone(query);
  if( result.data.category !== null){
    return result;
  } else {
    return { error: true, descriptionError: `${name} is non-existend category`, loading: result.loading};
  }
};

export const fetchSelectedProduct = async (id) => {
  const query = await client.query({
    query: 
    gql`
  query {
    product( id: "${id}"){
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
        attributes
        {
          name
          type
          items
          {
            value
            displayValue
          }
        }
      }
    }
  `,
  });
  const result = structuredClone(query);
  if( result.data.product !== null){
    return result;
  } else {
    return { error: true, descriptionError: `${id} is non-existend product`, loading: result.loading};
  }
};


export const fetchOtherData = async () => {
  const query = await client.query({
    query: QUERYES.OTHER_DATA,
  });
  const result = structuredClone(query);
  return result;
};

export const QUERYES = {
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
  `,
};