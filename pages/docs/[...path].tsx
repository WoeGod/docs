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

export interface ContentProps {
  type: string;
  content: any;
  toc: Toc;
  product: string;
  docName: string;
  routePaths: string[];
}

export default (props: ContentProps) => {
  if (!props.content) {
    return <main>not found</main>
  }

  const targetDoc = props.routePaths[props.routePaths.length - 1];

  return <div className="flex flex-col" style={{ height: '100%' }}>
    <Header />
    
    <div className="flex" style={{ height: '100%' }}>
      <div className="flex-none w-64 bg-[#f0f0f0]">
        <TocPanel toc={props.toc} base={`/docs/${props.product}/${props.docName}`} targetDoc={targetDoc} />
      </div>
      <div className="flex-auto shadow-[0_0_2px_rgba(0,0,0,0.12)] bg-white p-5">
        <ContentPanel type={props.type} content={props.content} />
      </div>

    </div>
  </div>
}

export async function getServerSideProps(context: any) {
  const paths: string[] = context.params.path
  const productName = paths[0];
  const docName = paths[1];

  const product = products.find(p => p.name === productName)
  if (!product) {
    return {
      props: {},
    }
  }

  // check if repo exists
  const dir = `docs/${product.name}/${docName}/docs`
  // console.log('dir ==> ', dir);
  if (!fs.existsSync(dir)) {
    await git.clone({ fs, http, url: product.url, dir, depth: 1 })
  }

  let docData: string[];
  const yamlFile = `docs/${product.name}/yaml`
  if (fs.existsSync(yamlFile) && fs.lstatSync(yamlFile).isFile()) {
    const data = YAML.parse(fs.readFileSync(yamlFile).toString())
    docData = data?.docs?.map((i: API.IDoc) => i.name) || [];
  }

  // load toc
  let toc
  let tocFile = `${dir}/toc.yml`
  if (fs.existsSync(tocFile) && fs.lstatSync(tocFile).isFile()) {
    toc = YAML.parse(fs.readFileSync(tocFile).toString())
  }

  // load page
  // let name = [dir, ...paths.slice(1)].join("/")
  let name = dir;
  name = [dir, ...paths.slice(2)].join("/")

  // console.log(name, 'nameeeeeeeeeeeeeeeeeeeeeee')

  if (fs.existsSync(name) && fs.lstatSync(name).isDirectory()) {
    name = `${name}/index`
  }

  const defaultProps = {
    routePaths: paths,
    toc: toc.items,
    product: product.name,
    docName
  }

  try {
    const f = name + ".md"
    // console.log(f, 'fffffffffffffffffffff')
    const content = fs.readFileSync(f).toString()
    const mdxContent = await serialize(content)
    // console.log(toc, 'tocccccccccccccccccc')
    return {
      props: Object.assign(defaultProps, {
        type: "md",
        content: mdxContent,
      }),
    }
  } catch (error) { }

  try {
    const f = name + ".mdx"
    // console.log(f)
    const content = fs.readFileSync(f).toString()
    const mdxContent = await serialize(content)
    return {
      props: Object.assign(defaultProps, {
        type: "mdx",
        content: mdxContent
      }),
    }
  } catch (error) { }

  try {
    const f = name + ".openapi.json"
    // console.log(f)
    // console.log('openAPI', toc)
    const content = JSON.parse(fs.readFileSync(f).toString())
    return {
      props: Object.assign(defaultProps, {
        type: "openapi.json",
        content,
      }),
    }
  } catch (error) { }

  try {
    const f = name + ".openapi.yml"
    // console.log(f)
    const content = YAML.parse(fs.readFileSync(f).toString())
    return {
      props: Object.assign(defaultProps, {
        type: "openapi.yml",
        content,
      }),
    }
  } catch (error) { }


  return {
    props: {
    },
  }
}
