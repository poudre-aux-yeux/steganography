var charhex = [
    {c: 'A', o: '101'},
    {c: 'B', o: '102'},
    {c: 'C', o: '103'},
    {c: 'D', o: '104'},
    {c: 'E', o: '105'},
    {c: 'F', o: '106'},
    {c: 'G', o: '107'},
    {c: 'H', o: '108'},
    {c: 'I', o: '109'},
    {c: 'J', o: '110'},
    {c: 'K', o: '111'},
    {c: 'L', o: '112'},
    {c: 'M', o: '113'},
    {c: 'N', o: '114'},
    {c: 'O', o: '115'},
    {c: 'P', o: '116'},
    {c: 'Q', o: '117'},
    {c: 'R', o: '118'},
    {c: 'S', o: '119'},
    {c: 'T', o: '120'},
    {c: 'U', o: '121'},
    {c: 'V', o: '122'},
    {c: 'W', o: '123'},
    {c: 'X', o: '124'},
    {c: 'Y', o: '125'},
    {c: 'Z', o: '126'},
    {c: ' ', o: '127'},
    {c: 'STX', o: '128'},
    {c: 'ETX', o: '129'}
];

window.onload = function(){
    var img = new Image();
    img.src = './assets/test.png';
    img.onload = function() {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        img.style.display = 'none';
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        var putMessage = function(){
            var message = document.getElementsByName('texte')[0].value;
            for (var i = 0; i < message.length; i += 1) {
                data[(i*4)] = (data[(i*4)] - (data[(i*4)]%10)) + parseInt(charhex.filter(a => a.c === message[i])[0].o[0])// rouge
                data[(i*4) + 1] = (data[(i*4) + 1] - (data[(i*4) + 1]%10)) + parseInt(charhex.filter(a => a.c === message[i])[0].o[1]); // vert
                data[(i*4) + 2] = (data[(i*4) + 2] - (data[(i*4) + 2]%10)) + parseInt(charhex.filter(a => a.c === message[i])[0].o[2]); // bleu
            }
            ctx.putImageData(imageData, 0, 0);
        };
        var readMessage = function(){
            var message = [];
            for (var i = 0; i < data.length; i += 4) {
                message.push('' + data[i]%10 + data[i+1]%10 + data[i+2]%10);
            }
            var smessage = '';
            for (var i = 0; i < message.length; i++){
                if(charhex.filter(a => a.o === message[i]).length > 0){
                    smessage += charhex.filter(a => a.o === message[i])[0].c;
                }
            }
            document.getElementsByName('texte')[0].value = smessage
        };
        var btnniveaudegris = document.getElementById('convert');
        btnniveaudegris.addEventListener('click', putMessage);
        var btnread = document.getElementById('read');
        btnread.addEventListener('click', readMessage);
    };
};