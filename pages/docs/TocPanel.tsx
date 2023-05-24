import { Toc, TocEntry } from "@/data/common"

import {
  Tree,
  TreeItem,
  TreeItemLayout,
} from "@fluentui/react-components/unstable";
import Link from "next/link";
import styled from "styled-components";

interface TocProps {
  toc: Toc;
  base: string;
  targetDoc: string;
}

const StyledTreeItem = styled(TreeItem)`
  background: ${(props: { actived: boolean }) => props.actived ? '#0078d4' : 'inherit'};
  >div:hover {
    background: ${(props: { actived: boolean }) => props.actived ? '#0078d4' : '#f5f5f5'};
  }
  a {
    color: ${(props: { actived: boolean }) => props.actived ? '#fff' : 'inherit'};
  }
`

function Entry(base: string, entry: TocEntry, isLeaf: boolean) {
  if (entry.href && isLeaf) {
    return <Link href={`${base}/${entry.href.split(".")[0]}`}>{entry.name}</Link>
  }
  return <span>{entry.name}</span>
}

function TocTree({ toc, base, targetDoc }: TocProps) {
  return <Tree defaultOpenItems={[targetDoc]} aria-label="Tree">
    {toc?.map(i => {
      const isLeaf = !i.items?.length;
      return <StyledTreeItem
        key={i.name}
        actived={i.href?.split(".")[0] === targetDoc}
        className="test"
        value={i.href?.split(".")[0]}
        itemType={isLeaf ? 'leaf' : 'branch'}
      >
        <TreeItemLayout>{Entry(base, i, isLeaf)}</TreeItemLayout>
        {i.items && <TocTree toc={i.items} base={base} targetDoc={targetDoc} />}
      </StyledTreeItem>
    })}
  </Tree>
}

export default function TocPanel({ toc, base, targetDoc }: TocProps) {
  return <TocTree toc={toc} base={base} targetDoc={targetDoc} />
}