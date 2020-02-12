import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import logo from './images/songbird.jpg';
import mysteryBird from './images/black-and-white-bird.jpg';
import birdsData from './birds';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/src/styles.scss';

import './index.scss';

import '@babel/polyfill';

function getRandomNumber() {
  const max = 5;
  const min = 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let num = getRandomNumber();

const Header = (props) => {
  return (
    <div>
      <div className="logotype-and-score-container">
        <div>
          <img
            src={logo}
            alt="Logotype of Songbird-Application"
            className="logotype"
          />
        </div>
        <div>
          <h2 className="score">
            Score: <span id="score">{props.score}</span>
          </h2>
        </div>
      </div>

      <nav className="nav">
        <ul className="list-of-tasks" id="list-of-tasks">
          <li id='0' className='act'>Разминка</li>
          <li id='1'>Воробьиные</li>
          <li id='2'>Лесные птицы</li>
          <li id='3'>Певчие птицы</li>
          <li id='4'>Хищные птицы</li>
          <li id='5'>Морские птицы</li>
        </ul>
      </nav>
    </div>
  );
};

const Question = (props) => {
  let nameOfBird;
  let imageOfBird;
  if (props.isRight) {
    nameOfBird = props.currentBird.name;
    imageOfBird = props.currentBird.image;
  } else {
    nameOfBird = '*****';
    imageOfBird = mysteryBird;
  }

  return (
    <div className="question-container" id='question-container'>
      <div>
        <img
          src={imageOfBird}
          alt="Black and white bird: a bird to be recognized"
          className="mystery-bird"
        />
      </div>
      <div className="audio-and-name-container">
        <div className="mystery-name-container">
          <h3 className="mystery-name" id="mystery-name">
            {nameOfBird}
          </h3>
        </div>
        <div className="audio-container">
          <AudioPlayer controls src={props.currentBird.audio} autoPlayAfterSrcChange={false}/>
        </div>
      </div>
    </div>
  );
};

const Answers = (props) => {
    return (
    <div className="list-of-answers-container" id="list-of-answers-container">
      <ul className="list-of-answers" id="list-of-answers" >
        <li onClick={props.onClick} className="variant">{birdsData[props.level][0].name}</li>
        <li onClick={props.onClick} className="variant">{birdsData[props.level][1].name}</li>
        <li onClick={props.onClick} className="variant">{birdsData[props.level][2].name}</li>
        <li onClick={props.onClick} className="variant">{birdsData[props.level][3].name}</li>
        <li onClick={props.onClick} className="variant">{birdsData[props.level][4].name}</li>
        <li onClick={props.onClick} className="variant">{birdsData[props.level][5].name}</li>
      </ul>
    </div>
  );
};

const DescriptionOfBird = (props) => {
 return (
    <div className="description-of-bird"  id='description-of-bird'>
        <div id='hide' className='hide'>
      <div className="desc-container">
        <div className='image-in-desc-container'>
          <img className='image-in-desc' src={props.imageOfBird} alt="A picture of chosen bird" />
        </div>
        <div className='details'>
          <div className='name-of-bird-in-desc'>
            <h3>{props.nameOfBird}</h3>
          </div>
          <div>
            <p>{props.speciesOfBird}</p>
          </div>
          <div className='audio-in-desc'>
            <AudioPlayer controls src={props.audioOfBird} autoPlayAfterSrcChange={false}/>
          </div>
          <div>
              <p className='text'>{props.descriptionOfBird}</p>
          </div>
        </div>
      </div>
      </div>
      <div id='recommendations'>
        <p className="recommendations">
          Послушайте плеер. <br /> Выберите птицу из списка
        </p>
      </div>
    </div>
  );
};

const NextLevelButton = (props) => {
  return (
    <div className="next-level-button-container" id="next-level-button-container" onClick={props.changeLevel}>
      <p>Next Level</p>
    </div>
  );
};

const PlayAgain = (props) => {
    return (
        <Fragment>
        <div class='cong-container hide' id='cong'>
            <h2>Поздравляем!</h2>
            <h3>Вы набрали {props.score} очко из 30 :)</h3>
        </div>
      <div className="next-level-button-container blue-green hide" id="play-again">
        <p>Попробовать ещё раз!</p>
      </div>
      </Fragment>
    );
  };

class FindingTheRightAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.isItRightAnswer = this.isItRightAnswer.bind(this);
    this.changeLevel = this.changeLevel.bind(this);
    this.state = {
      isRight: false,
      nameOfBird: '',
      imageOfBird: '',
      speciesOfBird: '',
      audioOfBird: '',
      descriptionOfBird: '',
      level: 0,
      next: 0,
      score: 0,
    }
  }

  changeLevel() {
      if (this.state.next === 1 && this.state.level < 5) {
        num = getRandomNumber();

        const scoreNum = document.getElementsByClassName('red');
        const result = 5 - scoreNum.length;
        this.setState((state) => {
            return {
                level: state.level += 1,
                next: 0,
                isRight: false,
                nameOfBird: '',
                imageOfBird: '',
                speciesOfBird: '',
                audioOfBird: '',
                descriptionOfBird: '',
                score: state.score += result,
            }
        })

        let noAct = this.state.level;
        document.getElementById(noAct + 1).classList.add('act');
        document.getElementById(noAct).classList.remove('act');
        noAct += 1;

        const blockWithInfo = document.getElementById('hide');
        blockWithInfo.classList.add('hide');
        const blockToHide = document.getElementById('recommendations');
        blockToHide.classList.remove('hide');

        const nextLevel = document.getElementById('next-level-button-container');
        nextLevel.classList.remove('blue-green');

        const list = document.getElementsByClassName('variant');
        
        for (let i = 0; i < 7; i++) {
            list[i].classList.remove('green');
            list[i].classList.remove('red');
        }
      } else if (this.state.next === 1 && this.state.level === 5) {
        document.getElementById('question-container').classList.add('hide');
        document.getElementById('list-of-answers-container').classList.add('hide');
        document.getElementById('description-of-bird').classList.add('hide');
        document.getElementById('next-level-button-container').classList.add('hide');
        document.getElementById('play-again').classList.remove('hide');
        document.getElementById('cong').classList.remove('hide');
      }
}

    startAgain() {
        document.getElementById('question-container').classList.remove('hide');
        document.getElementById('list-of-answers-container').classList.remove('hide');
        document.getElementById('description-of-bird').classList.remove('hide');
        document.getElementById('next-level-button-container').classList.remove('hide');
        document.getElementById('play-again').classList.add('hide');
        document.getElementById('cong').classList.add('hide');

        num = getRandomNumber();

        this.setState((state) => {
            return {
                level: 0,
                next: 0,
                isRight: false,
                nameOfBird: '',
                imageOfBird: '',
                speciesOfBird: '',
                audioOfBird: '',
                descriptionOfBird: '',
                score: 0,
            }
        })

        const blockWithInfo = document.getElementById('hide');
        blockWithInfo.classList.add('hide');
        const blockToHide = document.getElementById('recommendations');
        blockToHide.classList.remove('hide');

        const nextLevel = document.getElementById('next-level-button-container');
        nextLevel.classList.remove('blue-green');

        const list = document.getElementsByClassName('variant');
        
        for (let i = 0; i < 7; i++) {
            list[i].classList.remove('green');
            list[i].classList.remove('red');
        }
    }

  isItRightAnswer(event) {
    const blockWithInfo = document.getElementById('hide');
    blockWithInfo.classList.remove('hide');
    const blockToHide = document.getElementById('recommendations');
    blockToHide.classList.add('hide');

    if (event.target.innerHTML === birdsData[this.state.level][num].name) {
        event.target.classList.add('green');
      this.setState((state) => {
        return {
            isRight: !state.isRight,
            nameOfBird: birdsData[this.state.level][num].name,
            imageOfBird: birdsData[this.state.level][num].image,
            speciesOfBird: birdsData[this.state.level][num].species,
            audioOfBird: birdsData[this.state.level][num].audio,
            descriptionOfBird: birdsData[this.state.level][num].description,
            next: 1,
        }
      })

      const nextLevel = document.getElementById('next-level-button-container');
      nextLevel.classList.add('blue-green');

    } else {
        if (event.target.parentNode.firstChild !== 'green' && event.target.parentNode.firstChild.nextElementSibling !== 'green' && event.target.parentNode.firstChild.nextElementSibling.nextElementSibling.className !== 'green' && event.target.parentNode.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.className !== 'green' && event.target.parentNode.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.className !== 'green' && event.target.parentNode.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.className !== 'green') {
            event.target.classList.add('red');
        }
        
        for (let i = 0; i < 7; i++) {
            if (event.target.innerHTML === birdsData[this.state.level][i].name) {
                const bird = birdsData[this.state.level][i];
                this.setState((state) => {
                    return {
                        nameOfBird: bird.name,
                        imageOfBird: bird.image,
                        speciesOfBird: bird.species,
                        audioOfBird: bird.audio,
                        descriptionOfBird: bird.description,
                    }
                })
            }
        }
    }
  }

  render() {
     const currentBird = birdsData[this.state.level][num];

    return (
      <Fragment>
        <Header score={this.state.score}/>
        <Question currentBird={currentBird} isRight={this.state.isRight}/>
        <Answers onClick={this.isItRightAnswer} level={this.state.level}/>
        <DescriptionOfBird currentBird={currentBird} isRight={this.state.isRight} nameOfBird={this.state.nameOfBird} imageOfBird={this.state.imageOfBird} speciesOfBird={this.state.speciesOfBird} audioOfBird={this.state.audioOfBird} descriptionOfBird={this.state.descriptionOfBird} />
        <NextLevelButton changeLevel={this.changeLevel}/>
        <PlayAgain score={this.state.score} startAgain={this.startAgain}/>
      </Fragment>
    );
  }
}

// const AppWithHot = hot(module)(App);

const mountNode = document.getElementById('root');
ReactDOM.render(
  <div>
    <FindingTheRightAnswer />
  </div>,
  mountNode,
);

// ReactDOM.render(<Question />, mountNode);

// const listOfAnswers = document.getElementById('list-of-answers');
// listOfAnswers.addEventListener('click', isItRightAnswer);
