import { useContext, useState, useRef } from 'react'
import { AppContext } from '../../App'

// import voice from '../img/voice.png'
// import delete from '../img/delete.png'

function Home() {
    const {words, setWords, wordsLastId, setWordsLastId} = useContext(AppContext)


    const formFieldWord = useRef()
	const formFieldTranslation = useRef()

    const [inputValue1, setInputValue1] = useState({
        // word
    });
    
    const [inputValue2, setInputValue2] = useState({
        // translation
    });
            
    const handleInputChange1 = (e) => {
        setInputValue1({[e.target.name]: e.target.value})
    }
    const handleInputChange2 = (e) => {
        setInputValue2({[e.target.name]: e.target.value})
}

    const wordAdd = async () => {
        let word = formFieldWord.current.value
        let translation = formFieldTranslation.current.value

        if (!word && !translation) return

        if ((word.length > 0 && !translation) || (!word && translation.length > 0)) {
            let source = 'ru'
            let target = 'en'
            let value = word || translation

            if (!word) {
                source = 'en'
                target = 'ru'
            }

            const wordTranslate = await fetch(`https://tmp.myitschool.org/API/translate/?source=${source}&target=${target}&word=${value}`)
            .then(responce => responce.json())
            .then(result => result)

            if (!word) {
                word = wordTranslate.translate
                translation = wordTranslate.word
            } else {
                word = wordTranslate.word
                translation = wordTranslate.translate
            }
        }

        let newId = wordsLastId
        newId++

        // const newWord = {                 //не смогла понять, почему не забирается value
        //     id : newId,
        //     word: word,
        //     translation: translation,
        // };

        const newWord = {    // мое решение
            id : newId,
            word: word,
            translation: translation,
        };
        const wordsTmp = words
        wordsTmp.push(newWord)
        setWordsLastId(newId)
        setWords([...wordsTmp]);

    }
    const remove = (id) => {
        const wordsTmp = words.filter((item) => item.id != id)
        
        setWords([...wordsTmp]);
        localStorage.setItem('word', JSON.stringify(wordsTmp));
    }

    const listen = (value) => {
        let speech = new SpeechSynthesisUtterance(value)
        speech.lang = "en-EN"
        // speech.lang = "ru-RU"
        speech.voice = speechSynthesis.getVoices()[20]
        speechSynthesis.speak(speech)
    }

    const voice = (input) => {
        let rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
        rec.lang = 'ru-RU'
        rec.start()

        rec.onresult = (event) => {
            input.value = event.results[0][0].transcript
        }
    }

    let wordList = words.map(function(item){
        return  ( 
        <tr className="word__item" key={item.id}>
            <td className="word__ru">{item.word}</td>
            <td className="word__in">{item.translation}</td>
            <td className="word__btns">
                {/* <button className="voice"><img src={voice} alt="voice"/></button> */}
                <button className="voice" onClick={() => { listen(item.translation) }}><img src="src/components/img/voice.png" alt="voice"/></button>
                <button className="delete" onClick={()=> remove(item.id)}><img src="src/components/img/delete.png" alt="delete"/></button>
            </td>
        </tr>)
    })


    return (
      <div className="home">
        <div className="container">
            <h2 className="title">Add new <span>Word</span></h2>
            <div className="formAddWord">
                <input type="text" name='word' placeholder="Word" ref={formFieldWord} onDoubleClick={(event) => { voice(event.target) }} />
                <input type="text" name='translation' placeholder="Translation" ref={formFieldTranslation} />
                
                {/* <input type="text" name='word' placeholder="Word" onChange={handleInputChange1}  />
                <input type="text" name='translation' placeholder="Translation" onChange={handleInputChange2}/> */}

                <button className="btnAdd" onClick={wordAdd}>+</button>
            </div>

            <div className="words">
                <table className="words__list">
                    <thead> 
                        <tr >
                            <th className="word__ru_title">Word</th>
                            <th className="word__in_title">Translation</th>
                            <th className="btns"></th>
                        </tr>
                         {wordList}
                    </thead>    
                </table>
            </div>
        </div>
      </div>
    )
    









  }
  
  export default Home
  