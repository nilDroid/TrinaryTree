

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.middle = null;
    this.count = null;
  };
};

class TrinaryTree {
  constructor() {
    this.root = null;
  }
  insert(val) {
    const newNode = new Node(val);
    var valueAdded = false;
    if (!this.root) {
      this.root = newNode;
      return this;
    };
    let current = this.root;

    const insertSide = side => {
      if (!current[side]) {
        current[side] = newNode;
        valueAdded = true;
        return this;
      }
      else{
        current = current[side];
      }
      
    };

    while (true) {
      if (val === current.val && valueAdded) {
        return this;
      };
      if(val === current.val && current.middle === null)
        insertSide('middle');
      else if (val < current.val) 
        insertSide('left');
      else 
        insertSide('right');
    };
  };

  delete(val) {
    if (!this.root) return undefined;

    let current = this.root,
        parent;
  
    const pickSide = side => {
      if (!current[side]) {
        return 'No node found!';
      }
 
      parent = current;
      current = current[side];
    };
  
    const deleteNodeValue = side => {
       if (current.val === val) {
        const children = this.traverse(current.val);
        parent[side] = null;
        children.splice(0, 1);
        children.forEach(child => this.insert(child));
      };
    };

    while (current.val !== val) {
      if (val < current.val) {
        pickSide('left');
        deleteNodeValue('left');
      }
      else {
        pickSide('right');
        deleteNodeValue('right');
      };
    };
  
    return current;
  }

  find(val) {
    if (!this.root) return undefined;
    let current = this.root,
        found = false;
  
    while (current && !found) {
      if (val < current.val) current = current.left;
      else if (val > current.val) current = current.right;
      else found = true;
    };
  
    if (!found) return 'Nothing Found!';
    return current;
  };

  traverse(start) {
    let data = [],
        queue = [],
        current = start ? this.find(start) : this.root;
  
    queue.push(current);
    while (queue.length) {
      current = queue.shift();
      data.push(current.val);
  
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
      if (current.middle) queue.push(current.middle);
    };
  
    return data;
  }

};

let trinaryTreeObj = new TrinaryTree();
let valToBeAdded = [5,4,9,5,7,10,2,2];

for (const val of valToBeAdded) {
  trinaryTreeObj.insert(val);
}

trinaryTreeObj.delete(4);
console.log("------------ After Deleted from tree  -----------------");
console.log(trinaryTreeObj);