import { addModal, projectSelectors } from "@bpgen/services";
import isEmpty from "lodash/isEmpty";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useProjectSettings = () => {
  const dispatch = useDispatch();
  const projectSettings =
    useSelector(projectSelectors.projectSettingsSelector) || [];

  useEffect(() => {
    if (isEmpty(projectSettings)) {
      dispatch(addModal({ type: "projectSettings", data: {} }));
    }
  }, [projectSettings]);
};
