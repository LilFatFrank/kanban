import "./styles/app.scss";
import { Content, Header } from "./sections";
import { theme } from "./styles/styles";
import { ThemeProvider, CssBaseline, Toolbar } from "@mui/material";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Header />
        {/* This will act as a fake header for spacing */}
        <Toolbar />
        <Content />
      </div>
    </ThemeProvider>
  );
};

export default App;
