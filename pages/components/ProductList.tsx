import { products } from '../../data/common';
import styled from 'styled-components';
import Link from 'next/link';

const ProductWrapper = styled.div`
  padding: 66px;
  padding-bottom: 0;
  &:last-child {
    padding-bottom: 66px;
  }
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

const DocItem = styled(Link)`
  border-left: 2px solid #000000;
  padding: 3px 10px;
  margin-right: 50px;
  font-weight: bold;
  &: hover {
    text-decoration: underline;
  }
`

interface IProductList {
  productData: API.IProductData;
}

export default function ProductList(props: IProductList) {
  const { productData = {} } = props;
  return (
    <>
      {
        products.map(product => {
          return (
            <ProductWrapper key={product.name}>
              <Title>{product.title}</Title>
              <DocWrapper>
                {
                  productData[product.name]?.docs?.map(docItem => {
                    return <DocItem key={docItem.name} href={`/docs/${product.name}/${docItem.name}`}>{docItem.title}</DocItem>
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
