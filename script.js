class Item extends React.Component {
  render() {
    const { index, word, list, onDelete, onEdit, onDone, ongoing } = this.props;

    return (
      <li>
        <input onChange={() => onEdit(index, list)} value={word} />
        <span>{moment().format('L')}</span>
        {<button onClick={() => onDelete(index, list)}>Delete</button>}
        {ongoing && <button onClick={() => onDone(index)}>Done</button>}
      </li>
    );
  }
}

class List extends React.Component {
  constructor() {
    super();
    this.changeHandler = this.changeHandler.bind(this);
  }

  state = {
    list: [],
    done: [],
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

  handleDelete = (index, listName) => {
    let list = this.state[listName];
    list = [...list];
    list.splice(index, 1);
    this.setState({ [listName]: list });
  };

  handleEdit = (index, listName) => {
    const todo = event.target.value;
    const list = [...this.state[listName]];
    list[index] = todo;
    this.setState({ [listName]: list });
  };

  handleDone = index => {
    const done = [...this.state.done];
    const list = [...this.state.list];
    done.push(list[index]);
    list.splice(index, 1);
    this.setState({ done, list });
  };

  render() {
    const { list, done, word, error } = this.state;

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

        <h1>Todo</h1>
        <ul>
          {list.map((word, index) => (
            <Item
              key={index}
              index={index}
              word={word}
              list="list"
              ongoing={true}
              onDelete={this.handleDelete}
              onEdit={this.handleEdit}
              onDone={this.handleDone}
            />
          ))}
        </ul>

        <h1>Done</h1>
        <ul>
          {done.map((word, index) => (
            <Item
              key={index}
              index={index}
              word={word}
              list="done"
              onDelete={this.handleDelete}
              onEdit={this.handleEdit}
              onDone={this.handleDone}
            />
          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<List />, document.getElementById('root'));
