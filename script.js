class List extends React.Component {
  constructor() {
    super();
    this.changeHandler = this.changeHandler.bind(this);
  }

  state = {
    list: [],
    word: '',
    error: '',
  };

  changeHandler(event) {
    const word = event.target.value.trim();
    let { error } = this.state;

    if (word === '') {
      error = 'Enter at least one character';
    } else {
      error = '';
    }

    this.setState({ word, error });
  }

  handleInputBlur = () => {
    this.setState({ error: '' });
  };

  handleAddItem = () => {
    let { list, word } = this.state;

    if (word === '') {
      return;
    }

    list = [...list];
    list.push(word);
    word = '';
    this.setState({ list, word });
  };

  render() {
    const { list, word, error } = this.state;

    console.log('rendering');

    return (
      <div className="list">
        <input
          onChange={this.changeHandler}
          onBlur={this.handleInputBlur}
          value={word}
        />
        <button onClick={this.handleAddItem}>add item</button>
        <p>{error}</p>
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
