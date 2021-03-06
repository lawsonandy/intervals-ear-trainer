import React, { useState } from "react";
import styled from 'styled-components';
import firebase from "firebase/app";
import IntervalQuestions from '../json/intervalQuestions';
import ChordQuestions from '../json/chordQuestions';
import SeventhChordQuestions from '../json/seventhChordQuestions';
import useSound from 'use-sound';
import intervals from '../audios/intervals.mp3';
import triadChords from '../audios/triadChords.mp3';
import seventhChords from '../audios/seventhChords.mp3';
import playBtn from '../img/play.png';
import majThird from '../img/major-third.png';
import triad from '../img/triad.jpeg';
import seventh from '../img/dominant-seventh-chord.png';

const Description = styled.div`
  margin-top: 3vw;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  border: none;
  width: 30vw;
`

const QuestionCard = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  border: none;
  width: 50vw;
  button {
    margin-bottom: 10px;
    font-weight: 700;
    color: black;
    background: #ffffff;
    border: 2px solid rgba(0,0,0,.7);
    border-radius: 10px;
    padding: 10px;
    transition: .3s;
    &:hover {
      color: #29b3ff;
      border: 2px solid #29b3ff;
      transform: scale(1.1);
    }
  }
`
const QuizChoice = styled.div`
  margin-top: 6vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: end;
  padding-bottom: 10px;
  border: none;
  width: 70vw;
  button {
    border-radius: 5px;
    padding: 5px;
  }
`
const QuizCard = styled.div`
  color: black;
  font-weight: 600;
  background: rgba(255, 255, 255, .6);
  border: 2px solid rgba(0,0,0,.7);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 20vw;
  height: fit-content;
  img {
    max-height: 10vw;
    padding-bottom: 15px;
  }
  button {
    margin-bottom: 10px;
    font-weight: 700;
    color: black;
    background: #ffffff;
    border: 2px solid rgba(0,0,0,.7);
    border-radius: 10px;
    padding: 10px;
    transition: .3s;
    &:hover {
      color: #29b3ff;
      border: 2px solid #29b3ff;
      transform: scale(1.1);
    }
  }
`
const Question = styled.div`
  background: rgba(255, 255, 255, .6);
  border: 2px solid rgba(0,0,0,.7);
  border-radius: 40px;
  margin: auto;
  margin-top: 5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 40vw;
  transition: .3s;
  button {
    margin-top: 1vw;
  }
`
const PlayButton = styled.div`
  border-radius: 50px;
  transition: .3s;
  img {
    max-width: 70px;
    max-height: 70px;
  }
  &:hover {
    background-color: #0080FF;
    cursor: pointer;
  }
