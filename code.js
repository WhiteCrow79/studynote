var s = 'abcabcabcabcdededededede';
function solution(s) {

    var strLen = s.length;
    var answer = 0;

    //글자수
    //for(var i=0; i<strLen; i++) {
        
        
        //배열담기
        answer = strLen;
        for(var j=1; j<=strLen; j++) {
            var substringNum = 0;
            var arrayStr = [];
            for(var k=0; k<Math.ceil(strLen/j); k++) {
                arrayStr.push(s.substr(substringNum, j).trim()); 
                substringNum = substringNum+j;
            }
            var str = "";
            var cnt = 1;
            for(var i=0; i < arrayStr.length; i++) {
                
                if(arrayStr[i] === arrayStr[i+1]) {
                    cnt++;
                } else {
                    str += cnt > 1 ? cnt+arrayStr[i] : arrayStr[i];
                    cnt = 1;
                }
            }
            
            var len = str.length;
            console.log(str, '::::', len);
            if(answer > len) {
                answer = len;
            }
        }
    //}

    
    return answer;
}
console.log(s+' >>>>', solution(s));