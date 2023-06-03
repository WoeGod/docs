/* eslint-disable */
import products, { Toc } from "@/data/common"
import git from "isomorphic-git"
import fs from "fs"
import http from "isomorphic-git/http/node"
import { serialize } from 'next-mdx-remote/serialize'

import YAML from 'yaml'
import TocPanel from "./TocPanel"
import { Content } from "next/font/google"
import ContentPanel from "./ContentPanel"
import Header from "../components/Header"
import { arrayAddKey } from "@/utils"

export interface ContentProps {
  type: string;
  content: any;
  toc: API.DocItem[];
  product: string;
  docName: string;
  routePaths: string[];
}

export default (props: ContentProps) => {
  // console.log(props.routePaths, 'routePaths ===========');
  const targetDoc = props.routePaths?.join('/');

  return <div className="flex flex-col" style={{ height: '100%' }}>
    <Header />
    
    <div className="flex" style={{ height: '100%' }}>
      <div className="flex-none w-64 bg-[#f0f0f0]">
        <TocPanel toc={props.toc} base={`/docs/${props.product}`} targetDoc={targetDoc} />
      </div>
      <div className="flex-auto shadow-[0_0_2px_rgba(0,0,0,0.12)] bg-white p-5">
        {
          !props.content ? (
            <main>not found</main>
          ) :  <ContentPanel type={props.type} content={props.content} />
        }
      </div>

    </div>
  </div>
}

export async function getServerSideProps(context: any) {
  const paths: string[] = context.params.path;
  const filePrefix = 'docs/';
  const pathStr = paths.join('/');
  // console.log('paths ===========', paths);
  const productName = paths[0];

  const product = products.find(p => p.name === productName)
  if (!product) {
    return {
      props: {},
    }
  }

  // check if repo exists
  const dir = `${filePrefix}${pathStr}`
  // console.log('dir ==> ', dir);
  if (!fs.existsSync(dir)) {
    await git.clone({ fs, http, url: product.url, dir, depth: 1 })
  }

  // load toc
  let toc
  let tocFile = `${filePrefix}${paths.slice(0, 2).join('/')}/docs/toc.yml`;
  if (fs.existsSync(tocFile) && fs.lstatSync(tocFile).isFile()) {
    toc = YAML.parse(fs.readFileSync(tocFile).toString())
  }
  // console.log('load toc', toc);

  // is directory
  let name;
  if (fs.existsSync(dir) && fs.lstatSync(dir).isDirectory()) {
    name = `${dir}/docs/index.md`;
  } else {
    name = dir;
  }

  const defaultProps = {
    routePaths: paths,
    toc: arrayAddKey<API.DocItem[]>(toc.items),
    product: product.name,
  }

  const fileMap = {
    md: /\.md$/,
    mdx: /\.mdx$/,
    openaiJson: /\.openapi.json/,
    openaiYam: /\.openapi.yml/,
  };

  if (fileMap.md.test(name) || fileMap.mdx.test(name)) {
    const content = fs.readFileSync(name).toString();
    const mdxContent = await serialize(content);
    // console.log(toc, 'tocccccccccccccccccc')
    return {
      props: Object.assign(defaultProps, {
        type: fileMap.md.test(name) ? 'md' : 'mdx',
        content: mdxContent,
      }),
    }
  } else if (fileMap.openaiJson.test(name) || fileMap.openaiYam.test(name)) {
    const content = JSON.parse(fs.readFileSync(name).toString())
    return {
      props: Object.assign(defaultProps, {
        type: fileMap.openaiJson.test(name) ? 'openapi.json' : 'openapi.yml',
        content,
      }),
    }
  }

  return {
    props: {},
  }
}
