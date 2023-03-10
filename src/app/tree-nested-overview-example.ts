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
  screen?: screenNode;
  isSelected?: boolean;
}

interface screenNode {
  displayname: string;
}

const screens: screenNode[] = [
  { displayname: 'Landing Page/Promotion' },
  { displayname: 'Landing Page/Quick Draw' },
  { displayname: 'Landing Page/Offers' },
  { displayname: 'Account Section/My Account Update' },
  { displayname: 'Account Section/My Account/Patron Profile' },
  { displayname: 'Account Section/My Account/Patron Earning' },
  { displayname: 'Redemption' },
  { displayname: 'Win Loss' },
];

const Screen_Tree: FoodNode[] = [];

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
    //this.dataSource.data = TREE_DATA;
    this.convertScreen2Tree();
  }

  hasChild = (_: number, node: FoodNode) =>
    !!node.children && node.children.length > 0;

  public selectNode($e: FoodNode) {
    this.clearNode(this.dataSource.data);
    $e.isSelected = true;
  }

  private clearNode(x: FoodNode[]) {
    x.forEach((child) => {
      child.isSelected = false;
      if (child.children) {
        this.clearNode(child.children);
      }
    });
  }

  private convertScreen2Tree() {
    screens.forEach((child) => {
      const nestName = child.displayname.split('/');
      console.log('convertScreen2Tree', child.displayname, nestName);
      this.addScreen2Tree(nestName, Screen_Tree, child);
    });
    this.dataSource.data = Screen_Tree;
  }

  private addScreen2Tree(
    nestName: string[],
    tree: FoodNode[],
    currentscreen: screenNode
  ) {
    console.log('addScreen2Tree', nestName);
    if (nestName.length === 1) {
      tree.push({ name: nestName[0], screen: currentscreen });
    } else {
      if (!tree.some((x) => x.name === nestName[0])) {
        tree.push({ name: nestName[0], children: [] });
      }
      const treechildren = tree.find((x) => x.name === nestName[0]);
      if (treechildren) {
        this.addScreen2Tree(
          nestName.splice(1, nestName.length - 1),
          treechildren.children!,
          currentscreen
        );
      }
    }
  }
}

/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
