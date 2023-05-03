import React, { useState, useEffect } from 'react'
import Board from './Board'
import {calculateWinner} from '../helper'
import styles from './Game.module.css'

const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(true)
    const winner = calculateWinner(board)
    const [xWins, setXWins] = useState(0)
    const [oWins, setOWins] = useState(0)

    useEffect(() => {
        switch(winner) {
            case "X":
                setXWins(c => c + 1);
                return;
            case "O":
                setOWins(c => c + 1);
                return;
            default:
                return;
        }
    }, [winner])

    const handleClick = (index) => {
        const boardCopy = [...board]
        // Определить был ли клик по ячейке или игра закончена
        if (winner || boardCopy[index]) return
        // Определить чей ход Х?0
        boardCopy[index] = xIsNext ? 'X' : 'O'
        // Обновить наш стейт
        setBoard(boardCopy)
        setXIsNext(!xIsNext)
    }

    const handleClearButtonClick = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true)
    }

    const startNewGame = () => {
        return (
            <button className={styles['start__btn']} onClick={handleClearButtonClick}>Очистить поле</button>
        )
    }

    return (
        <div className={styles['wrapper']}>
            { startNewGame() }
            <Board squares={board} click={handleClick}/>
            <p className={styles['game__info']}>
                { winner ? 'Победитель  ' + winner : 'Сейчас ходит  ' + ( xIsNext ? 'X' : 'O' )}
            </p>
            <p className={styles.WinCounter}>X={xWins}</p>
            <p className={styles.WinCounter}>O={oWins}</p>
        </div>
    )
}

export default Game
