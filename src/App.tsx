import { useCallback, useEffect, useState } from "react";
import HangMan from "./HangMan";
import HangManWord from "./HangManWord";
import Keyboard from "./Keyboard";
import { get, ref, child } from "firebase/database";
import database from "./firebaseConfig";

function useRandomWord() {
  const [wordArr, setWordArr] = useState<string[]>([]);
  const [word, setWord] = useState<string>("");

  const getWord = (words: string[]) => {
    if (words.length === 0) return "";
    return words[Math.floor(Math.random() * words.length)];
  };

  useEffect(() => {
    const fetchWords = async () => {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, "words")).catch((error) =>
        console.error("Помилка при отриманні слова:", error)
      );

      if (snapshot && snapshot.exists()) {
        setWordArr(snapshot.val());
      } else {
        console.log("Дані відсутні");
      }
    };

    fetchWords();
  }, []);

  useEffect(() => {
    if (wordArr.length > 0) {
      setWord(getWord(wordArr));
    }
  }, [wordArr]);

  return {
    word,
    setNewWord: () => setWord(getWord(wordArr)),
  };
}

function App() {
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [isActive, setActive] = useState<boolean>(false)

  const { word, setNewWord } = useRandomWord();

  const incorrectLetters = guessedLetters.filter(
    (letter) => !word.includes(letter)
  );

  const isWinner = word
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const isLoser = incorrectLetters.length >= 6;

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;
      console.log(letter)
      setGuessedLetters((currentLetter) => [...currentLetter, letter]);
    },
    [guessedLetters, isLoser, isWinner]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[а-щьюяґєії']$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [addGuessedLetter, guessedLetters]);

  console.log(word);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (key !== "Enter") return;

      e.preventDefault();
      setGuessedLetters([]);
      setNewWord();
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [setNewWord]);

  return (
    <div
      style={{
        maxWidth: "870px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
      }}
    >
      <div style={{ fontSize: "2rem", textAlign: "center", fontWeight: 'bold' }}>
        {isLoser && "Гарна спроба! - Оновіть aбо натисніть Enter, щоб спробувати ще раз"}
        {isActive && isWinner && "Переможець! - Оновіть, щоб спробувати ще раз"}
        {!isActive && 'Вітаю у Шибениці! Натисніть Старт для початку'}
      </div>
      <HangMan numberOfGuesses={incorrectLetters.length} isActive={isActive} />
      {
        isActive ? 
        <>
          <HangManWord
            reveal={isLoser}
            guessedLetters={guessedLetters}
            word={word}
          />
          <div style={{ alignSelf: "stretch" }}>
            <Keyboard
              disabled={isWinner || isLoser}
              activeLetters={guessedLetters.filter((letter) =>
                word.includes(letter)
              )}
              incorrectLetters={incorrectLetters}
              addGuessedLetter={addGuessedLetter}
            />
          </div>
        </>
        : <button style={{padding: '2rem', backgroundColor: 'white', fontSize: '2.5rem', fontWeight: 'bold' , border: '3px solid black'}} onClick={() => setActive(true)}>Старт</button>
      }
    </div>
  );
}

export default App;
