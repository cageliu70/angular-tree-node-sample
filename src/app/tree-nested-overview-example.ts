import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
  isSelected?: boolean;
}

const TREE_DATA: FoodNode[] = [
  { name: 'hello', isSelected: true },
  {
    name: 'Fruit1',
    children: [
      { name: 'Apple' },
      { name: 'Banana', isSelected: true },
      { name: 'Fruit loops' },
    ],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
      },
    ],
  },
  { name: 'root level' },
];

/**
 * @title Tree with nested nodes
 */
@Component({
  selector: 'tree-nested-overview-example',
  templateUrl: 'tree-nested-overview-example.html',
  styleUrls: ['tree-nested-overview-example.css'],
})
export class TreeNestedOverviewExample {
  treeControl = new NestedTreeControl<FoodNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FoodNode) =>
    !!node.children && node.children.length > 0;

  public selectNode($e: FoodNode) {
    this.clearNode(TREE_DATA);
    $e.isSelected = true;
  }

  private clearNode(x: FoodNode[]) {
    x.forEach(child => {
      child.isSelected = false;
      if (child.children) {
        this.clearNode(child.children);
      }
    })
  }
}

/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
