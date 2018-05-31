import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { invokeApig } from '../libs/awsLib';
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      games: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const results = await this.games();
      this.setState({ games: results });
    }
    catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  games() {
    return invokeApig({ path: "/games" });
  }

  handleGameClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }

  renderGamesList(games) {
    return [{}].concat(games).map(
      (game, i) =>
        i !== 0
          ? <ListGroupItem
              key={game.gameId}
              href={`/games/${game.gameId}`}
              onClick={this.handleGameClick}
              header={game.content.trim().split("\n")[0]}
            >
              {`Created: ${new Date(game.createdAt).toLocaleString()}`}
            </ListGroupItem>
          : <ListGroupItem
              key="new"
              href="/game/new"
              onClick={this.handleGameClick}
            >
              <h4>
                <b>{"\uFF0B"}</b> Create a new game
              </h4>
            </ListGroupItem>

    )
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>The Asterisk Lounge</h1>
        <p>Take a seat. Play some games.</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  renderGames() {
    return (
      <div className="games">
        <PageHeader>Your Games</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderGamesList(this.state.games)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderGames() : this.renderLander()}
      </div>
    );
  }
}
