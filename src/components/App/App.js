import React, { Component } from 'react';
import { TEAM } from '../../constants/team'
import Column from '../../components/Column/Column'
import Divider from '../../components/Divider/Divider'
import './App.css';

const DEFAULT_PEOPLE_PER_SHUFFLE = 5

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      peoplePerShuffle: DEFAULT_PEOPLE_PER_SHUFFLE,
      stillToBeMatchedPeople: TEAM,
      activePeople: [],
      selections: this.initializeSelections(), 
    }
    this.checkForMatch = this.checkForMatch.bind(this)
    this.getNewActivePeople = this.getNewActivePeople.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleSelection = this.handleSelection.bind(this)
    this.initializeSelections = this.initializeSelections.bind(this)
    this.removeMatch = this.removeMatch.bind(this)
  }
  
  checkForMatch() {
    const { selections } = this.state
    const potentialMatch = selections.photo
    for (let category in selections) {
      if(selections[category] !== potentialMatch) return false;
    }
    return true 
  }

  getNewActivePeople() {
    const { peoplePerShuffle, stillToBeMatchedPeople } = this.state
    const shuffledTeam = stillToBeMatchedPeople.concat().sort(() => .5 - Math.random()) // shuffle  
    return shuffledTeam.slice(0, peoplePerShuffle) //get sub-array of first n elements AFTER shuffle
  }

  handleSelectChange(e) {
  }

  handleSelection(selection, type) {
    const stateObject = this.state
    stateObject.selections[type] = selection
    this.setState(stateObject)
    if (this.checkForMatch()) {
      this.removeMatch(selection)
    }
  }

  componentDidMount() {
    this.setState({activePeople:this.getNewActivePeople()})
  }

  componentDidUpdate() {
    if (this.state.activePeople.length === 0 && this.state.stillToBeMatchedPeople.length !== 0) {
      this.setState({activePeople: this.getNewActivePeople()})
    }
  }

  initializeSelections() {
    return {
      photo: null,
      firstName: null,
      lastName: null,
    }
  }

  removeMatch(match) {
    const { activePeople, stillToBeMatchedPeople } = this.state
    this.setState({
      activePeople: activePeople.filter(activePerson => activePerson.src !== match),
      stillToBeMatchedPeople: stillToBeMatchedPeople.filter(activePerson => activePerson.src !== match),
      selections: this.initializeSelections()
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <select className="App-header__select" defaultValue={DEFAULT_PEOPLE_PER_SHUFFLE} onChange={this.handleSelectChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <h1 className="App-title unselectable">NICHE NAME GAME</h1>
        </header>
        <div className="content-container">
          <div className="column-container">
            <Column
              type="photo"
              people={ this.state.activePeople }
              onChange={ this.handleSelection } 
              />
            <Divider/>
            <Column
              type="firstName"
              people={ this.state.activePeople }
              onChange={ this.handleSelection } 
              />
            <Divider/>
            <Column
              type="lastName"
              people={ this.state.activePeople }
              onChange={ this.handleSelection } 
            />
          </div>
            <div className={`game-over-text__wrap ${this.state.stillToBeMatchedPeople.length === 0 ? ' visible' : ' hidden'}`}>
              <span className="game-over-text">Congratulations! You're Finished.</span>
              <span className="game-over-text game-over-text--small ">(except for the newest of new people).</span>
            </div>
        </div>
      </div>
  )}
}

export default App;
