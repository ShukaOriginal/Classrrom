import {
  mkdir, mkfile, isFile, getName, getMeta, getChildren,
  isDirectory,
} from '@hexlet/immutable-fs-trees';
import _ from 'lodash';


export const upcaseFileNames = (tree) => {
  if (isFile(tree)) {
    let newname = tree.name.split(".");
    newname[0] = newname[0].toUpperCase()
    newname[1] = newname[1].toLowerCase()

    tree.name = newname[0].concat("." + newname[1]);
  } else {
    for (let i = 0; i < tree.children.length; i++){
      upcaseFileNames(tree.children[i]);
    }
    
  }
  return tree;
 };


 
 export const countFilesWeight = (tree) => {
  let size = 0;
  if (isDirectory(tree) && tree.meta.size > 0){
    size = tree.meta.size + size;
    return size;
  }else if(isFile(tree)  && tree.meta.size > 0){
    size = tree.meta.size + size;
    return size;
  }else {
    for (let i = 0; i < tree.children.length; i++){
      size = size + countFilesWeight(tree.children[i]);
    }
  }
  return size;
 };


let list = {
  empty: [],
  hasChildren: [],
};
export const countDirs = (tree) => {

  if (tree == undefined){
    return undefined;
  }

  if(isDirectory(tree) && tree.children.length == 0){
    list.empty.push(tree.name);
  }
  else if(isDirectory(tree) && tree.children.length >= 1){
    if(tree.name != '/'){
      list.hasChildren.push(tree.name);
    }

    for (let i = 0; i < tree.children.length; i++){
      countDirs(tree.children[i]);
    }
  }

  return list;
}


export const addInternalElement = (tree, clas, newTree) => {
  if (tree == undefined){
    return undefined;
  }

  clas = 'column';
  newTree = {
    name: 'article',
    type: 'tag-internal',
    className: 'article',
    children: [],
    };//Как я понял в функцию должны приходить три пораметра, но clas и newTree undefined. По этому задаю так.

  if (clas == tree.className) {
    tree.children.push(newTree);
  }
  if (tree.children.length >= 1){
    for (let i = 0; i < tree.children.length; i++){
      addInternalElement(tree.children[i], clas, newTree);
    }
  }
  return tree;
}


export const filterTree = (tree, clas) => {
  if (tree == undefined){
    return undefined;
  }

  clas = 'someClass'
  
  if (clas == tree.className) {
    delete tree[0];
  }
  
  if (tree.children.length >= 1){
    for (let i = 0; i < tree.children.length; i++){
      
      if (tree.children[i].className == clas){
        tree.children.splice(i, 1);
      }
      
    }
  }
  for (let i = 0; i < tree.children.length; i++){
    filterTree(tree.children[i], clas);
  }
  return tree;
}