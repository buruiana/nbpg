import Loading from "@bpgen/layouts/screens/Loading";
import { Router } from "@reach/router";
import React, { Suspense } from "react";

const Home = React.lazy(() => import("@bpgen/layouts/screens/Home"));
const CollectionsForm = React.lazy(() =>
  import("@bpgen/layouts/forms/CollectionsForm")
);
const CollectionList = React.lazy(() =>
  import("@bpgen/layouts/screens/CollectionList")
);
const CollectionData = React.lazy(() =>
  import("@bpgen/layouts/screens/CollectionData")
);
const CollectionDataForm = React.lazy(() =>
  import("@bpgen/layouts/forms/CollectionDataForm")
);
const LoginForm = React.lazy(() => import("@bpgen/layouts/forms/LoginForm"));
const Editor = React.lazy(() => import("@bpgen/layouts/screens/Editor"));
const NotFound = React.lazy(() => import("@bpgen/layouts/screens/NotFound"));

const routes = (
  <div>
    <Suspense fallback={<Loading />}>
      <Router>
        <Home path="/" />
        <CollectionsForm path="form/:id" />
        <CollectionsForm path="form" />
        <CollectionList path="list" />
        <CollectionData path="data/:id" />
        <CollectionDataForm path="editdata/:id/:el" />
        <Editor path="editor" />
        <LoginForm path="login" />
        <NotFound default />
      </Router>
    </Suspense>
  </div>
);

export default routes;
