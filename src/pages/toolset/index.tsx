import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { FaCopy } from 'react-icons/fa';

const ToolSet: React.FC = () => {
  const [activeTab, setActiveTab] = useState('2fa');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [decodedOutput, setDecodedOutput] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copyStatus, setCopyStatus] = useState({ input: false, encoded: false, decoded: false });

  const tools = [
    { id: '2fa', name: '2FA验证码', description: '验证码生成与验证工具' },
    { id: 'base64', name: 'BASE64编码', description: 'BASE64编码和解码工具' },
    { id: 'json', name: 'JSON格式化', description: 'JSON数据格式化工具' },
    { id: 'split', name: '字符分割', description: '文本分割处理工具' },
    { id: 'csv', name: '数据转CSV', description: '数据转换CSV格式工具' },
    { id: 'order', name: '字段顺序', description: '调整数据字段顺序工具' },
    { id: 'filter', name: '数据剔除', description: '数据筛选与剔除工具' },
    { id: 'complete', name: '字段补全', description: '数据字段补全工具' },
    { id: 'cookie', name: 'Cookie转JSON', description: 'Cookie转JSON格式工具' }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGenerating && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsGenerating(false);
      setCountdown(30);
      setOutput('');
    }
    return () => clearInterval(timer);
  }, [isGenerating, countdown]);

  const generateCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    return code;
  };

  const handleProcess = () => {
    if (!input.trim() && activeTab === '2fa') {
      setIsGenerating(true);
      setCountdown(30);
      setOutput(generateCode());
      return;
    }

    if (!input.trim()) return;

    let result = '';
    let decodedResult = '';
    switch (activeTab) {
      case '2fa':
        if (input.length === 6 && /^\d+$/.test(input)) {
          result = input === output ? '验证成功' : '验证失败';
        } else {
          result = '请输入6位数字验证码';
        }
        break;
      case 'base64':
        try {
          result = btoa(input);
          try {
            decodedResult = atob(result);
          } catch {
            decodedResult = '解码失败';
          }
        } catch (e) {
          result = '编码失败';
          decodedResult = '';
        }
        break;
      case 'json':
        try {
          result = JSON.stringify(JSON.parse(input), null, 2);
        } catch (e) {
          result = '无效的JSON格式';
        }
        break;
      default:
        result = '功能开发中...';
    }

    setOutput(result);
    setDecodedOutput(decodedResult);
  };

  const handleCopy = async (text: string, type: 'input' | 'encoded' | 'decoded') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus(prev => ({ ...prev, [type]: true }));
      setTimeout(() => {
        setCopyStatus(prev => ({ ...prev, [type]: false }));
      }, 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  const renderToolContent = () => {
    const is2FA = activeTab === '2fa';
    const isBase64 = activeTab === 'base64';

    return (
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">{tools.find(t => t.id === activeTab)?.description}</p>
          {is2FA && (
            <div className="text-sm text-gray-500">
              {isGenerating ? (
                <p>验证码有效期剩余 {countdown} 秒</p>
              ) : (
                <p>点击"生成验证码"按钮获取6位数字验证码</p>
              )}
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">输入数据</label>
            <div className="relative">
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={6}
                placeholder="请输入需要处理的内容"
              />
              {input && (
                <button
                  onClick={() => handleCopy(input, 'input')}
                  className="absolute right-2 top-2 p-2 text-gray-500 hover:text-primary transition-colors"
                  title="复制输入内容"
                >
                  <FaCopy />
                  {copyStatus.input && (
                    <span className="absolute -top-2 -right-2 text-xs text-green-500">✓</span>
                  )}
                </button>
              )}
            </div>
          </div>

          <button
            className="w-full btn btn-primary py-3 transition-all duration-200 hover:shadow-lg"
            onClick={handleProcess}
          >
            {activeTab === 'base64' ? '编码/解码' : '处理数据'}
          </button>

          {activeTab === 'base64' ? (
            <>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">编码结果</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 font-mono"
                  value={output}
                  readOnly
                  rows={4}
                />
                {output && (
                  <button
                    onClick={() => handleCopy(output, 'encoded')}
                    className="absolute right-2 top-2 p-2 text-gray-500 hover:text-primary transition-colors"
                    title="复制编码结果"
                  >
                    <FaCopy />
                    {copyStatus.encoded && (
                      <span className="absolute -top-2 -right-2 text-xs text-green-500">✓</span>
                    )}
                  </button>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">解码结果</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 font-mono"
                  value={decodedOutput}
                  readOnly
                  rows={4}
                />
                {decodedOutput && (
                  <button
                    onClick={() => handleCopy(decodedOutput, 'decoded')}
                    className="absolute right-2 top-2 p-2 text-gray-500 hover:text-primary transition-colors"
                    title="复制解码结果"
                  >
                    <FaCopy />
                    {copyStatus.decoded && (
                      <span className="absolute -top-2 -right-2 text-xs text-green-500">✓</span>
                    )}
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">输出结果</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 font-mono"
                value={output}
                readOnly
                rows={6}
              />
              {output && (
                <button
                  onClick={() => handleCopy(output, 'encoded')}
                  className="absolute right-2 top-2 p-2 text-gray-500 hover:text-primary transition-colors"
                  title="复制结果"
                >
                  <FaCopy />
                  {copyStatus.encoded && (
                    <span className="absolute -top-2 -right-2 text-xs text-green-500">✓</span>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Layout title="工具集合 - 账户商城" description="实用的在线工具集合">
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold text-dark mb-8">工具集合</h1>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex overflow-x-auto" aria-label="Tabs">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTab(tool.id)}
                  className={`
                    whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-all duration-200
                    ${activeTab === tool.id
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'}
                  `}
                >
                  {tool.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {renderToolContent()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ToolSet;