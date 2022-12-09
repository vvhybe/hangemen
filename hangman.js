const displayWord = document.getElementById("word");

// var b = "banana".split("");
// var hb = "__n_n_".split("");

fetch("json/words.json").then(res=> res.json()).then(data => {
    const words = data.words.filter(word => word.length > 2);
    // let word = "banana"; // test for banana
    let word = words[Math.floor(Math.random() * words.length)];
    let hiddenWord = hangWord(word);
    let bhiddenWord = bestHangWord(word);
    renderWord(hiddenWord.join(""));
    console.log(word)
    console.log({hiddenWord, bhiddenWord})
    document.onkeypress = e =>{
        if(word.includes(e.key)){
            // not gonna work
            // hb = hb.replaceAll("_", e.key)

            // but this will work for all occurences
            indexesOf(word, e.key).forEach(oci=>{
                hiddenWord[oci] = e.key;
                renderWord(hiddenWord.join(""));
            })
        }
        console.log({b, hb});
    }
})


function indexesOf(str, sl){
    let idxes = [];
    str.split("").forEach((l, i)=>{
        l == sl ? idxes.push(i) : null;
    })
    return idxes;
}

function hangWord(word){
    let hiddenWord = word.split("");

    let rli1 = Math.floor(Math.random() * word.length);
    let rli2 = Math.floor(Math.random() * word.length);
    let rli3 = Math.floor(Math.random() * word.length);
    let rli4 = Math.floor(Math.random() * word.length);
    while(rli1 == rli2 && rli1 == rli3 && rli2 == rli4){
        rli2 = Math.floor(Math.random() * word.length);
        rli3 = Math.floor(Math.random() * word.length);
        rli4 = Math.floor(Math.random() * word.length);
    }
    if(word.length == 3){
        hiddenWord[rli2] = "_";
    }else if(word.length == 4){
        hiddenWord[rli1] = "_";
        hiddenWord[rli2] = "_";
    }else if (word.length > 4 && word.length <= 6) {
        hiddenWord[rli1] = "_";
        hiddenWord[rli2] = "_";
        hiddenWord[rli3] = "_";
    }else if (word.length > 6) {
        hiddenWord[rli1] = "_";
        hiddenWord[rli2] = "_";
        hiddenWord[rli3] = "_";
        hiddenWord[rli4] = "_";
    }

    console.log([rli1, rli2, rli3, rli4])
    return hiddenWord;
}

function renderWord(word){
    displayWord.innerHTML = "";
    word.split("").forEach(l => {
        const span = document.createElement("span");
        span.textContent = l;
        displayWord.appendChild(span);
    });
}

// 123456; 135
// 1234; 13
// 123; 13

function bestHangWord(word){
    let hiddenWord = word.split("");
    for (let i = 0; i < word.length; i++) {
        i % 2 != 0 ? hiddenWord[i] = "_" : null;
    }
    return hiddenWord;
}