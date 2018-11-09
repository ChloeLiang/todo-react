class Item extends React.Component {
  render() {
    const { index, word, onDelete, onEdit } = this.props;

    return (
      <li>
        <input onChange={() => onEdit(index)} value={word} />
        <button onClick={() => onDelete(index)}>Delete</button>
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

  handleDelete = index => {
    let { list } = this.state;
    list = [...list];
    list.splice(index, 1);
    this.setState({ list });
  };

  handleEdit = index => {
    const todo = event.target.value;
    const list = [...this.state.list];
    list[index] = todo;
    this.setState({ list });
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
          {list.map((word, index) => (
            <Item
              key={index}
              index={index}
              word={word}
              onDelete={this.handleDelete}
              onEdit={this.handleEdit}
            />
          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<List />, document.getElementById('root'));
