import { useState } from "react";
import { Col, Row, Button, Flex, message } from "antd";
import json2ts from "@cyly/json2ts";
import Editor from "@monaco-editor/react";
import { DeleteOutlined } from "@ant-design/icons";
import { useCopyToClipboard } from "react-use";
import "./App.css";
function App() {
  const [jsonValue, setJsonValue] = useState("");
  const [tsValue, setTsValue] = useState("");
  const [, copyToClipboard] = useCopyToClipboard();
  const handleRun = () => {
    try {
      const result = json2ts(jsonValue, {
        semicolon: true,
        parseArray:true,
      })
      setTsValue(result)
    } catch (e) {
      message.error(e?.message || "解析出错");
    }
  };
  const handleCopy = () =>{
    copyToClipboard(tsValue)
  }
  return (
    <>
      <Row>
        <Col span={12}>
          <div className="js_wrapper">
            <Flex
              className="header"
              gap="middle"
              wrap="wrap"
              justify="space-around"
              align="center"
            >
              <span>JSON结构</span>
              <div>
                <Button
                  style={{ backgroundColor: "#009688" }}
                  type="primary"
                  danger
                  onClick={handleRun}
                >
                  RUN
                </Button>
                <span style={{ marginLeft: "20px" }}>
                  <DeleteOutlined onClick={()=> setJsonValue("")} style={{color:'white',fontSize:'20px',cursor:'pointer'}}  />
                </span>
              </div>
            </Flex>
            <Editor
              className="editor"
              defaultLanguage="json"
              defaultValue=""
              value={jsonValue}
              onChange={(value) => setJsonValue(value)}
            />
          </div>
        </Col>
        <Col span={12}>
          <div className="ts_wrapper">
            <Flex
              className="header"
              gap="middle"
              wrap="wrap"
              justify="space-around"
              align="center"
            >
              <span>TypeScript结构</span>
              <Button
                style={{ backgroundColor: "#009688" }}
                type="primary"
                danger
                onClick={handleCopy}
              >
                复制
              </Button>
            </Flex>
            <Editor
              className="editor"
              defaultLanguage="json"
              defaultValue=""
              value={tsValue}
              onChange={(value) => setTsValue(value)}
            />
          </div>
        </Col>
      </Row>
    </>
  );
}

export default App;
