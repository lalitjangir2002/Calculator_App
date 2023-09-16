import React from 'react';
import * as math from 'mathjs';
import { useEffect, useState } from 'react';
import {HiMiniCodeBracket} from 'react-icons/hi2';
import {MdModeNight} from 'react-icons/md';
import {BiSolidSun} from 'react-icons/bi';
import {RxCross2} from 'react-icons/rx';
import './App.css';

const App = () => {
  const [input,setInput] = useState("");
  const [history,setHistory] = useState([]);
  const [selectedHistory,setSelectedHistory] = useState(null);
  const [historyModel,setHistoryModel] = useState(false);
  const [theme,setTheme] = useState(getInitiaTheme);
  
  
  useEffect((theme)=>{
    localStorage.setItem("theme",theme);
  },[theme])
  
  function getInitiaTheme(){
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  }

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleButtonClick = (value) => {
    setSelectedHistory(null);
    setInput((prevInput) => prevInput + value);
  }

  const clearHandler = ()=>{
    setSelectedHistory(null);
    setInput("");
  }
  
  const calculateHandler = () =>{
    try{
      const result = math.evaluate(input);
      setHistory([...history,{input,result}]);
      setInput(result.toString());
      setSelectedHistory(null);
    }catch(error){
      setInput("Error");
    }
  };

  const handleBackSpace = () =>{
    setSelectedHistory(null);
    setInput((prevInput) => prevInput.slice(0,-1));
  }
  
  const handleHistory = (item) => {
    setInput(item.input);
    setSelectedHistory(item);
  };

  return (
    <div className="container">
    <div className={`calculator ${theme}`}>
    <div className="heading">
        <p>Calculator</p>
        <div className="thm_btn">
              <button className="theme_toggle" onClick={handleThemeToggle}>
              {theme === "light" ? (
                <MdModeNight className="night_btn" />
              ) : (
                <BiSolidSun className="light_btn" />
              )}
              </button>
        </div>
    </div>
    <div className="display">{input}</div>
    <div className="buttons">
        <button className="clear" onClick={clearHandler}>AC</button>
        <button className="backspace" onClick={handleBackSpace}>←</button>
        <button onClick={()=> handleButtonClick('%')}>%</button>
        <button className="operator_btn" onClick={() => handleButtonClick('+')}>+</button>

  <button onClick={() => handleButtonClick('1')}>1</button>
  <button onClick={() => handleButtonClick('2')}>2</button>
  <button onClick={() => handleButtonClick('3')}>3</button>
  <button className="operator_btn" onClick={() => handleButtonClick('-')}>-</button>
  <button onClick={() => handleButtonClick('4')}>4</button>
  <button onClick={() => handleButtonClick('5')}>5</button>
  <button onClick={() => handleButtonClick('6')}>6</button>
  <button className="operator_btn" onClick={() => handleButtonClick('*')}>x</button>
  <button onClick={() => handleButtonClick('7')}>7</button>
  <button onClick={() => handleButtonClick('8')}>8</button>
  <button onClick={() => handleButtonClick('9')}>9</button>
  <button className="operator_btn" onClick={() => handleButtonClick('/')}>/</button>
  <button onClick={()=>setHistoryModel(true)}><HiMiniCodeBracket /></button>
  <button onClick={() => handleButtonClick('0')}>0</button>
  <button onClick={() => handleButtonClick('.')}>.</button>
  <button className="operator_btn equal" onClick={calculateHandler}>=</button>
    </div>
     {/* History */}
    <div className={`${historyModel ? "history" : "hide"}`}>
    <h2>History</h2>
    {history.map((item, index) => (
            <p 
            key={index}
            onClick={() => {
              handleHistory(item);
              setHistoryModel(false);
            }}
            className={
              selectedHistory === item ? 'selected history-item' : 'history-item'
            }
            >
              {item.input} = {item.result}
            </p>
    ))}
  <div className="close">
    <RxCross2 onClick={()=>setHistoryModel(false)}/>
    </div>
    </div>
    </div>
</div>
  );
}

export default App;
