import styles from "./Keyboard.module.css";

const keys = [
  "й",
  "ц",
  "у",
  "к",
  "е",
  "н",
  "г",
  "ш",
  "щ",
  "з",
  "х",
  "ї",
  "ф",
  "і",
  "в",
  "а",
  "п",
  "р",
  "о",
  "л",
  "д",
  "ж",
  "є",
  "я",
  "ч",
  "с",
  "м",
  "и",
  "т",
  "ь",
  "б",
  "ю",
  "'",
];

type KeyboardProps = {
  disabled?: boolean;
  activeLetters: string[];
  incorrectLetters: string[];
  addGuessedLetter: (letter: string) => void;
};

function Keyboard({
  disabled = false,
  activeLetters,
  incorrectLetters,
  addGuessedLetter,
}: KeyboardProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(65px, 1fr))",
        gap: ".5rem",
      }}
    >
      {keys.map((key) => {
        const isActive = activeLetters.includes(key);
        const isInactive = incorrectLetters.includes(key);
        return (
          <button
            className={`${styles.btn} ${isActive && styles.active} ${
              isInactive && styles.inactive
            }`}
            onClick={() => addGuessedLetter(key)}
            key={key}
            disabled={isActive || isInactive || disabled}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
}

export default Keyboard;
