import {
  collectionSelectors,
  getCollections,
  setError,
  updateItem,
} from "@bpgen/services";
import Button from "@material-ui/core/Button";
import * as _ from "lodash";
import React from "react";
import { withTheme } from "react-jsonschema-form";
import { useDispatch, useSelector } from "react-redux";
import { Theme as MuiTheme } from "rjsf-material-ui";
import { useAuth } from "../hooks/useAuth";

const CollectionDataForm = (props) => {
  const { id, navigate, el } = props;
  useAuth(navigate);
  const Form = withTheme(MuiTheme);
  const dispatch = useDispatch();
  const collections = useSelector(collectionSelectors.collectionSelector) || [];
  const selectedCollection = _.get(
    collections.filter((e) => e._id === id),
    "[0]",
    {}
  );
  const { jfSchema, jfUiSchema, data = [] } = selectedCollection;

  const selectedElement = _.isEmpty(_.get(props, "location.state.row", false))
    ? _.get(
        data.filter((e) => _.get(e, "id", "") === el),
        "[0]",
        []
      )
    : props.location.state.row;

  let schema = {};
  let uiSchema = {};

  try {
    schema =
      new Function("_", "collections", "selectedElement", jfSchema)(
        _,
        collections,
        selectedElement
      ) || {};
    uiSchema =
      new Function("_", "collections", jfUiSchema)(_, collections) || {};
  } catch (error) {
    dispatch(setError(error.message));
  }

  const onSubmit = ({ formData }) => {
    const newData = data.filter((e) => e.id !== formData.id);
    newData.push(formData);
    const newCollection = {
      ...selectedCollection,
      data: newData,
    };

    dispatch(updateItem({ type: "collections", data: newCollection }));
    dispatch(getCollections());
    navigate(`/data/${id}`);
  };

  const goToDetails = () => navigate(`/data/${id}`);
  return (
    <div className="wrapper">
      <Button onClick={goToDetails} color="secondary" className="padd_bott">
        Back
      </Button>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        formData={selectedElement}
      >
        <div className="padd_top_bott">
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CollectionDataForm;
