import { BrowserRouter } from "react-router-dom";
import { AllPages } from "./Pages/AllPages";

const App = () => {
  return (
    <BrowserRouter>
      <AllPages />
    </BrowserRouter>
  );
};

export default App;
