//опции настройки
const slideToShow = 4;
const slidesToScroll =2;
const autoScroll = false;
const interval = 2000;
const dotsVisible = true;

const container = document.querySelector('.wrapper');
const track = container.querySelector('.track-window');
const itemsCont = container.querySelector('.items-container');
const items = container.querySelectorAll('.item');
const firstitem = container.querySelector('.item');
const btnPrev = container.querySelector('.prev');
const btnNext = container.querySelector('.next');
const containerDots = container.querySelector('.container_dots');
const dots = container.querySelectorAll('.dot');
let positionDot = 0;
const widthInit = container.clientWidth;
let position = 0;
const itemsCount = items.length;
let slideFirstVisible = 0;
const slideNotShow =  itemsCount-slideToShow;
const itemWidth = widthInit / slideToShow;
const movePosition = itemWidth*slidesToScroll;
let kl=0,kl1=0;

const init = () => {
    positionDot = 0;
    kl1=1;
    if (!dotsVisible){dots.style.display = 'none';}
    if (autoScroll){scroll()}
    items.forEach(item => {
        item.style.minWidth = itemWidth + 'px';
    });
}

const getTime = () => {return new Date().getTime();}
let bgTime=getTime();

function scroll() {
    setInterval(function(){
		let fnTime = getTime();
		if(fnTime - bgTime+10 > interval) {
			bgTime = fnTime; 
			const itemsLeft = itemsCount - (Math.abs(position) + slideToShow * itemWidth) / itemWidth;
			position -= itemsLeft >= slidesToScroll? movePosition : itemsLeft * itemWidth;
			setPosition();
			checkN();
		}},interval)
};

dots.forEach((dot,index)=>{
    dot.addEventListener('click',event=>{
        dots.forEach(el=>{ el.classList.remove('active'); });
        dot.classList.add('active');
        //здесь потом добавить перемещине при нажатии на точку
    })
});

btnNext.addEventListener('click',()=>{
    kl1=0;
    console.log('позиция точки' + positionDot);

    if (positionDot<itemsCount-slidesToScroll) {
        console.log('правда');
        console.log(dots[positionDot]);
        dots[positionDot].classList.remove('active');
        positionDot += slidesToScroll;
        dots[positionDot].classList.add('active');
        console.log(dots[positionDot]);
    }else {
        //вычисление точки перепрыгивания последней фотки
    }
    const itemsLeft = itemsCount - (Math.abs(position) + slideToShow * itemWidth) / itemWidth;
    console.log(itemsLeft);
	position -= itemsLeft >= slidesToScroll? movePosition : itemsLeft * itemWidth;
    setPosition();
    checkN();

});

btnPrev.addEventListener('click',()=>{
    kl=0;
    const itemsLeft = Math.abs(position) / itemWidth;
	position += itemsLeft >= slidesToScroll? movePosition : itemsLeft * itemWidth;
    setPosition();
    checkP();
});

const setPosition = () =>{

    itemsCont.style.transform = 'translateX('+position+'px)';
};

const checkN = () =>{
    
    if (position <= -(itemsCount-slideToShow)*itemWidth) {
        if (kl!=0){
        for (let i=0; i<slidesToScroll;i++) {
        let elm = itemsCont.firstElementChild;
		let em = elm.cloneNode(true); itemsCont.appendChild(em);
		itemsCont.removeChild(elm);}}}
    if (position === -(itemsCount-slideToShow)*itemWidth) {kl++;}
};

const checkP = () => {
    if (position === 0 & kl1!=0){
        for (let i=0; i<slidesToScroll;i++) {
            let elm = itemsCont.lastElementChild;
            let em = elm.cloneNode(true); itemsCont.insertBefore(em,itemsCont.firstElementChild);
            itemsCont.removeChild(elm);}}
    if (position === 0){kl1++;}
};



init();



