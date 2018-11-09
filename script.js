class List extends React.Component {
  constructor() {
    super();
    this.changeHandler = this.changeHandler.bind(this);
  }

  state = {
    list: [],
    word: '',
  };

  changeHandler(event) {
    this.setState({ word: event.target.value });
    console.log('change', event.target.value);
  }

  handleAddItem = () => {
    const list = [...this.state.list];
    list.push(this.state.word);
    this.setState({ list });
  };

  render() {
    const { list } = this.state;

    console.log('rendering');
    return (
      <div className="list">
        <input onChange={this.changeHandler} value={this.state.word} />
        <button onClick={this.handleAddItem}>add item</button>
        <ul>
          {list.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<List />, document.getElementById('root'));
