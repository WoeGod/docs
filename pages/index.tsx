import fs from "fs";
import YAML from 'yaml';

import Link from "next/link"
import Header from "./components/Header"
import styled from "styled-components"
import SearchBox from "./components/SearchBox";
import ProductList from "./components/ProductList";
import products from "@/data/common";
import git from "isomorphic-git"
import http from "isomorphic-git/http/node"


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
  const onSearch = (e: any) => {
    console.log(e.target.value, 'search value');
  };
  return (
    <div style={{ position: 'relative', paddingTop: 42 }}>
      <Header />
      <MainWrapper>
        <Title>Technical documentation</Title>
        <Description>Search for in-depth articles on Qixin developer tools and technologies.</Description>
        <SearchBox style={{ width: 300 }} onChange={onSearch} />
      </MainWrapper>
      <ProductList productData={props.productData} />
    </div>
  )
}


export async function getServerSideProps() {
  let productData: API.IProductData = {};
  let yamlFile

  const fetchList: Promise<any>[] = [];
  const setData = () => {
    products.forEach(product => {
      // 判断yaml文件是否存在，存在的话，则把内容写入productData
      yamlFile = `docs/${product.name}/yaml`
      if (fs.existsSync(yamlFile) && fs.lstatSync(yamlFile).isFile()) {
        const data = YAML.parse(fs.readFileSync(yamlFile).toString())
        productData[product.name] = data;
      } else {
        // 若不存在，则到git拉取项目
        // get product
        const dir = `docs/${product.name}/`;
        fetchList.push(git.clone({ fs, http, url: product.url, dir }));
      }
    })
  };

  setData();

  if (fetchList.length) {
    // 一次性将git项目都请求回来
    await Promise.all(fetchList).then(res => {
      console.log(res, '项目拉取成功！！！')
      // 重新调用一遍setData，以便将内容写入productData
      setData();
    }).catch(err => {
      console.log(err, '项目拉取失败，请刷新页面重试！');
      console.log(new Date());
    });
  }

  return {
    props: {
      productData
    }
  }
}
