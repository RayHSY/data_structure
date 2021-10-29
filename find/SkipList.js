const MAX_LEVEL = 16;

class Node {
    constructor(props = {}) {
        const { data = -1, maxLevel = 0, refer = new Array(MAX_LEVEL) } = props;

        this.data = data; // 每个节点的数据
        this.maxLevel = maxLevel; // 当前节点处于整个跳表的级数
        this.refer = refer; 
    }
}

class SkipList {
    constructor() {
        this.levelCount = 1;
        this.head =  new Node();
    }

    randomLevel() {
        let level = 1;
        for (let i = 0; i < MAX_LEVEL; i++) {
            if (Math.random() > 0.5) level++;
        }

        return level;
    }

    insert(value) {
        const level = this.randomLevel();
        const newNode = new Node({ data: value, maxLevel: level });
        const refer = new Array(level).fill(newNode);
        let p = this.head;

        // 获取newNode节点的各个阶级索引下的下一个节点，并保存到refer数组里
        for (let i = level - 1; i >= 0; i--) {
            while (p.refer[i] !== undefined && newNode.data > p.refer[i].data) {
                // p.refer[i]代表i级索引上P节点的下一节点
                p = p.refer[i];
            }

            refer[i] = p;
        }

        // 将newNode插入各个阶级链表
        for (let i = 0; i < level; i++) {
            newNode.refer[i] = refer[i].refer[i];
            refer[i].refer[i] = newNode;
        }

        if (this.levelCount < level) {
            this.levelCount = level;
        }
    }

    find(value) {
        if (!value) return null;

        let p = this.head;
        for (let i = this.levelCount - 1; i >= 0; i--) {
            while (p.refer[i] !== undefined && value > p.refer[i].data) {
                p = p.refer[i];
            }
        }

        if (p.refer[0] !== undefined && p.refer[0].data === value) {
            return p.refer[0];
        }

        return null;
    }

    remove(value) {
        let _node;
        let p = this.head;
        const refers = new Array(new Node());

        for (let i = this.levelCount; i >= 0; i--) {
            while (p.refer[i] !== undefined && p.refer[i].data < value) {
                p = p.refer[i];
            }

            refers[i] = p;
        }

        if (p.refer[0] !== undefined && p.refer[0].data === value) {
            _node = p.refer[0];

            for (let i = 0; i < refers.length; i++) {
                refers[i].refer[i] = refers[i].refer[i].refer[i];
            }

            return _node;
        }

        return null;
    }

    printAllWithLevel() {
        let result = [];

        for (let i = this.levelCount - 1; i >= 0; i--) {
            let p = this.head;
            while(p.refer[i] !== undefined) {
                result.push(p.refer[i].data);
                p = p.refer[i];
            }

            console.log(`level ${i}:  ${result.join(',')}`);
            result = [];
        }
    }

    printAll() {
        let result = [];
        let p = this.head;

        while(p.refer[0] !== undefined) {
            result.push(p.refer[0].data);
            p = p.refer[0];
        }

        console.log(result);
    }
}

test();
function test() {
    let list = new SkipList();
    let length = 20000;
    //顺序插入
    for (let i = 1; i <= 10; i++) {
        list.insert(i);
    }
    //输出一次
    // list.printAll();
    console.time('create length-10')
    //插入剩下的
    for (let i = 11; i <= length - 10; i++) {
        list.insert(i);
    }
    console.timeEnd('create length-10')
    //搜索 10次
    console.time('find length')
    for (let j = 0; j < 10; j++) {
        let key = Math.floor(Math.random() * length + 1);
        console.log(key, list.find(key))
    }
    console.timeEnd('find length')
    //搜索不存在的值
    console.log('null:', list.find(length + 1));
    //搜索5000次统计时间
    console.time('search 5000');
    for (let j = 0; j < 5000; j++) {
        let key = Math.floor(Math.random() * length + 1);
    }
    console.timeEnd('search 5000');
}