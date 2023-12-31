// 1. 有效括号
function isValid(s) {
  while (s.length) {
    let temp = s;
    s = s.replace("{}", "");
    s = s.replace("[]", "");
    s = s.replace("()", "");
    if (s === temp) {
      return false;
    }
    return true;
  }
}
let str = "[}}{}";
//   console.log(isValid(str));

// 2.数组乱序
function arrRandom(arr) {
  if (!Array.isArray(arr)) console.error(new TypeError("数据格式不正确"));
  const len = arr.length;
  let newArr = [];
  for (let i = 0; i < len; i++) {
    let i = parseInt(Math.random() * arr.length);
    newArr.push(arr[i]);
    arr.splice(i, 1);
  }
  console.log(newArr);
  return newArr;
}
//   arrRandom([1, 2, 3, 4, 5]);

// 3.数组扁平化
function flatten(arr) {
  if (!Array.isArray(arr)) console.error(new TypeError("数据格式不正确"));
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  console.log(arr);
  return arr;
}
//   flatten([1, [2, [3, [4, [5]]]]]);
// 4.函数柯里化
//   function add(a) {
//     function s(b) {
//       a = a + b;
//       return s;
//     }
//     s.toString = function () {
//       return a;
//     };
//     return s;
//   }
//   function add(a) {
//     function s(b) {
//       a = a + b;
//       return s;
//     }
//     s.toString = function () {
//       return a;
//     };
//     return s;
//   }
//   // f 10
//   alert(add(1)(2)(3)(4));
//   console.log(add(1)(2)(3));
//   call apply bind封装
//call
Function.prototype.myCall = function () {
  const [context, ...args] = arguments;
  context.fn = this; // 将this指向函数实例
  const result = context.fn(...args);
  //引用完删除
  delete context.fn;
  return result;
};
function fn(a, b, c) {
  console.log(this, "---", a, b, c);
}
const obj = { a: 1 };
//   fn.myCall(obj, 1,2,3);
// apply
Function.prototype.myApply = function (context, ...args) {
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};
// fn.myApply(obj,[1,2,3])
// call
Function.prototype.myCall1 = function (...args) {
  const [context, ...others] = args;
  context.fn = this; // 指向函数实例
  const result = context.fn(...others);
  delete context.fn; // 引用完之后删除
};
//apply与call类似无非就是第二参数形式不一样而已
Function.prototype.myApply2 = function (context, ...args) {
  // 绑定this
  content.fn = this;
  const result = context.fn(...args);
  // 完成操作后删除
  delete context.fn;
  return result;
};
// 节流
//   function throttle(fn, time = 500, now = true) {
//     let callNow = true;
//     let timer = null;
//     let args = arguments;
//     return function () {
//       let context = this;
//       if (callNow) {
//         fn.apply(context, args);
//       }
//       timer = setTimeout(() => {
//         fn.apply(context, args);
//         clearTimeout(timer);
//       });
//     };
//   }

// 乱序
const arr = [1, 2, 3, 4, 5];
//   console.log(
//     arr.sort(function () {
//       return Math.random() - 0.5;
//     })
//   );

// 柯里化
function add(a) {
  function s(b) {
    //   console.log(b, 'b')
    a = a + b;
    console.log(s);
    return s;
  }
  s.toString = function () {
    return a;
  };
  return s;
}
//   alert(add(1)(2)(3)(4)(5));
// add(1)(2)(3)(4)(5);

//   function add(a) {
//     function s(b) {
//       a = a + b;
//       return s;
//     }
//     s.toString = function () {
//       return a;
//     };
//   return s
//   }


function promiseAll(promises) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("argument must be an array"));
    }
    var countNum = 0;
    var promiseNum = promises.length;
    var resolvedvalue = new Array(promiseNum);
    for (let i = 0; i < promiseNum; i++) {
      Promise.resolve(promises[i]).then(
        function (value) {
          countNum++;
          resolvedvalue[i] = value;
          if (countNum === promiseNum) {
            return resolve(resolvedvalue);
          }
        },
        function (reason) {
          return reject(reason);
        }
      );
    }
  });
}
// let p1 = new Promise((resolve,reject)=>{
//     resolve(1)
// })
// let p2 = new Promise((resolve,reject)=>{
//     resolve(2)
// })
// let p3 = new Promise((resolve,reject)=>{
//     resolve(3)
// })

// promiseAll([p1,p2,p3]).then(function(value){
//     console.log(value)
// })
// 实现promiseAll

//   function promiseAll(arr) {
//     return new Promise((resolve, reject) => {
//       let count = 0;
//       let valueList = [];
//       if (!Array.isArray(arr)) reject(new TypeError("shuzu"));
//       for (const promise of arr) {
//         Promise.resolve(promise).then((res) => {
//           if (arr.length === 1) resolve(res);
//           count++;
//           valueList.push(res);
//           if (count === arr.length) {
//             resolve(valueList);
//           }
//         });
//       }
//     });
//   }
// promiseAll([1, 2, 3, 45]).then((res) => console.log(res));
// promise.race;
const _race = (p) => {
  return new Promise((resolve, reject) => {
    p.forEach((item) => {
      Promise.resolve(item).then(resolve, reject);
    });
  });
};

