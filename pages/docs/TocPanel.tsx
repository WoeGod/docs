// import { useEffect, useMemo, useState } from 'react';
import { Toc, TocEntry } from "@/data/common"

import {
  Tree,
  TreeItem,
  TreeItemLayout,
} from "@fluentui/react-components/unstable";
import Link from "next/link";
import { useMemo } from "react";
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

const StyleLink = styled(Link)`
  display: inline-block;
  width: 100%;
`

function Entry(base: string, entry: API.DocItem) {
  if (entry.href) {
    return <StyleLink href={`${base}/${entry.href}`}>{entry.name}</StyleLink>
  }
  return <span>{entry.name}</span>
}

function TocTree({ toc, base, targetDoc, openItems }: TocProps) {
  return <Tree defaultOpenItems={openItems} aria-label="Tree">
    {toc?.map(i => {
      const isLeaf = !i.items?.length;
      return <StyledTreeItem
        key={i.name}
        className={i.href === targetDoc ? 'selected' : ''}
        value={i.key}
        itemType={isLeaf ? 'leaf' : 'branch'}
      >
        <TreeItemLayout>{Entry(base, i)}</TreeItemLayout>
        {i.items && <TocTree toc={i.items} base={base} targetDoc={targetDoc} openItems={openItems} />}
      </StyledTreeItem>
    })}
  </Tree>
}

export default function TocPanel({ toc, base, targetDoc }: TocProps) {
  const openItems = useMemo(() => {
    const map: {[href: string]: string[]} = {};
    const getOpenItems = (arr: API.DocItem[]) => {
      arr.forEach(item => {
        if (!item.openItems) return;
        map[item.href] = item.openItems;
        if (item.items) getOpenItems(item.items);
      })
    };
    getOpenItems(toc);
    return map[targetDoc];
  }, [targetDoc, toc]);
  return <TocTree toc={toc} base={base} targetDoc={targetDoc} openItems={openItems} />
}