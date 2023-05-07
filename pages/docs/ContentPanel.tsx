import { MDXRemote } from 'next-mdx-remote';
import { RedocStandalone } from 'redoc';

export interface ContentProps {
    type: string
    content: any
  }

export default (props: ContentProps) => {
    if (!props.content) {
      return <main>not found</main>
    }
  
    if (props.type === "md" || props.type === "mdx") {
      return <main>
        <MDXRemote {...props.content} />
      </main>
    }
  
    if (props.type === "openapi.json" || props.type === "openapi.yml") {
      return <main>
        <RedocStandalone spec={props.content} />
      </main>
    }
  
    return <main>error</main>
  }
  