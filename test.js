const TwitterKoreanProcessor = require('node-twitter-korean-text');

// Normalize
TwitterKoreanProcessor.normalize('힘들겟씀다 그래욬ㅋㅋㅋ').then((result) => {
    // '힘들겠습니다 그래요ㅋㅋ'
});


// Tokenize
// tokensToJsonArray(tokens, keepSpace = false)

TwitterKoreanProcessor.tokenize('착한강아지상을 받은 루루').then((tokens) => {
    TwitterKoreanProcessor.tokensToJsonArray(tokens, true).then((result) => {
        // [
        //     { 'text': '착한', 'koreanPos': 'Adjective', 'offset': 0, 'length': 2, 'isUnknown': false },
        //     { 'text': '강아지', 'koreanPos': 'Noun', 'offset': 2, 'length': 3, 'isUnknown': false },
        //     { 'text': '상', 'koreanPos': 'Suffix', 'offset': 5, 'length': 1, 'isUnknown': false },
        //     { 'text': '을', 'koreanPos': 'Josa', 'offset': 6, 'length': 1, 'isUnknown': false },
        //     { 'text': ' ', 'koreanPos': 'Space', 'offset': 7, 'length': 1, 'isUnknown': false },
        //     { 'text': '받은', 'koreanPos': 'Verb', 'offset': 8, 'length': 2, 'isUnknown': false },
        //     { 'text': ' ', 'koreanPos': 'Space', 'offset': 10, 'length': 1, 'isUnknown': false },
        //     { 'text': '루루', 'koreanPos': 'Noun', 'offset': 11, 'length': 2, 'isUnknown': false }
        // ]
    });

    TwitterKoreanProcessor.tokensToJsonArray(tokens, false).then((result) => {
        // [
        //     { 'text': '착한', 'koreanPos': 'Adjective', 'offset': 0, 'length': 2, 'isUnknown': false },
        //     { 'text': '강아지', 'koreanPos': 'Noun', 'offset': 2, 'length': 3, 'isUnknown': false },
        //     { 'text': '상', 'koreanPos': 'Suffix', 'offset': 5, 'length': 1, 'isUnknown': false },
        //     { 'text': '을', 'koreanPos': 'Josa', 'offset': 6, 'length': 1, 'isUnknown': false },
        //     { 'text': '받은', 'koreanPos': 'Verb', 'offset': 8, 'length': 2, 'isUnknown': false },
        //     { 'text': '루루', 'koreanPos': 'Noun', 'offset': 11, 'length': 2, 'isUnknown': false }
        // ]
    });
});


// Stemming
TwitterKoreanProcessor.tokenize('게으른 아침이 밝았구나')
    .then((tokens) => TwitterKoreanProcessor.stem(tokens))
    .then((stemmed) => TwitterKoreanProcessor.tokensToJsonArray(stemmed))
    .then((result) => {
        // [
        //     { 'text': '게으르다', 'koreanPos': 'Adjective', 'offset': 0, 'length': 3, 'isUnknown': false },
        //     { 'text': '아침', 'koreanPos': 'Noun', 'offset': 4, 'length': 2, 'isUnknown': false },
        //     { 'text': '이', 'koreanPos': 'Josa', 'offset': 6, 'length': 1, 'isUnknown': false },
        //     { 'text': '밝다', 'koreanPos': 'Verb', 'offset': 8, 'length': 4, 'isUnknown': false }
        // ]
    });


// Add to dictionary
TwitterKoreanProcessor.tokenize('우햐나어가녀아뎌')
    .then((tokens) => TwitterKoreanProcessor.tokensToJsonArray(tokens, false))
    .then((result) => {
        // [
        //     { 'text': '우햐나어가녀아뎌', 'koreanPos': 'ProperNoun', 'offset': 0, 'length': 8, 'isUnknown': true }
        // ]
    });

TwitterKoreanProcessor.addNounsToDictionary('우햐나', '어가녀', '아뎌')
TwitterKoreanProcessor.tokenize('우햐나어가녀아뎌')
    .then((tokens) => TwitterKoreanProcessor.tokensToJsonArray(tokens, false))
    .then((result) => {
        // [
        //     { 'text': '우햐나', 'koreanPos': 'Noun', 'offset': 0, 'length': 3, 'isUnknown': false },
        //     { 'text': '어가녀', 'koreanPos': 'Noun', 'offset': 3, 'length': 3, 'isUnknown': false },
        //     { 'text': '아뎌', 'koreanPos': 'Noun', 'offset': 6, 'length': 2, 'isUnknown': false }
        // ]
    });



// Phrase extraction
// extractPhrases(tokens, filterSpam = true, includeHashtags = true)
    
TwitterKoreanProcessor.tokenize('아름다운 트위터를 만들어 보자. 시발 #욕하지_말자').then((tokens) => { 
    TwitterKoreanProcessor.extractPhrases(tokens, true, true).then((result) => {
        // [
        //     { 'text': '아름다운 트위터', 'koreanPos': 'Noun', 'offset': 0, 'length': 8 },
        //     { 'text': '트위터', 'koreanPos': 'Noun', 'offset': 5, 'length': 3 },
        //     { 'text': '#욕하지_말자', 'koreanPos': 'Hashtag', 'offset': 21, 'length': 7 }
        // ]
    });
    TwitterKoreanProcessor.extractPhrases(tokens, true, false).then((result) => {
        // [
        //     { 'text': '아름다운 트위터', 'koreanPos': 'Noun', 'offset': 0, 'length': 8 },
        //     { 'text': '트위터', 'koreanPos': 'Noun', 'offset': 5, 'length': 3 }
        // ]
    });
    TwitterKoreanProcessor.extractPhrases(tokens, false, true).then((result) => {
        // [
        //     { 'text': '아름다운 트위터', 'koreanPos': 'Noun', 'offset': 0, 'length': 8 },
        //     { 'text': '시발', 'koreanPos': 'Noun', 'offset': 18, 'length': 2 },
        //     { 'text': '트위터', 'koreanPos': 'Noun', 'offset': 5, 'length': 3 },
        //     { 'text': '#욕하지_말자', 'koreanPos': 'Hashtag', 'offset': 21, 'length': 7 }
        // ]
    });
    TwitterKoreanProcessor.extractPhrases(tokens, false, false).then((result) => {
        // [
        //     { 'text': '아름다운 트위터', 'koreanPos': 'Noun', 'offset': 0, 'length': 8 },
        //     { 'text': '시발', 'koreanPos': 'Noun', 'offset': 18, 'length': 2 },
        //     { 'text': '트위터', 'koreanPos': 'Noun', 'offset': 5, 'length': 3 }
        // ]
    });
});


// Splitting Sentence
TwitterKoreanProcessor.splitSentences('가을이다! 남자는 가을을 탄다...... 그렇지? 루루야! 버버리코트 사러 가자!!!!')
    .then((result) => {
        // [
        //     { 'text': '가을이다!', 'start': 0, 'end': 5 },
        //     { 'text': '남자는 가을을 탄다......', 'start': 6, 'end': 22 },
        //     { 'text': '그렇지?', 'start': 23, 'end': 27 },
        //     { 'text': '루루야!', 'start': 28, 'end': 32 },
        //     { 'text': '버버리코트 사러 가자!!!!', 'start': 33, 'end': 48 }
        // ]
    });

// Detokenize
TwitterKoreanProcessor.detokenize(['늘', '평온', '하게', '누워', '있', '는', '루루']).then((result) => {
    // '늘 평온하게 누워있는 루루'
});

