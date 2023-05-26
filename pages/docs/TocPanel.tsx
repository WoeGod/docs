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
  toc: API.DocItem[];
  base: string;
  targetDoc: string;
  openItems?: string[];
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
const addOpenItemsToItems = (items: API.DocItem[], defaultOpenItems: string[] = []): API.DocItem[] => {
  return items.map((item) => {
    const key = item.href.split('.')[0];
    const openItems: string[] = [...defaultOpenItems, key];
    return {
      ...item,
      openItems,
      items: item.items && addOpenItemsToItems(item.items, openItems),
    }
  })
};

const Array2Map = (items: API.DocItem[], defaultMap: { [key: string]: string[] } = {}) => {
  const map = defaultMap;
  items.forEach(item => {
    const key = item.href.split('.')[0];
    map[key] = item.openItems || [];
    if (item.items) {
      Array2Map(item.items, map)
    }
  })
  return map;
};

const getOpenItems = (items: API.DocItem[], targetDoc: string) => {
  const newItems = addOpenItemsToItems(items, []);
  const openItemsMap = Array2Map(newItems);
  const openItems = openItemsMap[targetDoc];
  return openItems;
};

function Entry(base: string, entry: API.DocItem) {
  if (entry.href) {
    return <Link href={`${base}/${entry.href.split(".")[0]}`}>{entry.name}</Link>
  }
  return <span>{entry.name}</span>
}

function TocTree({ toc, base, targetDoc, openItems }: TocProps) {
  return <Tree defaultOpenItems={openItems} aria-label="Tree">
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
        {i.items && <TocTree toc={i.items} base={base} targetDoc={targetDoc} openItems={openItems} />}
      </StyledTreeItem>
    })}
  </Tree>
}

export default function TocPanel({ toc, base, targetDoc }: TocProps) {
  const openItems = getOpenItems(toc, targetDoc);
  return <TocTree toc={toc} base={base} targetDoc={targetDoc} openItems={openItems} />
}