import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./header";
import form from "./components/form";
// import graph from "./components/graph";
// import table from "./common/table";
import Table from "./common/sampleTable1";
import Footer from "./footer";
import { Box } from "@material-ui/core";
import ApexChart from "./components/realtimeGraph";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Box style={{ height: "64px" }}>
          <Header />
        </Box>
        <Box style={{ height: "calc(100% - 64px)", paddingBottom: "6.3rem" }}>
          <Router>
            <Switch>
              <Route path="/" exact component={ApexChart} />
              <Route
                path="/prediction"
                render={() => <Table title="Prediction" />}
              />
              <Route path="/predictionform" component={form} />
            </Switch>
          </Router>
        </Box>
        <Box>
          <Footer />
        </Box>
      </div>
    );
  }
}

export default App;
