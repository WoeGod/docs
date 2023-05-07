const products = [
    {
      title: 'git clone测试',
      name: 'git',
      describe: 'git clone测试',
      url: 'https://github.com/WoeGod/document-test.git',
      path: 'project1/docs'
    },
  ]
  
  export default products

  export interface TocEntry {
    name: string
    href?: string
    items?: TocEntry[]
  }

  export type Toc = TocEntry[]