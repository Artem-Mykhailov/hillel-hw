import React from "react";
import { useFormikContext } from "formik";

export default function SaveBtn() {
  const { isValid } = useFormikContext();

  return (
    <button className="btn-submit" type="submit" disabled={!isValid}>
      Відправити
    </button>
  );
}
