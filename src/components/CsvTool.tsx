import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa';

const CsvTool: React.FC = () => {
  const [delimiter, setDelimiter] = useState(',');
  const [csvHeader, setCsvHeader] = useState('');
  const [inputText, setInputText] = useState('');
  const [csvData, setCsvData] = useState<string[][]>([]);

  // 处理CSV转换
  const handleConvert = () => {
    try {
      if (!inputText.trim()) {
        return;
      }

      // 分割行
      const lines = inputText.trim().split('\n');
      
      // 处理表头
      let headers: string[] = [];
      if (csvHeader.trim()) {
        headers = csvHeader.split(delimiter).map(h => h.trim());
      } else if (lines.length > 0) {
        // 如果没有提供表头，使用第一行作为表头
        headers = lines[0].split(delimiter).map(h => h.trim());
        lines.shift(); // 移除第一行
      }

      // 处理数据行
      const data = lines.map(line => {
        return line.split(delimiter).map(cell => cell.trim());
      });

      // 设置CSV数据
      setCsvData([headers, ...data]);
    } catch (error) {
      console.error('CSV转换失败', error);
    }
  };

  // 导出CSV文件
  const handleExport = () => {
    if (csvData.length === 0) {
      return;
    }

    // 创建CSV内容
    const csvContent = csvData.map(row => row.join(delimiter)).join('\n');
    
    // 创建Blob对象
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // 创建下载链接
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'exported_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* 分隔符 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            分隔符
          </label>
        </div>
        <input
          type="text"
          placeholder="输入分隔符，默认为逗号"
          className="w-full px-4 h-[42px] border rounded-md focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688] transition-all"
          value={delimiter}
          onChange={(e) => setDelimiter(e.target.value || ',')}
        />
      </div>

      {/* CSV表头 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            CSV表头 (可选)
          </label>
        </div>
        <input
          type="text"
          placeholder="CSV表头 示例：账号 密码 辅助（空格分割）"
          className="w-full px-4 h-[42px] border rounded-md focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688] transition-all"
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
          placeholder="输入需要转换为CSV的文本，每行一条记录"
          className="w-full px-4 py-[10.5px] border rounded-md focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688] h-32 resize-none transition-all"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      {/* 预览表格 */}
      {csvData.length > 0 && (
        <div className="mb-6 overflow-x-auto">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              CSV预览
            </label>
          </div>
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-50">
              <tr>
                {csvData[0].map((header, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {csvData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 操作按钮 */}
      <div className="flex space-x-4">
        <button
          onClick={handleConvert}
          className="h-[42px] px-6 bg-[#009688] text-white rounded-md hover:bg-[#00796b] transition-all"
        >
          转换
        </button>
        {csvData.length > 0 && (
          <button
            onClick={handleExport}
            className="h-[42px] px-6 bg-[#009688] text-white rounded-md hover:bg-[#00796b] transition-all flex items-center"
          >
            <FaDownload className="mr-2" />
            导出CSV
          </button>
        )}
      </div>

      {/* 友情提示 */}
      <div className="mt-6 bg-[#009688]/5 p-4 rounded-md border border-[#009688]/20">
        <h3 className="text-gray-800 font-medium mb-2">友情提示</h3>
        <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
          <li>分隔符默认为逗号，可根据需要修改。</li>
          <li>CSV表头可选，如不提供则使用第一行数据作为表头。</li>
          <li>转换后可预览CSV数据，并可导出为CSV文件。</li>
          <li>确保输入数据的每行字段数量一致，以避免转换错误。</li>
        </ul>
      </div>
    </div>
  );
};

export default CsvTool; 