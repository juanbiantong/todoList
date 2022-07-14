import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <div className='flex justify-center flex-col md:w-6/12 mx-auto'>
        <Header />
        <TodoList />
      </div>{" "}
      <Toaster
        position='bottom-right'
        toastOptions={{
          style: {
            fontSize: "1rem",
          },
        }}
      />{" "}
    </>
  );
}

export default App;