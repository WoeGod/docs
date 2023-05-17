import fs from "fs";
import YAML from 'yaml';

import Link from "next/link"
import Header from "./components/Header"
import styled from "styled-components"
import SearchBox from "./components/SearchBox";
import ProductList from "./components/ProductList";
import products from "@/data/common";


const MainWrapper = styled.main`
  background: #E5E5E5;
  padding: 72px 46px;
`

const Title = styled.h1`
    font-size: 44px;
    line-height: 64px;
    margin: 0;
    margin-bottom: 40px;
`

const Description = styled.div`
  margin-bottom: 30px;
`

export default function Home(props: { productData: API.IProductData }) {
  const onSearch = (e) => {
    console.log(e.target.value, 'search value');
  };
  return (
    <>
      <Header />
      <MainWrapper>
        <Title>Technical documentation</Title>
        <Description>Search for in-depth articles on Qixin developer tools and technologies.</Description>
        <SearchBox style={{ width: 300 }} onChange={onSearch} />
      </MainWrapper>
      <ProductList productData={props.productData} />
    </>
  )
}


export async function getServerSideProps() {
  let productData: API.IProductData = {};
  let yamlFile
  products.forEach(product => {
    yamlFile = `docs/${product.name}/yaml.yml`
    if (fs.existsSync(yamlFile) && fs.lstatSync(yamlFile).isFile()) {
      const data = YAML.parse(fs.readFileSync(yamlFile).toString())
      productData[product.name] = data;
    }
  })
  
  return {
    props: {
      productData
    }
  }
}
