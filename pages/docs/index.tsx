import products from "@/data/common"
import Link from "next/link"

export default ({ products }: any) => {
  return products.map((p: any) =>
    <Link key={p.name} href={`/docs/${p.name}`}>{p.name}</Link>
  )
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  //const res = await fetch('https://.../posts')
  //const posts = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      products,
    },
  }
}