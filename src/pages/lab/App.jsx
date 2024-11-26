import React, { useState, useEffect } from "react";
import styles from "@/styles/lab.module.css";


const App = () => {
  const RowNum = 2; // 行数
  const oneRowNum = 10;  // 1行に表示するセルの数
  const cellNum = RowNum * oneRowNum; // セルの総数
  const [position, setPosition] = useState(1); // 丸の位置を管理する
  const Cell = ({celNum}) => {
    return (
      <div className={styles.cell} id={celNum}>
        {position === celNum && <div className={styles.circle} />}
      </div>
    )
  }
  const [dice, setDice] = useState(0); // サイコロの目を管理する
  const [diceState, setDiceState] = useState(false); // サイコロが振られたかどうかを管理する
  const rollDice = () => {
    if (diceState) return; // サイコロが振られたら何もしない
    let newDice = Math.floor(Math.random() * 6) + 1;
    setDice(newDice); // サイコロの目をランダムに設定する
    setDiceState(true); // 丸の位置を更新する
  };
  const move = () => {
    setPosition((prev) => (prev + dice) > cellNum ? (prev + dice) - cellNum : prev + dice); // 範囲チェック
    setDiceState(false);
  };
  const reset = () => {
    setPosition(1);
    setDice(0);
    setDiceState(false);
  };
  const cellList = [];
  for (let row = 1; row <= RowNum; row++) {
    if (row % 2 == 1) {
      for (let cell = 1; cell <= oneRowNum; cell++) {
        cellList.push(<Cell key={cell + (row - 1) * oneRowNum} celNum={cell + (row - 1) * oneRowNum} />);
      }
    } else {
      for (let cell = oneRowNum; cell >= 1; cell--) {
        cellList.push(<Cell key={cell + (row - 1) * oneRowNum} celNum={cell + (row - 1) * oneRowNum} />);
      }
    }
  };
    
  return (
    <>
      <div className={styles.container}>
        {cellList}
      </div>
      <button onClick={rollDice} className={styles.runButton}>サイコロを振る</button>
      <span className={styles.dice}>{dice}</span>
      {diceState == true && <button onClick={move}>移動する</button>}
      <p><button onClick={reset}>リセット</button></p>
    </>
  );
}
export default App;
