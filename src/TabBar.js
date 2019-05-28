import React from "react";
import { Route, Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
function Eins() {
  return (
    <div>
      <h1>Eins</h1>
      <p>Lorem ipsum</p>
    </div>
  );
}

function Zwei() {
  return (
    <div>
      <h1>Zwei</h1>
      <p>Lirum larum löffelstiel</p>
    </div>
  );
}

export default function TabBar() {
  return (
    <>
      <div className="TabBar">
        <Link to="/eins">Eins</Link>
        <Route path="/eins">
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={1000}
              classNames="tab"
              unmountOnExit
            >
              <div className="tab">
                <Eins />
              </div>
            </CSSTransition>
          )}
        </Route>
        <Link to="/zwei">Zwei</Link>
        <Route path="/zwei">
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={1000}
              classNames="tab"
              unmountOnExit
            >
              <div className="tab">
                <Zwei />
              </div>
            </CSSTransition>
          )}
        </Route>
      </div>
    </>
  );
}
