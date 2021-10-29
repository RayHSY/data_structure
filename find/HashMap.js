class HashTable {
    constructor() {
        // 创建一个没有原型链的对象
        this.store = Object.create(null);
    }

    hash(key) {
        let hashKey = key.length;

        for (let i = 0; i < key.length; i++) {
            hashKey = (hashKey << 5) ^ (hashKey >> 27) ^ key.charCodeAt(i);
        }

        return hashKey & 0x7FFFFFFF;
    }

    isCrash(item) {
        return Object.prototype.toString.call(item) === '[object Map]';
    }

    put(item) {
        if (typeof item.key !== 'string') throw 'item must have key';

        const hashKey = this.hash(item.key);
        const crash = this.store[hashKey];

        if (crash) {
            if (this.isCrash(crash)) {
                crash.set(item.key, item);
            } else if (crash.key === item.key) {
                this.store[hashKey] = item;
            } else {
                const map = new Map();
                map.set(crash.key, crash);
                map.set(item.key, item);
                this.store[hashKey] = map;
            }
        } else {
            this.store[hashKey] = item;
        }
    }

    get(key) {
        const hashKey = this.hash(key);
        const crash = this.store[hashKey];

        if (crash) {
            if (this.isCrash(crash)) {
                return crash.get(key);
            } else {
                return crash;
            }
        }

        return null;
    }

    remove(key) {
        const hashKey = this.hash(key);
        const crash = this.store[hashKey];

        if (crash) {
            if (this.isCrash(crash)) {
                crash.delete(key);
            } else {
                this.store[hashKey] = null;
            }
        }

        return null;
    }

    clear() {
        this.store = {};
    }

    print() {
        const values = Object.values(this.store);
        const result = [];

        values.forEach(v => {
            if (this.isCrash(v)) {
                v.forEach(element => {
                    result.push(element);
                });
            } else {
                result.push(v);
            }
        });

        console.log(`hashMap: `, result);
    }
}

/**
 * 基础测试
 */
 function baseTest() {
    let hashTable = new HashTable();
    for (let i = 0; i < 10; i++) {
        hashTable.put({
            key: 'test' + i,
            value: 'some value' + i
        });
    }
    console.log('step1:', hashTable.print());
    //随机获取5次
    for (let j = 0; j < 5; j++) {
        let key = 'test' + Math.floor(Math.random() * 10);
        console.log(key);
        console.log(hashTable.get(key))
    }
    //获得一次空值
    console.log('get null:', hashTable.get('test10'))
    //修改一次值
    hashTable.put({
        key: 'test1',
        value: 'change'
    });
    //删除一次值
    hashTable.remove('test2');
    console.log('step2:')
    //输出修改后所有的
    hashTable.print();
}

baseTest();