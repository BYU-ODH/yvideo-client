import React, { Component } from "react";

import { connect } from "react-redux";
import { load, loaded, getCollections, getRecent } from "redux/actions";

import { withRouter } from "react-router-dom";

import PreviewCollection from "./previews/PreviewCollection";
import PreviewVideo from "./previews/PreviewVideo";

import { Container, Content, PreviewEmpty } from "./styles";
import { Agent } from "https";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  componentDidMount = async () => {
    const { getCollections, getRecent, loaded } = this.props;

    try {
      await getCollections();
    } catch (error) {
      console.warn(error);
      this.setState({ error: true });
    }

    try {
      await getRecent();
    } catch (error) {
      console.warn(error);
      this.setState({ error: true });
    }

    setTimeout(() => {
      loaded();
    }, 500);
  };

  componentWillUnmount = () => {
    this.props.load();
  };

  IsNotArchived = (id, collections) => {
    return collections[id].archived !== true;
  };

  render() {
    const { recent, collectionsCache } = this.props;
    const { collections = {} } = collectionsCache;

    const modRec = recent.slice(0, 4);
    const modColl = Object.keys(collections).slice(0, 4) || null;
    const filteredColl = modColl.filter(id =>
      this.IsNotArchived(id, collections)
    );

    return (
      <Container>
        <Content header>
          <p>Recently Viewed</p>
        </Content>
        <Content>
          {modRec !== undefined && modRec.length !== 0 ? (
            modRec.map(item => <PreviewVideo key={item.id} data={item} />)
          ) : (
            <PreviewEmpty>no videos :(</PreviewEmpty>
          )}
        </Content>
        <Content header>
          <p>Collections</p>
        </Content>
        <Content>
          {filteredColl !== null && filteredColl.length > 0 ? (
            filteredColl.map(id => (
              <PreviewCollection key={id} data={collections[id]} />
            ))
          ) : (
            <PreviewEmpty>no collections :(</PreviewEmpty>
          )}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  collectionsCache: state.collectionsCache,
  recent: state.recent
});

const mapDispatchToProps = {
  load,
  loaded,
  getCollections,
  getRecent
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dashboard)
);
