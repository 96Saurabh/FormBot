import { useState } from "react";

import Flow from "../Components/Workspace/Flow/Flow";

function FormPage() {
  const [fields, setFields] = useState([]);

  return (
    <div>
      <Flow fields={fields} setFields={setFields} />
    </div>
  );
}

export default FormPage;
