import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Tab } from '@headlessui/react';
import { FaDownload, FaArrowUp, FaArrowDown, FaTrash, FaPlus, FaEdit } from 'react-icons/fa';

interface CookieObject {
  [key: string]: string;
}

interface FieldConfig {
  name: string;
  defaultValue: string;
  type: 'string' | 'number' | 'boolean' | 'null';
}

const ToolSet = () => {
  const [currentTool, setCurrentTool] = useState('BASE64编解码');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [decodeResult, setDecodeResult] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [cookieInput, setCookieInput] = useState('');
  const [csvInput, setCsvInput] = useState('');
  const [csvOutput, setCsvOutput] = useState('');
  const [fieldOrderInput, setFieldOrderInput] = useState('');
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [availableFields, setAvailableFields] = useState<string[]>([]);
  const [deleteInput, setDeleteInput] = useState('');
  const [deleteFields, setDeleteFields] = useState<string[]>([]);
  const [deleteOutput, setDeleteOutput] = useState('');
  const [deleteMode, setDeleteMode] = useState<'object' | 'array'>('object');
  const [completeInput, setCompleteInput] = useState('');
  const [completeOutput, setCompleteOutput] = useState('');
  const [completeMode, setCompleteMode] = useState<'object' | 'array'>('object');
  const [fieldConfigs, setFieldConfigs] = useState<FieldConfig[]>([]);
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');
  const [newFieldType, setNewFieldType] = useState<FieldConfig['type']>('string');

  const tools = [
    '2FA验证码',
    'BASE64编解码',
    'JSON格式化',
    '字符分割',
    '数据转CSV',
    '字段顺序',
    '数据删除',
    '字段补全',
    'Cookie转JSON'
  ];

  // BASE64编码
  const encodeBase64 = () => {
    try {
      const encoded = btoa(inputText);
      setOutputText(encoded);
    } catch (error) {
      setOutputText('编码失败，请检查输入内容');
    }
  };

  // BASE64解码
  const decodeBase64 = () => {
    try {
      const decoded = atob(inputText);
      setDecodeResult(decoded);
    } catch (error) {
      setDecodeResult('解码失败，请检查输入内容');
    }
  };

  // JSON格式化
  const formatJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed, null, 2));
    } catch (error) {
      setJsonOutput('Invalid JSON');
    }
  };

  // 字符分割
  const splitText = () => {
    const result = textInput.split(delimiter).filter(item => item.trim());
    setJsonOutput(JSON.stringify(result, null, 2));
  };

  // Cookie转JSON
  const cookieToJSON = () => {
    try {
      const cookieObj = cookieInput.split(';').reduce<CookieObject>((acc, cookie) => {
        const [key, value] = cookie.split('=').map(item => item.trim());
        if (key && value) {
          acc[key] = value;
        }
        return acc;
      }, {});
      setJsonOutput(JSON.stringify(cookieObj, null, 2));
    } catch (error) {
      setJsonOutput('Invalid Cookie String');
    }
  };

  // 数据转CSV
  const convertToCSV = () => {
    try {
      // 解析JSON数据
      const data = JSON.parse(csvInput);
      
      // 确保数据是数组
      if (!Array.isArray(data)) {
        throw new Error('输入数据必须是数组格式');
      }

      // 如果数组为空，返回错误
      if (data.length === 0) {
        throw new Error('数组不能为空');
      }

      // 获取所有可能的列名
      const columns = Array.from(new Set(
        data.reduce((acc: string[], row) => {
          if (typeof row === 'object' && row !== null) {
            return [...acc, ...Object.keys(row)];
          }
          return acc;
        }, [])
      ));

      // 生成CSV头部
      const header = columns.join(',');

      // 生成CSV行
      const rows = data.map(row => {
        if (typeof row === 'object' && row !== null) {
          return columns.map(col => {
            const value = row[col];
            // 处理包含逗号、引号或换行符的值
            if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value ?? '';
          }).join(',');
        }
        return '';
      });

      // 组合最终的CSV
      const csv = [header, ...rows].join('\n');
      setCsvOutput(csv);
    } catch (error) {
      setCsvOutput(error instanceof Error ? error.message : '转换失败');
    }
  };

  // 下载CSV文件
  const downloadCSV = () => {
    if (!csvOutput) return;
    
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  // 解析JSON并提取字段
  const parseFieldsFromJSON = () => {
    try {
      const data = JSON.parse(fieldOrderInput);
      if (typeof data === 'object' && data !== null) {
        const fields = Object.keys(data);
        setAvailableFields(fields.filter(field => !selectedFields.includes(field)));
        setJsonOutput(JSON.stringify(data, null, 2));
      } else {
        throw new Error('输入必须是JSON对象格式');
      }
    } catch (error) {
      setJsonOutput(error instanceof Error ? error.message : '解析失败');
    }
  };

  // 添加字段到已选列表
  const addField = (field: string) => {
    setSelectedFields([...selectedFields, field]);
    setAvailableFields(availableFields.filter(f => f !== field));
  };

  // 从已选列表移除字段
  const removeField = (field: string) => {
    setSelectedFields(selectedFields.filter(f => f !== field));
    setAvailableFields([...availableFields, field]);
  };

  // 移动字段位置
  const moveField = (index: number, direction: 'up' | 'down') => {
    const newFields = [...selectedFields];
    if (direction === 'up' && index > 0) {
      [newFields[index], newFields[index - 1]] = [newFields[index - 1], newFields[index]];
    } else if (direction === 'down' && index < selectedFields.length - 1) {
      [newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]];
    }
    setSelectedFields(newFields);
  };

  // 重新排序JSON对象
  const reorderFields = () => {
    try {
      const data = JSON.parse(fieldOrderInput);
      if (typeof data === 'object' && data !== null) {
        const reorderedObj = selectedFields.reduce((acc, field) => {
          if (field in data) {
            acc[field] = data[field];
          }
          return acc;
        }, {} as Record<string, any>);
        
        // 添加未选择的字段到对象末尾
        availableFields.forEach(field => {
          if (field in data) {
            reorderedObj[field] = data[field];
          }
        });
        
        setJsonOutput(JSON.stringify(reorderedObj, null, 2));
      }
    } catch (error) {
      setJsonOutput(error instanceof Error ? error.message : '重排序失败');
    }
  };

  // 添加要删除的字段
  const addDeleteField = (field: string) => {
    if (field.trim() && !deleteFields.includes(field.trim())) {
      setDeleteFields([...deleteFields, field.trim()]);
    }
  };

  // 移除要删除的字段
  const removeDeleteField = (index: number) => {
    setDeleteFields(deleteFields.filter((_, i) => i !== index));
  };

  // 执行数据删除
  const executeDelete = () => {
    try {
      const data = JSON.parse(deleteInput);
      
      if (deleteMode === 'object') {
        // 处理单个对象
        if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
          const result = { ...data };
          deleteFields.forEach(field => {
            delete result[field];
          });
          setDeleteOutput(JSON.stringify(result, null, 2));
        } else {
          throw new Error('输入必须是JSON对象格式');
        }
      } else {
        // 处理数组
        if (Array.isArray(data)) {
          const result = data.map(item => {
            if (typeof item === 'object' && item !== null) {
              const newItem = { ...item };
              deleteFields.forEach(field => {
                delete newItem[field];
              });
              return newItem;
            }
            return item;
          });
          setDeleteOutput(JSON.stringify(result, null, 2));
        } else {
          throw new Error('输入必须是JSON数组格式');
        }
      }
    } catch (error) {
      setDeleteOutput(error instanceof Error ? error.message : '删除操作失败');
    }
  };

  // 添加字段配置
  const addFieldConfig = () => {
    if (newFieldName.trim() && !fieldConfigs.some(f => f.name === newFieldName.trim())) {
      setFieldConfigs([
        ...fieldConfigs,
        {
          name: newFieldName.trim(),
          defaultValue: newFieldValue,
          type: newFieldType
        }
      ]);
      setNewFieldName('');
      setNewFieldValue('');
      setNewFieldType('string');
    }
  };

  // 移除字段配置
  const removeFieldConfig = (index: number) => {
    setFieldConfigs(fieldConfigs.filter((_, i) => i !== index));
  };

  // 转换值类型
  const convertValue = (value: string, type: FieldConfig['type']) => {
    switch (type) {
      case 'number':
        return Number(value);
      case 'boolean':
        return value.toLowerCase() === 'true';
      case 'null':
        return null;
      default:
        return value;
    }
  };

  // 执行字段补全
  const executeComplete = () => {
    try {
      const data = JSON.parse(completeInput);
      
      if (completeMode === 'object') {
        // 处理单个对象
        if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
          const result = { ...data };
          fieldConfigs.forEach(config => {
            if (!(config.name in result)) {
              result[config.name] = convertValue(config.defaultValue, config.type);
            }
          });
          setCompleteOutput(JSON.stringify(result, null, 2));
        } else {
          throw new Error('输入必须是JSON对象格式');
        }
      } else {
        // 处理数组
        if (Array.isArray(data)) {
          const result = data.map(item => {
            if (typeof item === 'object' && item !== null) {
              const newItem = { ...item };
              fieldConfigs.forEach(config => {
                if (!(config.name in newItem)) {
                  newItem[config.name] = convertValue(config.defaultValue, config.type);
                }
              });
              return newItem;
            }
            return item;
          });
          setCompleteOutput(JSON.stringify(result, null, 2));
        } else {
          throw new Error('输入必须是JSON数组格式');
        }
      }
    } catch (error) {
      setCompleteOutput(error instanceof Error ? error.message : '补全操作失败');
    }
  };

  const tabItems = [
    { name: 'JSON格式化', content: (
      <div className="space-y-4">
        <textarea
          className="w-full h-48 p-2 border rounded"
          placeholder="请输入JSON字符串"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={formatJSON}
        >
          格式化
        </button>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {jsonOutput}
        </pre>
      </div>
    )},
    { name: '字符分割', content: (
      <div className="space-y-4">
        <div>
          <input
            type="text"
            className="border rounded px-2 py-1 mr-2"
            placeholder="分隔符"
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
          />
        </div>
        <textarea
          className="w-full h-48 p-2 border rounded"
          placeholder="请输入要分割的文本"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={splitText}
        >
          分割
        </button>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {jsonOutput}
        </pre>
      </div>
    )},
    { name: 'Cookie转JSON', content: (
      <div className="space-y-4">
        <textarea
          className="w-full h-48 p-2 border rounded"
          placeholder="请输入Cookie字符串"
          value={cookieInput}
          onChange={(e) => setCookieInput(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={cookieToJSON}
        >
          转换
        </button>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {jsonOutput}
        </pre>
      </div>
    )},
    { name: '数据转CSV', content: (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-blue-600">
            提示：请输入JSON数组格式的数据，数组中的每个对象将转换为CSV的一行。例如：
            <br />
            {`[{"name": "张三", "age": 25}, {"name": "李四", "age": 30}]`}
          </p>
        </div>
        <textarea
          className="w-full h-48 p-2 border rounded"
          placeholder="请输入JSON数组数据"
          value={csvInput}
          onChange={(e) => setCsvInput(e.target.value)}
        />
        <div className="flex space-x-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={convertToCSV}
          >
            转换
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
            onClick={downloadCSV}
            disabled={!csvOutput}
          >
            <FaDownload className="mr-2" />
            下载CSV
          </button>
        </div>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {csvOutput}
        </pre>
      </div>
    )},
    { name: '字段顺序', content: (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-blue-600">
            提示：请输入JSON对象，然后通过拖拽或点击调整字段顺序。例如：
            <br />
            {`{"id": 1, "name": "张三", "age": 25, "email": "zhangsan@example.com"}`}
          </p>
        </div>
        <textarea
          className="w-full h-32 p-2 border rounded"
          placeholder="请输入JSON对象"
          value={fieldOrderInput}
          onChange={(e) => setFieldOrderInput(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={parseFieldsFromJSON}
        >
          解析字段
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 可选字段列表 */}
          <div className="border rounded p-4">
            <h3 className="font-medium mb-2">可选字段</h3>
            <div className="space-y-2">
              {availableFields.map((field) => (
                <div
                  key={field}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer"
                  onClick={() => addField(field)}
                >
                  <span>{field}</span>
                  <span className="text-blue-500">点击添加</span>
                </div>
              ))}
            </div>
          </div>

          {/* 已选字段列表 */}
          <div className="border rounded p-4">
            <h3 className="font-medium mb-2">已选字段顺序</h3>
            <div className="space-y-2">
              {selectedFields.map((field, index) => (
                <div
                  key={field}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <span>{field}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-gray-500 hover:text-blue-500"
                      onClick={() => moveField(index, 'up')}
                      disabled={index === 0}
                    >
                      <FaArrowUp />
                    </button>
                    <button
                      className="text-gray-500 hover:text-blue-500"
                      onClick={() => moveField(index, 'down')}
                      disabled={index === selectedFields.length - 1}
                    >
                      <FaArrowDown />
                    </button>
                    <button
                      className="text-gray-500 hover:text-red-500"
                      onClick={() => removeField(field)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={reorderFields}
          disabled={selectedFields.length === 0}
        >
          重新排序
        </button>

        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {jsonOutput}
        </pre>
      </div>
    )},
    { name: '数据删除', content: (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-blue-600">
            提示：输入JSON数据，添加要删除的字段名，点击删除即可移除指定字段。
            <br />
            对象示例：{`{"id": 1, "name": "张三", "age": 25, "email": "zhangsan@example.com"}`}
            <br />
            数组示例：{`[{"id": 1, "name": "张三"}, {"id": 2, "name": "李四"}]`}
          </p>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              checked={deleteMode === 'object'}
              onChange={() => setDeleteMode('object')}
              className="mr-2"
            />
            处理单个对象
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              checked={deleteMode === 'array'}
              onChange={() => setDeleteMode('array')}
              className="mr-2"
            />
            处理数组
          </label>
        </div>

        <textarea
          className="w-full h-32 p-2 border rounded"
          placeholder={deleteMode === 'object' ? "请输入JSON对象" : "请输入JSON数组"}
          value={deleteInput}
          onChange={(e) => setDeleteInput(e.target.value)}
        />

        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="flex-1 p-2 border rounded"
            placeholder="输入要删除的字段名"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addDeleteField(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
            onClick={() => {
              const input = document.querySelector('input[placeholder="输入要删除的字段名"]') as HTMLInputElement;
              if (input) {
                addDeleteField(input.value);
                input.value = '';
              }
            }}
          >
            <FaPlus className="mr-2" />
            添加字段
          </button>
        </div>

        <div className="border rounded p-4">
          <h3 className="font-medium mb-2">要删除的字段列表</h3>
          <div className="space-y-2">
            {deleteFields.map((field, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <span>{field}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeDeleteField(index)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={executeDelete}
          disabled={deleteFields.length === 0 || !deleteInput}
        >
          执行删除
        </button>

        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {deleteOutput}
        </pre>
      </div>
    )},
    { name: '字段补全', content: (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-blue-600">
            提示：输入JSON数据，添加要补充的字段名和默认值，点击补全即可添加缺失的字段。
            <br />
            对象示例：{`{"name": "张三"}`} → {`{"name": "张三", "age": 0, "active": true}`}
            <br />
            数组示例：{`[{"name": "张三"}, {"name": "李四", "age": 30}]`}
          </p>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              checked={completeMode === 'object'}
              onChange={() => setCompleteMode('object')}
              className="mr-2"
            />
            处理单个对象
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              checked={completeMode === 'array'}
              onChange={() => setCompleteMode('array')}
              className="mr-2"
            />
            处理数组
          </label>
        </div>

        <textarea
          className="w-full h-32 p-2 border rounded"
          placeholder={completeMode === 'object' ? "请输入JSON对象" : "请输入JSON数组"}
          value={completeInput}
          onChange={(e) => setCompleteInput(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              字段名
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="字段名"
              value={newFieldName}
              onChange={(e) => setNewFieldName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              默认值
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="默认值"
              value={newFieldValue}
              onChange={(e) => setNewFieldValue(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              数据类型
            </label>
            <select
              className="w-full p-2 border rounded"
              value={newFieldType}
              onChange={(e) => setNewFieldType(e.target.value as FieldConfig['type'])}
            >
              <option value="string">字符串</option>
              <option value="number">数字</option>
              <option value="boolean">布尔值</option>
              <option value="null">空值</option>
            </select>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
            onClick={addFieldConfig}
            disabled={!newFieldName.trim()}
          >
            <FaPlus className="mr-2" />
            添加字段
          </button>
        </div>

        <div className="border rounded p-4">
          <h3 className="font-medium mb-2">字段配置列表</h3>
          <div className="space-y-2">
            {fieldConfigs.map((config, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <div>
                  <span className="font-medium">{config.name}</span>
                  <span className="mx-2 text-gray-400">|</span>
                  <span className="text-gray-600">
                    {config.type === 'string' ? `"${config.defaultValue}"` : config.defaultValue}
                  </span>
                  <span className="mx-2 text-gray-400">|</span>
                  <span className="text-gray-500">{config.type}</span>
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeFieldConfig(index)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            {fieldConfigs.length === 0 && (
              <div className="text-gray-500 text-center py-2">
                暂无字段配置，请添加字段
              </div>
            )}
          </div>
        </div>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={executeComplete}
          disabled={fieldConfigs.length === 0 || !completeInput}
        >
          执行补全
        </button>

        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {completeOutput}
        </pre>
      </div>
    )}
  ];

  return (
    <Layout title="工具集合 - 数据处理工具">
      <div className="min-h-screen bg-gray-100">
        {/* 工具选项卡 */}
        <div className="border-b bg-white">
          <div className="container mx-auto">
            <div className="flex overflow-x-auto whitespace-nowrap py-2" style={{ paddingLeft: '20px' }}>
              {tools.map((tool) => (
                <button
                  key={tool}
                  className={`px-4 py-2 text-sm font-medium ${
                    currentTool === tool
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-600 hover:text-green-600'
                  }`}
                  onClick={() => setCurrentTool(tool)}
                >
                  {tool}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 工具内容区域 */}
        <div className="container mx-auto px-4 py-6">
          {currentTool === 'BASE64编解码' && (
            <div className="space-y-6">
              {/* 原始编码 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  原始编码
                </label>
                <textarea
                  className="w-full h-32 p-3 border rounded-md bg-white"
                  placeholder="输入卡密中BASE64代码/字符"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </div>

              {/* 编码结果 */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    编码结果
                  </label>
                  <button
                    className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
                    onClick={() => {
                      if (outputText) {
                        navigator.clipboard.writeText(outputText);
                      }
                    }}
                  >
                    点击复制
                  </button>
                </div>
                <textarea
                  className="w-full h-32 p-3 border rounded-md bg-white"
                  placeholder="BASE64字符编码结果"
                  value={outputText}
                  readOnly
                />
              </div>

              {/* 解码结果 */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    解码结果
                  </label>
                  <button
                    className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
                    onClick={() => {
                      if (decodeResult) {
                        navigator.clipboard.writeText(decodeResult);
                      }
                    }}
                  >
                    点击复制
                  </button>
                </div>
                <textarea
                  className="w-full h-32 p-3 border rounded-md bg-white"
                  placeholder="BASE64字符解码结果"
                  value={decodeResult}
                  readOnly
                />
              </div>

              {/* 操作按钮 */}
              <div className="flex space-x-4">
                <button
                  className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                  onClick={encodeBase64}
                >
                  编码
                </button>
                <button
                  className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                  onClick={decodeBase64}
                >
                  解码
                </button>
              </div>

              {/* 友情提示 */}
              <div className="mt-8 p-4 bg-white rounded-md">
                <h3 className="text-red-500 font-medium mb-2">友情提示</h3>
                <p className="text-gray-600">
                  1. BASE64编解码工具，如果出现错误或者没有结果，请检查是否正确输入。
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ToolSet; 