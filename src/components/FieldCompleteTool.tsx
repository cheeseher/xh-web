import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';

const FieldCompleteTool: React.FC = () => {
  const [delimiter, setDelimiter] = useState('');
  const [inputText, setInputText] = useState('');
  const [insertPosition, setInsertPosition] = useState('');
  const [insertContent, setInsertContent] = useState('');
  const [outputText, setOutputText] = useState('');

  // 补全函数
  const handleComplete = () => {
    try {
      if (!inputText || !delimiter || !insertPosition) {
        setOutputText('请填写完整信息');
        return;
      }

      // 验证插入位置格式
      const positionPattern = /^[0-9\s]+$/;
      if (!positionPattern.test(insertPosition)) {
        setOutputText('插入位置格式不正确，请使用数字和空格');
        return;
      }

      // 处理插入位置
      const positions = insertPosition.split(/\s+/).map(num => parseInt(num) - 1);

      // 处理输入数据
      const lines = inputText.split('\n').filter(line => line.trim());
      
      // 处理每行数据
      const result = lines.map(line => {
        const fields = line.split(delimiter);
        
        // 在指定位置插入内容
        positions.forEach(pos => {
          // 如果位置超出数组长度，先用空字符串填充
          while (fields.length <= pos) {
            fields.push('');
          }
          // 在指定位置插入内容
          fields[pos] = insertContent || fields[pos];
        });
        
        return fields.join(delimiter);
      });

      setOutputText(result.join('\n'));
    } catch (error) {
      setOutputText('处理失败，请检查输入是否正确');
    }
  };

  // 复制函数
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* 分隔符 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            请填写地字段
          </label>
        </div>
        <input
          type="text"
          placeholder="----"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          value={delimiter}
          onChange={(e) => setDelimiter(e.target.value)}
        />
      </div>

      {/* 平台卡密 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            平台卡密
          </label>
        </div>
        <textarea
          placeholder="输入平台卡密字符"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent h-32 resize-none"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      {/* 插入位置 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            插入位置
          </label>
        </div>
        <input
          type="text"
          placeholder="输入添加位置,(0 1 2 3) 空格间隔"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          value={insertPosition}
          onChange={(e) => setInsertPosition(e.target.value)}
        />
      </div>

      {/* 插入内容 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            插入内容
          </label>
        </div>
        <input
          type="text"
          placeholder="插入字段内容"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          value={insertContent}
          onChange={(e) => setInsertContent(e.target.value)}
        />
      </div>

      {/* 转换结果 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            转换结果
          </label>
          <button
            onClick={() => handleCopy(outputText)}
            className="text-primary hover:text-primary-dark text-sm flex items-center"
          >
            <FaCopy className="mr-1" />
            点击复制
          </button>
        </div>
        <textarea
          placeholder="新卡密"
          className="w-full px-4 py-2 border rounded-md bg-gray-50 h-32 resize-none"
          value={outputText}
          readOnly
        />
      </div>

      {/* 操作按钮 */}
      <div className="flex space-x-4">
        <button
          onClick={handleComplete}
          className="flex-1 py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          补全字段
        </button>
      </div>

      {/* 友情提示 */}
      <div className="mt-6 bg-yellow-50 p-4 rounded-md">
        <h3 className="text-yellow-800 font-medium mb-2">友情提示</h3>
        <ul className="text-sm text-yellow-700 list-disc list-inside space-y-1">
          <li>分隔符为每个字段间分割字符串。</li>
          <li>字段索引从0开始，比如两个字段，就是：01，三个就是：012。</li>
          <li>如果想删除某一字段，例如3个字段想删除第二个字段 就在新索引顺序输入：02。</li>
          <li>字段顺序工具，目的是将原有字段顺序进行调整，以及只保留指定字段。</li>
        </ul>
      </div>
    </div>
  );
};

export default FieldCompleteTool; 