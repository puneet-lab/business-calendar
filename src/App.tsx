import "./App.css";
import BusinessCalendar from "./calendar/BusinessCalendar";

function App() {
  return (
    <>
      <div className="App grid gap-4">
        <div className="text-3xl">Business Calendar</div>
        <BusinessCalendar />
      </div>
    </>
  );
}

export default App;
