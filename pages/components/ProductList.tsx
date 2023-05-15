import { products } from '../../data/common';
// import { styled } from 'styled-components';
import styles from './product.module.css';

// const ProductWrapper = styled.div`
//   padding: 66px;
// `

// const Title = styled.h1`
//     font-size: 44px;
//     line-height: 64px;
//     margin: 0;
//     margin-bottom: 40px;
// `

export default function ProductList() {
  return (
    <>
      {
        products.map(product => {
          return (
            <div key={product.name} className={styles.productWrapper}>
              <h1 className={styles.title}>{product.title}</h1>
            </div>
          )
        })
      }
    </>
  );
}