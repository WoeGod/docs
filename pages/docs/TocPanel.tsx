import { Toc, TocEntry } from "@/data/common"

import {
  Tree,
  TreeItem,
  TreeItemLayout,
} from "@fluentui/react-components/unstable";
import Link from "next/link";

interface TocProps {
  toc: Toc
  base: string
}

function Entry(base: string, entry: TocEntry) {
  if (entry.href) {
    return <Link href={`${base}/${entry.href.split(".")[0]}`}>{entry.name}</Link>
  }
  return <span>entry.name</span>
}

function TocTree({ toc, base }: TocProps) {
  return <Tree>
    {toc.map(i => {
      return <TreeItem>
        <TreeItemLayout>{Entry(base, i)}</TreeItemLayout>
        {i.items && <TocTree toc={i.items} base={base} />}
      </TreeItem>
    })}
  </Tree>
}

export default ({ toc, base }: TocProps) => {
  return <TocTree toc={toc} base={base} />
}