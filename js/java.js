document.getElementById("icon-menu").addEventListener("click", mostrar_menu);

function mostrar_menu(){

    document.getElementById("move-content").classList.toggle('move-container-all');
    document.getElementById("lateral").classList.toggle('lateral');
}

/*-----------------Boton------------------------*/

document.getElementById("boton-up").addEventListener("click", scrollUp);

function scrollUp() {

    var desplazamiento

    desplazamiento=document.documentElement.scrollTop;

    if(desplazamiento>0){
        window.requestAnimationFrame(scrollUp);
        window.scrollTo(0, desplazamiento-(desplazamiento/15));
    }

    
}

botonup=document.getElementById("boton-up");

window.onscroll=function(){

    var scroll

    scroll=document.documentElement.scrollTop;

    if(scroll>1300){
      botonup.style.transform="scale(1)"
    }else if(scroll<1300){
        botonup.style.transform="scale(0)"
    }
}







/*--------------------Buscador---------------------*/ 

document.getElementById("icon-search").addEventListener("click", mostrar_buscador);
document.getElementById("cover-ctn-search").addEventListener("click", ocultar_buscador);

//Declarando variables
bars_search=document.getElementById("ctn-bars-search");
cover_ctn_search=document.getElementById("cover-ctn-search");
inputSearch=document.getElementById("inputSearch");
box_search=document.getElementById("box-search");


//Funcion para mostrar el buscador
function mostrar_buscador(){

    bars_search.style.top="80px";
    cover_ctn_search.style.display="block";
    inputSearch.focus();

}

//Funcion para ocultar el buscador
function ocultar_buscador(){

    bars_search.style.top="-10px";
    cover_ctn_search.style.display="none";
    inputSearch.value="";
    box_search.style.display = "none";

}


document.getElementById("inputSearch").addEventListener("keyup", buscador_interno);

function buscador_interno(){

    filter=inputSearch.value.toUpperCase();
    li=box_search.getElementsByTagName("li");

    //Recorriendo elementos a filtrar medinate los "li"
    for(i=0; i<li.length; i++){
        a=li[i].getElementsByTagName("a")[0];
        textValue=a.textContent || a.innerText;

        if(textValue.toUpperCase().indexOf(filter) > -1){
            li[i].style.display = "";
            box_search.style.display = "block";

            if (inputSearch.value === ""){
                box_search.style.display = "none";
            }
        }else{
            li[i].style.display = "none";
        }
    }

}
