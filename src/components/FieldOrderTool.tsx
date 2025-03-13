import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';

const FieldOrderTool: React.FC = () => {
  const [originalDelimiter, setOriginalDelimiter] = useState('');
  const [inputText, setInputText] = useState('');
  const [newOrder, setNewOrder] = useState('');
  const [outputText, setOutputText] = useState('');

  // 转换函数
  const handleConvert = () => {
    try {
      if (!inputText || !originalDelimiter || !newOrder) {
        setOutputText('请填写完整信息');
        return;
      }

      // 验证新顺序格式
      const orderPattern = /^(\d+\s*)+$/;
      if (!orderPattern.test(newOrder)) {
        setOutputText('新索引顺序格式不正确，请使用数字和空格');
        return;
      }

      // 处理新顺序
      const orderIndexes = newOrder.split(/\s+/).map(num => parseInt(num) - 1);

      // 处理输入数据
      const lines = inputText.split('\n').filter(line => line.trim());
      
      // 处理每行数据
      const result = lines.map(line => {
        const fields = line.split(originalDelimiter);
        
        // 按新顺序重排字段
        const newFields = orderIndexes.map(index => {
          // 如果索引存在则返回对应字段，否则返回空字符串
          return index >= 0 && index < fields.length ? fields[index].trim() : '';
        });
        
        return newFields.join(originalDelimiter);
      });

      setOutputText(result.join('\n'));
    } catch (error) {
      setOutputText('转换失败，请检查输入是否正确');
    }
  };

  // 复制函数
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* 原分隔符 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            原分割符
          </label>
        </div>
        <input
          type="text"
          placeholder="----"
          className="w-full px-4 h-[42px] border rounded-md focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688] transition-all"
          value={originalDelimiter}
          onChange={(e) => setOriginalDelimiter(e.target.value)}
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
          className="w-full px-4 py-[10.5px] border rounded-md focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688] h-32 resize-none transition-all"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      {/* 新索引顺序 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            新索引顺序
          </label>
        </div>
        <input
          type="text"
          placeholder="输入新索引顺序 EXP (0 2 1 3) 空格间隔"
          className="w-full px-4 h-[42px] border rounded-md focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688] transition-all"
          value={newOrder}
          onChange={(e) => setNewOrder(e.target.value)}
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
            className="text-[#009688] hover:text-[#00796b] text-sm transition-all flex items-center"
          >
            <FaCopy className="mr-1" />
            点击复制
          </button>
        </div>
        <textarea
          placeholder="新卡密"
          className="w-full px-4 py-[10.5px] border rounded-md bg-gray-50 h-32 resize-none"
          value={outputText}
          readOnly
        />
      </div>

      {/* 操作按钮 */}
      <div className="flex">
        <button
          onClick={handleConvert}
          className="h-[42px] px-6 bg-[#009688] text-white rounded-md hover:bg-[#00796b] transition-all"
        >
          格式化
        </button>
      </div>

      {/* 友情提示 */}
      <div className="mt-6 bg-[#009688]/5 p-4 rounded-md border border-[#009688]/20">
        <h3 className="text-gray-800 font-medium mb-2">友情提示</h3>
        <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
          <li>分隔符为每个字段间分割字符串。</li>
          <li>字段索引从0开始，比如两个字段，就是：01，三个就是：012。</li>
          <li>如果指定除第二个字段外的所有字段，例如3个字段想删除第二个字段 就在新索引顺序输入：02。</li>
          <li>字段顺序工具，目的是将原有字段顺序进行调整，以及只保留指定字段。</li>
        </ul>
      </div>
    </div>
  );
};

export default FieldOrderTool; 