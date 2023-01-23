interface Props {
  name?: any
}
function App(props: Props) {
  return (
    <div className="App">
      App {props.name}
    </div>
  );
}

export default App;
