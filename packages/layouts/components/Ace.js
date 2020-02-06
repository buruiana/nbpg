import React from "react"
import AceEditor from "react-ace"
import "brace/mode/jsx"
import "brace/theme/github"
import isEmpty from "lodash/isEmpty"
import get from "lodash/get"
import { useDispatch, useSelector } from 'react-redux'
import {
  codeGenSelectors,
  projectSelectors,
} from '@bpgen/services'
import AceTabs from './AceTabs'

const Ace = ( ) => {
  const code = isEmpty(useSelector(codeGenSelectors.codeGenSelector))
  const currentTab = useSelector(projectSelectors.currentTabSelector) || ''

  // const onChange = newValue => {
  //   console.log("change1", newValue)
  // }
  const getAceContent = () => {
    if (isEmpty(code)) return ""
    return get(code.filter(e => e.id === currentTab), '[0].code', '')
  }

  return (
    <div>
      <div className="paddingTop">
        <div>
          <AceTabs />
        </div>

        <AceEditor
          mode="jsx"
          theme="github"
          //onChange={onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            showLineNumbers: true,
            tabSize: 2
          }}
          fontSize={12}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={getAceContent()}
          height="700px"
        />
      </div>
    </div>
  )
}

export default Ace
