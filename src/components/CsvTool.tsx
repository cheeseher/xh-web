import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa';

const CsvTool: React.FC = () => {
  const [delimiter, setDelimiter] = useState('');
  const [csvHeader, setCsvHeader] = useState('');
  const [inputText, setInputText] = useState('');

  // 导出CSV函数
  const handleExportCsv = () => {
    try {
      if (!inputText || !delimiter || !csvHeader) {
        alert('请填写完整信息');
        return;
      }

      // 处理CSV表头
      const headers = csvHeader.split(/[,\s]+/).filter(Boolean);
      
      // 处理输入数据
      const lines = inputText.split('\n').filter(line => line.trim());
      
      // 创建CSV内容
      const csvContent = [
        // 添加表头
        headers.join(','),
        // 处理每行数据
        ...lines.map(line => {
          const parts = line.split(delimiter).filter(Boolean);
          // 确保每行的列数与表头一致
          while (parts.length < headers.length) {
            parts.push('');
          }
          return parts.join(',');
        })
      ].join('\n');

      // 创建Blob对象
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      
      // 创建下载链接
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'export.csv';
      
      // 触发下载
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      alert('转换失败，请检查输入是否正确');
    }
  };

  return (
    <div className="space-y-4">
      {/* 分隔符 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            分割符
          </label>
        </div>
        <input
          type="text"
          placeholder="----"
          className="w-full px-4 py-[10.5px] border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          value={delimiter}
          onChange={(e) => setDelimiter(e.target.value)}
        />
      </div>

      {/* CSV表头 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            CSV表头
          </label>
        </div>
        <input
          type="text"
          placeholder="CSV表头 示例: 账号 密码 辅助 (空格分割)"
          className="w-full px-4 py-[10.5px] border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          value={csvHeader}
          onChange={(e) => setCsvHeader(e.target.value)}
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
          className="w-full px-4 py-[10.5px] border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent h-32 resize-none"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      {/* 操作按钮 */}
      <div className="flex">
        <button
          onClick={handleExportCsv}
          className="py-[10.5px] px-6 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center"
        >
          <FaDownload className="mr-2" />
          导出CSV
        </button>
      </div>

      {/* 使用提示 */}
      <div className="mt-6 bg-[#009688]/5 border border-[#009688]/20 rounded-lg p-4">
        <h3 className="text-gray-800 font-medium mb-2">使用提示</h3>
        <ol className="text-sm text-gray-700 list-decimal list-inside space-y-2">
          <li>分隔符为每个字段间分割字符串</li>
          <li>数据转CSV，CSV 表头字段必须要和卡密字段对应</li>
          <li>数据转CSV，将卡密转换成CSV（EXCEL）格式</li>
        </ol>
      </div>
    </div>
  );
};

export default CsvTool; 