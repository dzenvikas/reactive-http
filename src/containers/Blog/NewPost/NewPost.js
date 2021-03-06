import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import './NewPost.css';
import axios from 'axios';

class NewPost extends Component {
  state = {
    title: '',
    content: '',
    author: 'Vikas',
    submitted: false
  };

  postPostHandler = () => {
    const data = {
      title: this.state.title,
      body: this.state.content,
      author: this.state.author
    };
    axios
      .post('https://jsonplaceholder.typicode.com/posts', data)
      .then(response => {
        console.log(response);
        this.setState({ submitted: true });
      });
  };
  render() {
    let redirected = null;
    if (this.state.submitted) {
      redirected = <Redirect to="/posts" />;
    }
    return (
      <div className="NewPost">
        {redirected}
        <h1>Add a Post</h1>
        <label>Title</label>
        <input
          type="text"
          value={this.state.title}
          onChange={event => this.setState({ title: event.target.value })}
        />
        <label>Content</label>
        <textarea
          rows="4"
          value={this.state.content}
          onChange={event => this.setState({ content: event.target.value })}
        />
        <label>Author</label>
        <select
          value={this.state.author}
          onChange={event => this.setState({ author: event.target.value })}
        >
          <option value="Vikas">Vikas</option>
          <option value="Pragati">Pragati</option>
        </select>
        <button onClick={this.postPostHandler}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;
