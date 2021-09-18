
var palavra;
var len;
var tpo;
var num_img;

function teclar(e) {
    var k = (e.keyCode) ? e.keyCode : (e.which) ? e.which : (e.charCode) ? e.charCode : 0;
    if (k == 13) iniciar();
}

function iniciar() {
    palavra = document.getElementById('palavraSecreta').value;
    len = palavra.length;
    num_img = 0;
    document.getElementById('imagemEnforcado').src = '0.png';
    
    if (len > 0) {
        document.getElementById('resultadoTexto').innerHTML = '';
        
        for(var i = 0; i < len; i++) {
            d = document.getElementById('dadosEscondidos');
			n = document.createElement('div');
			n.id = 'dadoLetra' + i;
			n.innerHTML = 'falso';
			d.appendChild(n);
        }
        
        document.getElementById('divPalavraSecreta').style.display = 'none';
        escreve();
    
        document.getElementById('barraTempo').style.display = '';
        document.getElementById('barraTempo').width = 0;
        tpo = setInterval("recarregar()", 1000);
    } else {
        alert('A palavra secreta precisa ter mais de 3 letras!');
    }
}

function recarregar() {
    var t = document.getElementById('barraTempo').width;
    document.getElementById('barraTexto').innerHTML = t;
    if (document.getElementById('dificuldade').value == '0')
        document.getElementById('barraTempo').width += 1;
    else
        document.getElementById('barraTempo').width += 3;
    if (t > 299) perdeu();
}

function perdeu() {
    alert('Você perdeu! A palavra era "' + palavra + '".');
    limpa();
}

function verifica(l) {
    if (l.length > 0) {
        var e = document.getElementById('letrasErradas');
        var t = e.innerHTML.toString();
        
        document.getElementById('letra').value = '';
        
        for(var i = 0; i < t.length; i++) {
            var c = t.substring(i, i + 1);
            if (l.toUpperCase() == c) {
                alert('Você já digitou essa letra!');
                return;
            }
        }
        compara(l);
    }
}

function compara(l) {
    var errou = true;
    for(var i = 0; i < len; i++) {
        var c = palavra.substring(i, i + 1);
        if (l.toUpperCase() == c.toUpperCase()) {
            document.getElementById('dadoLetra' + i).innerHTML = 'verdadeiro';
            errou = false;
        }
    }
    
    if (errou) {
        var e = document.getElementById('letrasErradas');
        e.innerHTML += l.toUpperCase();
        num_img++;
        if (document.getElementById('dificuldade').value == '1')
            num_img++;
        document.getElementById('imagemEnforcado').src = num_img + '.png';
        
        if (num_img > 21) {
            perdeu();
        }
    }
    
    escreve();
}

function escreve() {
    var count = 0;
    var t = document.getElementById('resultadoTexto');
    t.innerHTML = '';
    
    for(var i = 0; i < len; i++) {
        var r = document.getElementById('dadoLetra' + i).innerHTML;
        if (r == 'verdadeiro') {
            var c = palavra.substring(i, i + 1);
            t.innerHTML += c + ' ';
            count++;
        } else {
            t.innerHTML += '_ ';
        }
    }
    
    if (count == len) {
        alert('Você ganhou!');
        limpa();
    }
}

function limpa() {
    clearInterval(tpo);
    document.getElementById('barraTexto').innerHTML = '';
    document.getElementById('barraTempo').style.display = 'none';
    document.getElementById('divPalavraSecreta').style.display = '';
    document.getElementById('palavraSecreta').value = '';
    document.getElementById('dadosEscondidos').innerHTML = '';
    document.getElementById('letrasErradas').innerHTML = ''
}