function fb(n, num1 = 1, num2 = 1) {
  if (n == 0) return 0;
  if (n <= 2) {
    return num2;
  } else {
    return fb(n - 1, num2, num1 + num2);
  }
}
// 字符串中的第一个唯一字符
function hasOneChar(str) {
  let charArr = {};
  for (let i = 0; i < str.length; i++) {
    let curChar = str[i];
    if (str.indexOf(str[i]) === str.lastIndexOf(str[i])) {
      // charArr.push({[`${str[i]}`]: i});
      charArr = Object.assign(charArr, { [`${str[i]}`]: i });
    }
  }
  console.log(charArr);
}
// hasOneChar("ssssddddfggggeeer");
// 有效的字母异位词
function isAnagram(str1, str2) {
  let s1 = str1.split("").sort().join();
  let s2 = str2.split("").sort().join();
  console.log(s1 === s2);
  // return s1 === s2
}
// isAnagram('angue', 'afune')
var arr3 = ["flower", "flow", "flight"];
function longestCommonPrefix(arr) {
  if (!arr.length) return "";
  let firstStr = arr[0];
  let result = "";
  for (let i = 0; i < firstStr.length; i++) {
    for (let j = 1; j < arr.length; j++) {
      if (firstStr[i] !== arr[j][i]) {
        return result;
      }
    }
    result += firstStr[i];
  }

  return result;
}
// console.log(longestCommonPrefix(arr3));
// longestCommonPrefix(arr3);
function strs() {
  const str = "asdaaas";
  const arr = str.split("");
  const o = [];
  for (let i = 0; i < arr.length; i++) {
    if (o[str[i]]) {
      o[str[i]] += 1;
    } else {
      o[str[i]] = 1;
    }
  }
  console.log(o);
}
// strs();
function strrep() {
  const str = "get-element-by-id";
  const arr = str.split("-");
  for (let i = 1; i < arr.length; i++) {
    arr[i] = arr[i][0].toUpperCase() + arr[i].substring(1);
  }
  console.log(arr);
}
// strrep();

// url转换参数
function urlobj() {
  const url = "http://item.taobao.com/item.htm?a=1&b=2&c=&d=xxx&e";
  let urlArr;
  let urlObj = {};
  try {
    urlArr = new URL(url);
  } catch (err) {
    console.log(err);
  }
  urlArr.searchParams.forEach((item, idx) => (urlObj[idx] = item));
  console.log(urlObj);
}
// urlobj();

// 判断字符串中字符出现次数
function strMany() {
  const str = "sssaaaafffhae";
  let obj = {};
  for (let i = 0; i < str.length; i++) {
    let s = str[i];
    if (!obj[s]) {
      obj[s] = 1;
    } else {
      obj[s] += 1;
    }
  }
  let max = 0;
  // min = 0;
  let item, minitem;
  for (let key in obj) {
    // max = max > obj[key] ? max : obj[key];
    // min = min > obj[key] ? min : obj[key];
    console.log(obj[key], key);
    if (obj[key] > max) {
      max = obj[key];
      item = key;
    }
  }
  console.log(max, "w");
}
// strMany();
// alert('2')
// confirm(2)
// prompt()

// 延迟执行函数
async function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}
async function test() {
  let time = Date.now();
  await sleep(2000);
  console.log(time, "ss");
}

// 两数之和 且返回此相应数组
function numAdd(arr, target) {
  let newArr = arr;
  let targetArr = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        targetArr.push([arr[i], arr[j]]);
        arr.splice(i, 1);
        arr.splice(j, 1);
      }
    }
  }
  console.log(targetArr);
}
function numAdd1(arr, target) {
  let newArr = arr;
  let targetArr = [];
  for (let i = 0; i < arr.length; i++) {
    let res = target - arr[i];
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        targetArr.push([arr[i], arr[j]]);
        arr.splice(i, 1);
        arr.splice(j, 1);
      }
    }
  }
  console.log(targetArr);
}
// numAdd1([1, 2, 3, 4, 5],5);

// 一个数组对象内age的平均值与排序
function averageSort(arrObj) {
  let newArr = [];
  let average = 0;
  if (Array.isArray(arrObj)) {
    newArr = arrObj.sort((a, b) => a.age - b.age);
    //  arrObj.reduce(() => {}, 0)
    // average = Math.round()
    average = (
      newArr.reduce((num, item) => num + item?.age, 0) / newArr.length
    ).toFixed(2);
  }
  console.log(newArr, average);
}
// averageSort([
//   { name: "a", age: 1 },
//   { name: "c", age: 5 },
//   { name: "b", age: 2 },
// ]);
const data = {
  books: [
    {
      title: "《活着》",
      anchor: "余华",
      price: 28.8,
    },
    {
      title: "《三国演义》",
      anchor: "罗贯中",
      price: 48.8,
      tag: ["战争", "历史"],
    },
  ],
  detail: {
    create_time: 137161901,
  },
  fn: () => { },
};