`

const Quiz = () => {

  const user = firebase.auth().currentUser;

  const [playInt] = useSound(intervals, {
    sprite: {
      half: [0, 3500],
      whole: [5320, 3500],
      min3rd: [10650, 3500],
      maj3rd: [15900, 3500],
      perf4th: [21320, 3500],
      tri: [26650, 3500],
      perf5th: [31900, 3500],
      aug5th: [37320, 3500],
      maj6th: [42650, 3500],
      min7th: [47900, 3500],
      maj7th: [53320, 3500],
      octave: [58650, 3500]
    }
  });

  const [playChord] = useSound(triadChords, {
    sprite: {
      major1: [0, 4000],
      major2: [4780, 4000],
      major3: [9580, 4000],
      major4: [14380, 4000],
      minor1: [19180, 4000],
      minor2: [23900, 4000],
      minor3: [28780, 4000],
      minor4: [33580, 4000],
      diminished1: [38380, 4000],
      diminished2: [43190, 4000],
      augmented1: [47900, 4000],
      augmented2: [52780, 4000]
    }
  });

  const [play7thChord] = useSound(seventhChords, {
    sprite: {
      major1: [0, 4000],
      major2: [4780, 4000],
      dominant1: [9580, 4000],
      dominant2: [14380, 4000],
      minor1: [19180, 4000],
      minor2: [23900, 4000],
      minor3: [28780, 4000],
      minor4: [33580, 4000],
      diminished1: [38380, 4000],
      diminished2: [43190, 4000],
      augmented1: [47900, 4000],
      augmented2: [52780, 4000]
    }
  });

  const [quizEdition, setQuizEdition] = useState('');
  const [quizStart, setQuizStart] = useState(false);
  const [quizChoice, setQuizChoice] = useState(false);
  const [initialQuizState, setInitialQuizState] = useState(true);
  const [playerScore, setPlayerScore] = useState(0);
  const [quizReset, setQuizReset] = useState(false);
  const [startInterval, setStartInterval] = useState(false);
  const [startBeginnerChord, setStartBeginnerChord] = useState(false);
  const [startSeventhChord, setStartSeventhChord] = useState(false);
  const [questionNum, setQuestionNum] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [question, setQuestion] = useState('');
  const [interval, setInterval] = useState('');
  const [correct, setCorrect] = useState('');
  const [a1, setA1] = useState('');
  const [a2, setA2] = useState('');
  const [a3, setA3] = useState('');
  const [a4, setA4] = useState('');

  const intervalEdition = () => {
    const toggleBtns = document.getElementById('quizButtons');
    toggleBtns.style.display = 'none';
    setQuizEdition('interval');
    setQuizStart(true);
  };

  const beginnerChordEdition = () => {
    const toggleBtns = document.getElementById('quizButtons');
    toggleBtns.style.display = 'none';
    setQuizEdition('beginnerChord');
    setQuizStart(true);
  };

  const seventhChordEdition = () => {
    const toggleBtns = document.getElementById('quizButtons');
    toggleBtns.style.display = 'none';
    setQuizEdition('seventhChord');
    setQuizStart(true);
  };

  const startQuiz = () => {
    const toggleBtn = document.getElementById('startButton');
    toggleBtn.style.display = 'none';
    const toggleDesc = document.getElementById('desc');
    toggleDesc.style.display = 'none';
    if (quizEdition === 'interval') {
      intervalQuizStart();
    } else if (quizEdition === 'beginnerChord') {
      beginnerChordQuizStart();
    } else if (quizEdition === 'seventhChord') {
      seventhChordQuizStart();
    }
    setQuizStart(false);
    setQuizChoice(false);
    setInitialQuizState(false);
  };

  const intervalQuizStart = () => {
    setStartInterval(true);
    setQuestionNum( currentQuestion => currentQuestion + 1 );
    loadNewQuestion();
  };

  const beginnerChordQuizStart = () => {
    setStartBeginnerChord(true);
    setQuestionNum( currentQuestion => currentQuestion + 1 );
    loadNewQuestion();
  };

  const seventhChordQuizStart = () => {
    setStartSeventhChord(true);
    setQuestionNum( currentQuestion => currentQuestion + 1 );
    loadNewQuestion();
  };

  const loadNewQuestion = () => {

    if (quizEdition === 'interval') {
      setQuestion(IntervalQuestions[questionNum].question);
      setInterval(IntervalQuestions[questionNum].interval);
      setA1(IntervalQuestions[questionNum].a1);
      setA2(IntervalQuestions[questionNum].a2);
      setA3(IntervalQuestions[questionNum].a3);
      setA4(IntervalQuestions[questionNum].a4);
      setCorrect(IntervalQuestions[questionNum].correct);
      setTotalQuestions(IntervalQuestions.length);

    } else if (quizEdition === 'beginnerChord') {
      setQuestion(ChordQuestions[questionNum].question);
      setInterval(ChordQuestions[questionNum].interval);
      setA1(ChordQuestions[questionNum].a1);
      setA2(ChordQuestions[questionNum].a2);
      setA3(ChordQuestions[questionNum].a3);
      setA4(ChordQuestions[questionNum].a4);
      setCorrect(ChordQuestions[questionNum].correct);
      setTotalQuestions(ChordQuestions.length);

    } else if (quizEdition === 'seventhChord') {
      setQuestion(SeventhChordQuestions[questionNum].question);
      setInterval(SeventhChordQuestions[questionNum].interval);
      setA1(SeventhChordQuestions[questionNum].a1);
      setA2(SeventhChordQuestions[questionNum].a2);
      setA3(SeventhChordQuestions[questionNum].a3);
      setA4(SeventhChordQuestions[questionNum].a4);
      setCorrect(SeventhChordQuestions[questionNum].correct);
      setTotalQuestions(SeventhChordQuestions.length);
    };
  };

  const checkAnswer = e => {
    setQuestionNum( currentQuestion => currentQuestion + 1 );
    jsonCheck(e);
  };

  const jsonCheck = e => {
    let id = e.target.getAttribute('data_id');
    if (id === correct) {
      setPlayerScore( currentPlayerScore => currentPlayerScore + 1 );
      const toggleCorrect = document.getElementById('question');
      toggleCorrect.style.backgroundColor = 'rgba(0, 204, 0, .1)';
    }
    if (id !== correct) {
      const toggleCorrect = document.getElementById('question');
      toggleCorrect.style.backgroundColor = 'rgba(255, 0, 0, .1)';
    }
    if (questionNum < totalQuestions) {
      loadNewQuestion();
    } else {
      gameOver();
    }
  };

  const gameOver = () => {
    setQuizReset(true);
    const toggleCorrect = document.getElementById('question');
    if (playerScore > 8) {
      toggleCorrect.style.backgroundColor = 'rgba(0, 204, 0, .1)';
    } else {
      toggleCorrect.style.backgroundColor = 'rgba(255, 255, 255, .6)';
    }
  }

  if (user) {
    return (
      <QuestionCard id='questionCard'>
        <QuizChoice id='quizButtons'>
          <QuizCard>
            <p>Practice identifying intervals with this quick quiz!</p>
            <img src={majThird} alt="interval"/>
            <button id='intervalBtn' onClick={intervalEdition}>Interval Quiz</button>
          </QuizCard>
          <QuizCard>
            <p>Practice identifying triads with this quick quiz!</p>
            <img src={triad} alt="triad"/>
            <button id='beginnerChordBtn' onClick={beginnerChordEdition}>Triad Chord Quiz</button>
          </QuizCard>
          <QuizCard>
            <p>Practice identifying seventh chords with this quick quiz!</p>
            <img src={seventh} alt="seventh"/>
            <button id='intermediateChordBtn' onClick={seventhChordEdition}>Seventh Chord Quiz</button>
          </QuizCard>
        </QuizChoice>
        { quizEdition === 'interval' &&
          <>
            <Description id='desc'>
              <h1>Intervals</h1>
              <p>An <b>interval</b> is a difference in pitch between two notes. In western harmony, there are 12 intervals in a given octave. Each interval has a distinct sound and can be used to create unique chords and melodies. Let's see how many intervals you can identify correctly!</p>
            </Description>
            <button id='startButton' onClick={startQuiz}>Start Quiz</button>
          </>
        }
        { quizEdition === 'beginnerChord' &&
          <>
            <Description id='desc'>
              <h1>Triads</h1>
              <p>A <b>triad</b> is a set of three notes that create a chord. The notes of a triad from lowest to highest are known as: the <b>root</b>, the <b>third</b>, and the <b>fifth</b>. Triads come in four flavors: <b>major, minor, diminished, and augmented</b>. Let's see how many triads you can identify correctly!</p>
            </Description>
            <button id='startButton' onClick={startQuiz}>Start Quiz</button>
          </>
        }
        { quizEdition === 'seventhChord' &&
          <>
            <Description id='desc'>
              <h1>Seventh Chords</h1>
              <p>A <b>seventh chord</b> is a chord consisting of a triad plus a note forming an interval of a seventh above the chord's root. Seventh chords come in many forms including: <b>major, minor, major/minor, diminished, and augmented</b>. Let's see how many seventh chords you can identify correctly!</p>
            </Description>
            <button id='startButton' onClick={startQuiz}>Start Quiz</button>
          </>
        }
        {startInterval || startBeginnerChord || startSeventhChord ? (
          <Question id="question">
            {!quizReset ? (
              <>
                <h3 className='quiz-question-number'>
                  Q. {questionNum}
                </h3>
                <h2 className='quiz-question'>{question}</h2>
                { quizEdition === 'interval' &&
                  <PlayButton onClick={() => playInt({ id: (interval) })}><img src={playBtn} alt="play"/></PlayButton>
                }
                { quizEdition === 'beginnerChord' &&
                  <PlayButton onClick={() => playChord({ id: (interval) })}><img src={playBtn} alt="play"/></PlayButton>
                }
                { quizEdition === 'seventhChord' &&
                  <PlayButton onClick={() => play7thChord({ id: (interval) })}><img src={playBtn} alt="play"/></PlayButton>
                }
                <button
                  onClick={checkAnswer}
                  data_id='1'
                >
                  {a1}
                </button>
                <button
                  onClick={checkAnswer}
                  data_id='2'
                >
                  {a2}
                </button>
                <button
                  onClick={checkAnswer}
                  data_id='3'
                >
                  {a3}
                </button>
                <button
                  onClick={checkAnswer}
                  data_id='4'
                >
                  {a4}
                </button>
              </>
            ) : (
              ''
            )}
            <div>
              {quizReset ? (
                <>
                  <div className='quiz-player-score'>
                    <h1>
                      Final Score: {playerScore} /{' '}
                      {totalQuestions}
                    </h1>
                    <hr></hr>
                    <h3>
                      {(
                        (playerScore / totalQuestions) * 100
                        ).toFixed(2)}
                      %
                    </h3>
                  </div>
                </>
                ) : (
                  ''
                )}
            </div>
          </Question>
        ) : (
          ''
        )}
      </QuestionCard>
    )} else {
    return (
      <h3 style={{marginTop: '5vw', color: "red", textAlign: 'center'}}>You must sign in to view content</h3>
    );
  }
};

export default Quiz;