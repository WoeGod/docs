export const products = [
    {
      title: 'git clone测试',
      name: 'git',
      describe: 'git clone测试',
      url: 'https://gitee.com/yinghua123/document-test',
      path: 'project1'
    },
    {
      title: 'Pytorch 中文文档',
      name: 'Pytorch',
      describe: 'Pytorch 中文文档',
      // url: 'https://github.com/WoeGod/document-test2.git',
      url: 'https://gitee.com/yinghua123/document-test2',
    }
  ]
  
  export default products

  export interface TocEntry {
    name: string
    href?: string
    items?: TocEntry[]
  }

  export type Toc = TocEntry[]