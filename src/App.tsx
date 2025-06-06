import './App.scss';
import { useState } from "react";
// import { useDebounce } from './useDebounce';
import { HP, PlaceholderHP } from './HP';
import { defaultInputsState, inputsInfo } from './inputs';

const isValidNumber = (value:string) => /^-?\d*\.?\d*$/.test(value) && value !== "-" && value !== ".";
const welcomeMessage = 'Welcome to Boneshatter HP Simulator! This UI simulates your HP movement while continuously attacking with Boneshatter at max trauma stacks.';

export default function App() {
  const [userInputs, setUserInputs] = useState(defaultInputsState);
  const [liveInputs, setLiveInputs] = useState(defaultInputsState);
  const [hasOverleech, setHasOverleech] = useState(false);
  const [recoupOver, setRecoupOver] = useState(4);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [logs, setLogs] = useState<string[]>([welcomeMessage]);
  // const [isLoading, setIsLoading] = useState(false);
  
  const isError = !Object.values(userInputs).every(isValidNumber)

  // const generateLogs = () => {
  //   setIsLoading(false);
  // };

  // // Trigger db() 1s after a valid update to any field
  // useDebounce(
  //   () => {
  //     if (!isError) {
  //       // const parsed = Object.fromEntries(
  //       //   Object.entries(inputs).map(([key, val]) => [key, parseFloat(val)])
  //       // );
  //       generateLogs();
  //     }
  //   },
  //   1000,
  //   [userInputs, hasOverleech, recoupOver]
  // );

  const handleInputChange = (key: string, value: string) => {
    // setIsLoading(true);
    setUserInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleClickSimulate = () => {
    setLogs(shouldAnimate ? [welcomeMessage] : ['Running simulation...']);
    if (!isError) {
      setLiveInputs({ ...userInputs });
      setShouldAnimate(prev => !prev);
    }
  };

  const overleechButtons = (
    <div className='control_panel_input_container'>
      <label>Has Overleech:</label>
      <div>
        <label>
          <input
            type="radio"
            name="overleech"
            value="true"
            disabled={shouldAnimate}
            checked={hasOverleech}
            onChange={() => setHasOverleech(true)}
          />
          Yes
        </label>

        <label style={{ marginLeft: "1rem" }}>
          <input
            type="radio"
            name="overleech"
            value="false"
            disabled={shouldAnimate}
            checked={!hasOverleech}
            onChange={() => setHasOverleech(false)}
          />
          No
        </label>
      </div>
    </div>
  );

  const recoupButtons = (
    <div className='control_panel_input_container'>
      <label>Recoup Over:</label>
      <div>
        <label>
          <input
            type="radio"
            name="recoup"
            value="true"
            disabled={shouldAnimate}
            checked={recoupOver === 3}
            onChange={() => setRecoupOver(3)}
          />
          3s
        </label>

        <label style={{ marginLeft: "1rem" }}>
          <input
            type="radio"
            name="recoup"
            value="false"
            disabled={shouldAnimate}
            checked={recoupOver === 4}
            onChange={() => setRecoupOver(4)}
          />
          4s
        </label>
      </div>
    </div>
  );

  return (
    <div className='app'>
      <div className='top_nav'>
        <a href="https://github.com/smokie777/boneshatter-hp-simulator/blob/main/public/help.png" target="_blank">
          <img className='help_icon' src="./help_icon.png" alt="icon" />
        </a>
        <a href="https://github.com/smokie777/boneshatter-hp-simulator" target="_blank">
          <img className='github_icon' src="./github_icon.png" alt="icon" />
        </a>
      </div>

      <h1 className='title'>
        Boneshatter HP Simulator
        <img
          src="./boneshatter.png"
          alt="icon"
        />
      </h1>

      <div className='content'>
        <div className='control_panel'>
          {Object.entries(userInputs).map(([key, value]) => (
            <div className='control_panel_input_container' key={key}>
              <label>{inputsInfo[key].label}:</label>
              <input
                className='control_panel_input'
                value={value}
                placeholder={inputsInfo[key].placeholder}
                disabled={shouldAnimate}
                onChange={(e) => handleInputChange(key, e.target.value)}
                style={{ border: `2px solid ${isValidNumber(value) ? "green" : "red"}` }}
              />
            </div>
          ))}

          {overleechButtons}
          {recoupButtons}

          <button className='control_panel_simulate_button' onClick={() => handleClickSimulate()}>
            {shouldAnimate ? 'Stop' : 'Simulate'}
          </button>
        </div>
        <div className='hp_container'>
          {shouldAnimate ? (
            <HP
              inputs={liveInputs}
              hasOverleech={hasOverleech}
              recoupOver={recoupOver}
              setLogs={setLogs}
            />
          ) : <PlaceholderHP />}
        </div>
      </div>

      <div className='logs'>
        {logs.map((log, index) => (
          <div key={index} className='log'>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}
