import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Customers from "./pages/customers";
import Plans from "./pages/plans";
import Bills from "./pages/bills";
import Login from "./pages/login";
import Nav from "./components/nav";
import Footer from "./components/footer";
import GenerateBillPage from "./pages/generateBillPage";  // IMPORT THE NEW PAGE

function App() {
  return (
    <>
      <Nav />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/customers" component={Customers} />
        <Route exact path="/plans" component={Plans} />
        <Route exact path="/bills" component={Bills} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/generate-bill" component={GenerateBillPage} />  {/* ADD NEW ROUTE */}
      </Switch>
      <Footer />
    </>
  );
}

export default App;
