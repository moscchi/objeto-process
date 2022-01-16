console.log('el hijo aca');
const getRandomNumber = () => {
    let num = Math.round(Math.random()*1000);
    return num;
}
process.on('message', cant => {
    const arr = [];
    for (let i = 0; i < Number(cant); i++) {
        let num = getRandomNumber();
        arr.push(num);
    }
    arr.sort();
    const arrSinRepeticiones = arr.filter((numero, i) => i == 0 ? true:arr[i-1] != numero);
    
    const arrCantidad = arrSinRepeticiones.map(numero => arr.filter(numeroRandom => numero === numeroRandom).length);
    
    const obj = arrSinRepeticiones.reduce(function(acc, _, i) {
        acc[arrSinRepeticiones[i]] = arrCantidad[i];
        return acc;
    }, {});
    process.send(obj);
})