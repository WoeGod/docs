export const products = [
    {
      title: 'git clone测试',
      name: 'git',
      describe: 'git clone测试',
      url: 'https://gitee.com/yinghua123/document-test',
      path: 'project1'
    },
  ]
  
  export default products

  export interface TocEntry {
    name: string
    href?: string
    items?: TocEntry[]
  }

  export type Toc = TocEntry[]