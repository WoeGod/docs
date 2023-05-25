// import { useEffect, useMemo, useState } from 'react';
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

const StyledTreeItem = styled(TreeItem)`{
  &.selected {
    >div:nth-child(1) {
      background: #0078d4;
      &: hover {
        background: #0078d4;
      }
      a {
        color: #fff;
      }
    }
  }
`

function Entry(base: string, entry: TocEntry) {
  if (entry.href) {
    return <Link href={`${base}/${entry.href.split(".")[0]}`}>{entry.name}</Link>
  }
  return <span>{entry.name}</span>
}

function TocTree({ toc, base, targetDoc }: TocProps) {
  return <Tree defaultOpenItems={[targetDoc]} aria-label="Tree">
    {toc?.map(i => {
      const isLeaf = !i.items?.length;
      const curPath = i.href?.split(".")[0];
      return <StyledTreeItem
        key={i.name}
        className={curPath === targetDoc ? 'selected' : ''}
        value={curPath} // TODO
        itemType={isLeaf ? 'leaf' : 'branch'}
      >
        <TreeItemLayout>{Entry(base, i)}</TreeItemLayout>
        {i.items && <TocTree toc={i.items} base={base} targetDoc={targetDoc} />}
      </StyledTreeItem>
    })}
  </Tree>
}

export default function TocPanel({ toc, base, targetDoc }: TocProps) {
  return <TocTree toc={toc} base={base} targetDoc={targetDoc} />
}