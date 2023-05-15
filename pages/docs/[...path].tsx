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
  type: string
  content: any
  toc: Toc
  product: string
}

export default (props: ContentProps) => {
  if (!props.content) {
    return <main>not found</main>
  }

  return <div className="flex flex-col">
    <Header />
    
    <div className="flex">
      <div className="flex-none w-64 bg-[#f0f0f0]"><TocPanel toc={props.toc} base={`/docs/${props.product}`} /></div>
      <div className="flex-auto shadow-[0_0_2px_rgba(0,0,0,0.12)] bg-white"><ContentPanel type={props.type} content={props.content} /></div>

    </div>
  </div>
}

export async function getServerSideProps(context: any) {
  const paths: string[] = context.params.path
  console.log(paths)
  const productName = paths[0]
  const product = products.find(p => p.name === productName)
  if (!product) {
    return {
      props: {},
    }
  }

  // check if repo exists
  const dir = `docs/${product.name}/${product.path}`
  if (!fs.existsSync(dir)) {
    await git.clone({ fs, http, url: product.url, dir, depth: 1 })
  }

  // load toc
  let toc
  let tocFile = `${dir}/toc.yml`
  if (fs.existsSync(tocFile) && fs.lstatSync(tocFile).isFile()) {
    toc = YAML.parse(fs.readFileSync(tocFile).toString())
  }

  // load page
  let name = [dir, ...paths.slice(1)].join("/")

  if (fs.existsSync(name) && fs.lstatSync(name).isDirectory()) {
    name = `${name}/index`
  }
  try {
    const f = name + ".md"
    console.log(f)
    const content = fs.readFileSync(f).toString()
    const mdxContent = await serialize(content)
    console.log(toc)
    return {
      props: {
        type: "md",
        content: mdxContent,
        toc: toc.items,
        product: product.name
      },
    }
  } catch (error) { }

  try {
    const f = name + ".mdx"
    console.log(f)
    const content = fs.readFileSync(f).toString()
    const mdxContent = await serialize(content)
    return {
      props: {
        type: "mdx",
        content: mdxContent,
        toc: toc.items,
        product: product.name
      },
    }
  } catch (error) { }

  try {
    const f = name + ".openapi.json"
    console.log(f)
    console.log('openAPI', toc)
    const content = JSON.parse(fs.readFileSync(f).toString())
    return {
      props: {
        type: "openapi.json",
        content,
        toc: toc.items,
        product: product.name
      },
    }
  } catch (error) { }

  try {
    const f = name + ".openapi.yml"
    console.log(f)
    const content = YAML.parse(fs.readFileSync(f).toString())
    return {
      props: {
        type: "openapi.yml",
        content,
        toc: toc.items,
        product: product.name
      },
    }
  } catch (error) { }


  return {
    props: {
    },
  }
}
