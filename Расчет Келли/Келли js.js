'use strict'
const k=document.querySelector('.k');
const p=document.querySelector('.p');
const b=document.querySelector('.b');
const buttom=document.querySelector('.button');
const parent=document.querySelector('.parent');
const summa=document.querySelector('.summa');

let count=0;
let array=new Array();
let arrayP= new Array();
let arrayK=new Array();

//Вычисляет сумму ставки на основе введенных данных
let rezult=()=>{
    let sum=((k.value*p.value-1)/(k.value-1))*0.25*b.value;
    if(sum>0) return Math.floor(sum)
}

//Сохроняет введенные значения из input P в массив
function arraySumP(){
    if(rezult()!==undefined) {
        arrayP.push(+p.value)
        return arrayP
    }
}

//Сохроняем введеные значения из input К в массив
function arraySumK(){
    if(rezult()!==undefined) {
        arrayK.push(+k.value)
        return arrayK
    }
}

//Сохроняет полученные результаты суммы ставки в массив
function arraySum(){
    if(rezult()!==undefined) {
        array.push(rezult())
        return array
    }
}

//Минусование количества ставок
function minusCount(){
    count--
    document.getElementById("totalPI").innerHTML =count;
}

//Пересчет средней суммы ставки при удалении последней суммы суммы
function deletearraySumCurrent(array){
    array.splice(count,1)
    let deleteSumCurrent = array.reduce((sum, current) => (sum + current), 0);
    let deleteSum=+(deleteSumCurrent / array.length).toFixed(2)
    document.getElementById('totalSum').innerHTML=deleteSum;

//Пересчет общей суммы после удаления
    document.getElementById('totalO').innerHTML=deleteSumCurrent;
    return deleteSum
}

//Пересчет среднего коэфициента после удаления
function deletearraySumKCurrent(arrayK){
    arrayK.splice(count,1)
    let deleteSumKCurrent = arrayK.reduce((sum, current) => sum + current, 0);
    let deleteSumK=+(deleteSumKCurrent / arrayK.length).toFixed(2)
    document.getElementById('totalK').innerHTML=deleteSumK;
    return deleteSumK
}

//Пересчет средней вероятности после удаления
function deletearraySumPCurrent(arrayP) {
    arrayP.splice(count, 1)
    let deleteSumPCurrent = arrayP.reduce((sum, current) => sum + current, 0);
    let deleteSumP = +((deleteSumPCurrent * 100) / arrayP.length).toFixed(2)
    document.getElementById('totalP').innerHTML = deleteSumP;
    return deleteSumP
}

//Пересчет мат.ожидания после удаления
function deleteMatOzidanie(array){
    let deleteMatOzidanie=+(array.length*deletearraySumCurrent(array)*(deletearraySumKCurrent(arrayK)*(deletearraySumPCurrent(arrayP)/100)-1)).toFixed(2)
    document.getElementById('totalM').innerHTML=deleteMatOzidanie;
}

//Удаление суммы при клике
function deleteItem(products){
    products.remove()
    minusCount()
    deletearraySumCurrent(array)
    deletearraySumKCurrent(arrayK)
    deletearraySumPCurrent(arrayP)
    deleteMatOzidanie(array)
    }

//Условие удаления
summa.addEventListener('click',(event)=>{
    if (event.target.classList.contains('pi1')){
        deleteItem(event.target.closest('.pi1'));
    } else if(event.target.classList.contains('pi')){
        deleteItem(event.target.closest('.pi'));
    }
})

//Создает html элементы, сумму ставки и количество ставок
function html(){
    if(rezult()!==undefined) {
        if(rezult()>=100&&p.value>=0.67){
            summa.insertAdjacentHTML('beforeend', `<h3 class="pi1">${rezult()} руб</h3>`)
            }else{
            summa.insertAdjacentHTML('beforeend', `<h3 class="pi">${rezult()} руб</h3>`)
        }
        count++;
        document.getElementById("totalPI").innerHTML =count;
    }
}

//Обрабатывет нажатие кнопки
buttom.addEventListener('click',(event)=>{
    event.preventDefault();
    html();
    if(rezult()!==undefined) {
        //Вычисляем среднюю сумму ставки
        let arraySumCurrent = arraySum().reduce((sum, current) => (sum + current), 0);
        let currentSum=+(arraySumCurrent / array.length).toFixed(2)
        document.getElementById('totalSum').innerHTML=currentSum;
        //Общая сумма ставки
        document.getElementById('totalO').innerHTML=arraySumCurrent;
        //Вычисляем среднюю вероятность прохода ставок
        let arraySumPCurrent = arraySumP().reduce((sum, current) => sum + current, 0);
        let currentP=+((arraySumPCurrent * 100) / arrayP.length).toFixed(2)
        document.getElementById('totalP').innerHTML=currentP;
        //Вычисляем средний коэффициент ставки
        let arraySumKCurrent = arraySumK().reduce((sum, current) => sum + current, 0);
        let currentK=+(arraySumKCurrent / arrayK.length).toFixed(2)
        document.getElementById('totalK').innerHTML=currentK;
        //Вычисляем математическое ожидание от прибыли
        let MatOzidanie=+(array.length*currentSum*(currentK*(currentP/100)-1)).toFixed(2)
        document.getElementById('totalM').innerHTML=MatOzidanie;
    }
   })