// 实现一个深拷贝函数
function deepClone(source) {
  const targetObj = source?.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
  for (let keys in source) {
    // 遍历目标
    if (source.hasOwnProperty(keys)) { // 用来判断这个key是不是这个对象上固有的属性
      // if(Object.hasOwn(source, keys)){
      if (source[keys] && typeof source[keys] === "object") {
        // 如果值是对象，就递归一下
        targetObj[keys] = deepClone(source[keys]);
      } else {
        // 如果不是，就直接赋值
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}

// console.log(deepClone(data) === data, deepClone(data), data);

// 封装一个 instanceof
function myInstanceOf(left, right) {
  let _proto = Object.getPrototypeOf(left);
  let _prototype = right.prototype;
  // console.log(_proto, _prototype);
  while (true) {
    if (!_proto) {
      return false;
    }
    if (_proto === _prototype) {
      return true;
    }
    // 如果没找到就在向上找一层
    _proto = Object.getPrototypeOf(_proto);
  }
}
// console.log(myInstanceOf(2, Array));

// 千分位转化
// 最简单的方式toLocalString
function numFormat1(num) {
  // let n = num || 0
  console.log(num?.toLocaleString());
  return num?.toLocaleString()
}
// numFormat1(1234567)

// 实现数组扁平话
function flatten2(arr) {
  // let newArr =  []
  // console.log(22);
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  console.log(arr);
  return arr;
}
// flatten2([1, [2, [3, [4, [5]]]]])

// 深拷贝
function deepClone2(obj) {
  let targetObj = obj?.constructor === Array ? [] : {}
  for (let keys in obj) {
    if (obj.hasOwnProperty(keys)) {
      if (typeof keys === 'object') {
        targetObj[keys] = deepClone2(obj[keys])
      } else {
        targetObj[keys] = obj[keys]
      }
    }
  }
  // console.log(targetObj);
}
const arr111 = [{ city: 'chongqi' }, { city: 'qiji' }, { city: 'chongqi' }];

// 数组对象去重
function uniq(arr) {
  if (arr && arr.length <= 0) return -1;
  let obj = {}
  let newArr = arr.reduce((acc, cur) => {
    obj[cur?.city] ? '' : obj[cur?.city] = true && acc.push(cur)
    return acc
  }, [])
  console.log(newArr);
}
// uniq(arr111)
// 回文判断
function checkPalindrom(str) {
  //  const str1 = "mamam"
  return str?.split('')?.reverse()?.join('') === str // true
  // const strArr = str.split()
  // console.log();
}
//  console.log( checkPalindrom('mamam'));
// 验证回文
function isPalindrome(str) {
  // 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
  const reg = /[^0-9A-Za-z]/g
  const tempStr = str?.replace(reg, '')
  const reverseStr = tempStr.split('').reverse()?.join('')
  return reverseStr.toUpperCase() === tempStr.toUpperCase()
  // console.log(tempStr);
  // console.log(reverseStr);
}
//  console.log( isPalindrome( "A man, a plan, a canal: Panama"));

// 统计字符串出现最多的字母
function findMaxDuplicateChar() {
  // afjghdfraaaasdenas
  let obj = {}
  let str = 'afjghdfraaaasdenas';
  for (let i = 0; i < str.length; i++) {
    const item = str[i]
    if (obj[item]) {
      obj[item] += 1
    } else {
      obj[item] = 1
    }
  }
  let max = 0
  let itm = ''
  for (const key in obj) {
    const ele = obj[key]
    if (max < ele) {
      max = ele;
      itm = key
    }
  }
  console.log(itm, max);
}

// findMaxDuplicateChar()

// 字符串中的第一个唯一字符
function firstUniqChar(str = 'aaleetcode') {
  for (let i = 0; i < str.length; i++) {
    const curChar = str[i];
    if (str.lastIndexOf(curChar) === str.indexOf(curChar)) {
      // console.log(element, index);
      return { [`${curChar}`]: i }
    }
  }
  return -1
}
// console.log(firstUniqChar());
// 生成指定长度的随机字母数字字符串
function randomStr(num) {
  let str = ''
  for (let i = 0; i < num; i++) {
    str += Math.random().toString(36).substring(2)
  }
  // console.log(str.substring(0, num));
  return str.substring(0, num)
}
// randomStr(5)

function arrRandom1(arr) {
  let len = arr.length
  let newArr = []
  for (let i = 0; i < len; i++) {
    let idx = parseInt(Math.random() * arr.length)
    newArr.push(arr[idx])
    arr.splice(idx, 1)
  }
  console.log(newArr);
}
arrRandom1([1, 2, 3, 4, 5])