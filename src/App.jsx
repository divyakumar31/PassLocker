import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "./components/navbar/Navbar";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [isStandard, setIsStandard] = useState(false);
  const [password, setPassword] = useState("");
  // reference for copy password
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    let numberChars = "0123456789";
    let specialChars = "!@#$%^&*()";
    let charSet = upperCaseChars + lowerCaseChars;
    let pass = "";

    if (isStandard) {
      let allChars = charSet + numberChars + specialChars;
      pass += getRandomChar(upperCaseChars);
      pass += getRandomChar(lowerCaseChars);
      pass += getRandomChar(numberChars);
      pass += getRandomChar(specialChars);

      for (let i = 4; i < length; i++) {
        pass += getRandomChar(allChars);
      }
      // Shuffle the password to ensure randomness
      pass = pass
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");

      setPassword(pass);
    } else {
      if (numberAllowed) charSet += numberChars;
      if (charAllowed) charSet += specialChars;

      for (let i = 0; i < length; i++) {
        pass += getRandomChar(charSet);
      }
      setPassword(pass);
    }
  }, [length, numberAllowed, charAllowed, isStandard, setPassword]);

  function getRandomChar(charSet) {
    return charSet.charAt(Math.floor(Math.random() * charSet.length));
  }

  // To copy the password and select the password area
  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed, isStandard]);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center w-screen h-screen p-2">
        <div className="container w-96 mx-auto border border-blue-400 rounded-lg p-2 sm:p-4 flex flex-col gap-2">
          <h1 className="text-center text-3xl font-bold mb-2">Password Generator</h1>
          <div className="w-full relative">
            <input
              type="text"
              value={password}
              className="w-full border border-blue-400 rounded-md outline-blue-500 p-2.5 bg-white"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyToClipboard}
              className="w-3/12 bg-blue-600 border border-blue-400 text-white p-2.5 rounded-md absolute right-0 top-0 hover:bg-blue-700"
            >
              Copy
            </button>
          </div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center w-full gap-2 py-2 text-lg">
            <input
              type="range"
              min={isStandard ? 8 : 6}
              max="60"
              value={length}
              className="w-full sm:w-8/12 cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="w-full sm:w-3/12">
              Length:
              <span className="text-blue-500 font-semibold pl-2">{length}</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 items-center w-full gap-2 sm:py-2 text-lg">
            <div>
              <input
                type="checkbox"
                onChange={() => {
                  setNumberAllowed((numberAllowed) => !numberAllowed);
                }}
                disabled={isStandard}
                className="cursor-pointer h-4 w-4"
                id="number"
              />
              <label htmlFor="number" className="ml-2">Number</label>
            </div>

            <div>
              <input
                type="checkbox"
                onChange={() => {
                  setCharAllowed((charAllowed) => !charAllowed);
                }}
                disabled={isStandard}
                className="cursor-pointer h-4 w-4"
                id="special-chars"
              />
              <label htmlFor="special-chars" className="ml-2">Special Characters</label>
            </div>
          </div>

          <div className="flex items-baseline w-full text-lg">
            <input
              type="checkbox"
              onChange={() => {
                setIsStandard((isStandard) => !isStandard);
                setLength((length) => (length < 8 ? 8 : length));
              }}
              className="cursor-pointer h-4 w-4"
              id="standard-pass"
            />
            <label htmlFor="standard-pass" className="ml-2 flex flex-col">
              Standard Password
              <span className="text-gray-600 text-xs">
                <li>1 uppercase letter</li>
                <li>1 lowercase letter</li>
                <li>1 number</li>
                <li>1 special character</li>
                <li>Minimum 8 characters</li>
              </span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
