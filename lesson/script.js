let num = 266219;

let str = String(num);

let arr = str.split('');

let result = 1;

for ( let i = 0; i < arr.length; i++) {
    result *= arr[i];
}

let p = result ** 3;

let final = String(p);

console.log(final.substring(0, 2));

