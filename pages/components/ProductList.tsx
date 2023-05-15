import { products } from '../../data/common';
import { IProductData } from '..';
import styled from 'styled-components';

const ProductWrapper = styled.div`
  padding: 66px;
`

const Title = styled.h1`
  font-size: 44px;
  line-height: 64px;
  margin: 0;
`

const DocWrapper = styled.div`
  font-size: 14px;
  width: 50%;
  display: flex;
  padding: 30px 0;
`

const DocItem = styled.h4`
  border-left: 2px solid #000000;
  padding: 3px 10px;
  margin-right: 50px;
`

interface IProductList {
  productData: IProductData;
}

export default function ProductList(props: IProductList) {
  const { productData } = props;
  return (
    <>
      {
        products.map(product => {
          return (
            <ProductWrapper key={product.name}>
              <Title>{product.title}</Title>
              <DocWrapper>
                {
                  productData[product.name].docs.map(docItem => {
                    return <DocItem key={docItem.name}>{docItem.name}</DocItem>
                  })
                }
              </DocWrapper>
            </ProductWrapper>
          )
        })
      }
    </>
  );
}
