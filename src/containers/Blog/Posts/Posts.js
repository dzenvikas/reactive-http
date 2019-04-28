import React, { Component } from 'react';
import axiosInstance from '../../../axiosInstance';
import './Posts.css';

import { Route } from 'react-router-dom';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
  state = {
    posts: []
  };
  componentDidMount() {
    axiosInstance.get('posts/').then(response => {
      const posts = response.data.slice(0, 4);
      const updatePosts = posts.map(post => {
        return {
          ...post,
          author: 'Vikas'
        };
      });
      this.setState({ posts: updatePosts });
      //   console.log(response);
    });
  }

  postSelectedHandler = id => {
    this.props.history.push({ pathname: '/posts/' + id });
  };
  render() {
    const posts = this.state.posts.map(post => {
      return (
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)}
        />
      );
    });
    return (
      <div>
        <section className="posts">{posts}</section>
        <Route
          path={this.props.match.url + '/:id'}
          exact
          component={FullPost}
        />
      </div>
    );
  }
}

export default Posts;
