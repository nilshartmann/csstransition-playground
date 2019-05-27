import React from "react";
import "./App.css";
import { CSSTransition } from "react-transition-group";
import TabBar from "./TabBar";
import { HashRouter as Router } from "react-router-dom";

function Block() {
  const [state, setState] = React.useState(false);

  const className = state ? "Block-open" : "Block-closed";

  return (
    <>
      <p>
        Der folgende Block ist <b>immer</b> im DOM und bekommt durch klicken nur
        andere Farbe durch neu-setzen der CSS Klasse:
      </p>
      <div className={className}>
        <p>eins</p>
        <p>zwei</p>
        <p>drei</p>
      </div>
      <button onClick={e => setState(!state)}>Toggle</button>
    </>
  );
}

function AppearBlock() {
  const [state, setState] = React.useState(false);

  const className = state ? "AppearBlock-open" : "AppearBlock-closed";

  return (
    <>
      <p>
        Der folgende Block ist <b>immer</b> im DOM und bekommt durch klicken nur
        andere Opacity durch neu-setzen der CSS Klasse:
      </p>
      <div className={className}>
        <p>eins</p>
        <p>zwei</p>
        <p>drei</p>
      </div>
      <button onClick={e => setState(!state)}>Toggle</button>
    </>
  );
}

function UnmountBlock() {
  const [state, setState] = React.useState(false);

  const className = state ? "UnmountBlock-open" : "UnmountBlock-closed";

  return (
    <>
      <p>
        Der folgende Block ist nur im DOM, wenn state auf true gesetzt ist.
        Opacity wird zwar gesetzt, hat aber keine Auswirkung, weil sich kein CSS
        Property ändert (Element wird nur ein- ausgeblendet, aber nicht{" "}
        <em>verändert</em>)
      </p>
      {state && (
        <div className={className}>
          <p>eins</p>
          <p>zwei</p>
          <p>drei</p>
        </div>
      )}
      <button onClick={e => setState(!state)}>
        Toggle (aktuell sichtbar: {String(state)})
      </button>
    </>
  );
}

function ManualTransition() {
  const [state, setState] = React.useState("HIDDEN");
  // eslint-disable-next-line
  React.useEffect(() => {
    if (state === "START") {
      setState("OPEN");
    }
  });

  let className = "";
  switch (state) {
    case "HIDDEN":
      break;
    case "START":
      className = "ManualTransition-onMount";
      break;
    case "OPEN":
      className = "ManualTransition-show";
      break;
    default:
  }

  return (
    <>
      <p>
        Der folgende Block ist nur im DOM, wenn state auf START oder OPEN
        gesetzt ist. Im Zustand START wird das Element eingeblendet, mit einer
        CSS Klasse die die Opacity initial setzt, so dass das Element zunächst
        unsichtbar ist. Unmittelbar nach dem Rendern im DOM wird dann die CSS
        Klase auf "OPEN" gesetzt, und die Transition auf Opacity 1 beginnt.
      </p>
      {state !== "HIDDEN" && (
        <div className={className}>
          <p>eins</p>
          <p>zwei</p>
          <p>drei</p>
        </div>
      )}
      <button onClick={e => setState("START")}>
        Toggle (aktuell sichtbar: {state})
      </button>
    </>
  );
}

function ReactTransition() {
  const [state, setState] = React.useState(false);

  return (
    <>
      <p>
        Der folgende Block ist nur im DOM, wenn state auf true gesetzt ist. Das
        Setzen der Klassen beim Erscheinen und Verschwinden regelt die
        CSSTransitionGroup
      </p>
      <CSSTransition
        appear
        in={state}
        timeout={1000}
        classNames="ReactTransition"
        unmountOnExit
      >
        <div>
          <p>eins</p>
          <p>zwei</p>
          <p>drei</p>
        </div>
      </CSSTransition>
      <button onClick={e => setState(!state)}>
        Toggle (aktuell sichtbar: {String(state)})
      </button>
    </>
  );
}

function Wrapper(props) {
  return <div className="Wrapper">{props.children}</div>;
}

function App() {
  return (
    <Router>
      <Wrapper>
        <TabBar />
      </Wrapper>
      <Wrapper>
        <Block />
      </Wrapper>

      <Wrapper>
        <AppearBlock />
      </Wrapper>

      <Wrapper>
        <UnmountBlock />
      </Wrapper>

      <Wrapper>
        <ManualTransition />
      </Wrapper>
      <Wrapper>
        <ReactTransition />
      </Wrapper>
    </Router>
  );
}

export default App;
