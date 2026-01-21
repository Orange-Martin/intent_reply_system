import { useState } from 'react';
import { Search, Plus, Download, Edit2, Trash2 } from 'lucide-react';
import { IntentEditModal } from './IntentEditModal';

interface Intent {
  id: number;
  name: string;
  description: string;
  createTime: string;
  updateTime: string;
  status: 'active' | 'inactive';
}

const mockIntents: Intent[] = [
  {
    id: 1,
    name: '大护甲',
    description: '用于回复客户关于春节假期的咨询',
    createTime: '2024-01-15 10:30',
    updateTime: '2024-01-20 15:45',
    status: 'active',
  },
  {
    id: 2,
    name: '产品咨询',
    description: '客户询问产品详情和功能时使用',
    createTime: '2024-01-10 09:20',
    updateTime: '2024-01-18 14:30',
    status: 'active',
  },
  {
    id: 3,
    name: '售后服务',
    description: '处理售后问题和客户投诉',
    createTime: '2024-01-08 11:15',
    updateTime: '2024-01-19 16:20',
    status: 'active',
  },
  {
    id: 4,
    name: '价格咨询',
    description: '回复客户关于产品价格的询问',
    createTime: '2024-01-05 14:00',
    updateTime: '2024-01-17 10:10',
    status: 'inactive',
  },
];

export function IntentManagement() {
  const [intents, setIntents] = useState<Intent[]>(mockIntents);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIntent, setEditingIntent] = useState<Intent | null>(null);

  const handleEdit = (intent: Intent) => {
    setEditingIntent(intent);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingIntent(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('确定要删除这个意图配置吗？')) {
      setIntents(intents.filter(intent => intent.id !== id));
    }
  };

  const handleToggleStatus = (id: number) => {
    setIntents(intents.map(intent => {
      if (intent.id === id) {
        return {
          ...intent,
          status: intent.status === 'active' ? 'inactive' : 'active'
        };
      }
      return intent;
    }));
  };

  const filteredIntents = intents.filter(intent =>
    intent.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    intent.description.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* 筛选区域 */}
      <div className="p-[16px] border-b border-[#eee]">
        <div className="flex gap-[12px] items-center flex-wrap">
          <div className="flex gap-[12px] items-center">
            <p className="text-[12px] text-black w-[60px] text-center">意图名称</p>
            <div className="flex h-[28px] items-center px-[8px] py-[4px] rounded-[4px] border border-[#eee] w-[180px]">
              <input
                type="text"
                placeholder="请输入"
                className="flex-1 text-[12px] leading-[22px] text-[#a0a0a0] outline-none bg-transparent"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-[12px] items-center px-[16px] py-[12px]">
        <button className="bg-[#409eff] flex gap-[8px] h-[36px] items-center px-[16px] py-[4px] rounded-[4px] text-white text-[12px] hover:bg-[#66b1ff]">
          <Search className="w-4 h-4" />
          搜索
        </button>
        <button
          onClick={handleAdd}
          className="bg-[#409eff] flex gap-[8px] h-[36px] items-center px-[16px] py-[4px] rounded-[4px] text-white text-[12px] hover:bg-[#66b1ff]"
        >
          <Plus className="w-4 h-4" />
          新增意图
        </button>
        <button className="bg-[#409eff] flex gap-[8px] h-[36px] items-center px-[16px] py-[4px] rounded-[4px] text-white text-[12px] hover:bg-[#66b1ff]">
          <Download className="w-4 h-4" />
          导出
        </button>
      </div>

      {/* 数据表格 */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[#f5f5f5] sticky top-0">
            <tr>
              <th className="border border-[#eee] px-[16px] py-[12px] text-[12px] text-black text-left">意图名称</th>
              <th className="border border-[#eee] px-[16px] py-[12px] text-[12px] text-black text-left">描述</th>
              <th className="border border-[#eee] px-[16px] py-[12px] text-[12px] text-black text-center w-[150px]">创建时间</th>
              <th className="border border-[#eee] px-[16px] py-[12px] text-[12px] text-black text-center w-[150px]">更新时间</th>
              <th className="border border-[#eee] px-[16px] py-[12px] text-[12px] text-black text-center w-[80px]">状态</th>
              <th className="border border-[#eee] px-[16px] py-[12px] text-[12px] text-black text-center w-[150px]">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredIntents.map((intent) => (
              <tr key={intent.id} className="hover:bg-[#f5f5f5]">
                <td className="border border-[#eee] px-[16px] py-[12px] text-[12px] text-black">{intent.name}</td>
                <td className="border border-[#eee] px-[16px] py-[12px] text-[12px] text-[#666]">{intent.description}</td>
                <td className="border border-[#eee] px-[16px] py-[12px] text-[12px] text-[#666] text-center">{intent.createTime}</td>
                <td className="border border-[#eee] px-[16px] py-[12px] text-[12px] text-[#666] text-center">{intent.updateTime}</td>
                <td className="border border-[#eee] px-[16px] py-[12px] text-center">
                  <span className={`inline-block px-[8px] py-[2px] rounded-[4px] text-[12px] ${intent.status === 'active' ? 'bg-[#e6f7ff] text-[#1890ff]' : 'bg-[#f5f5f5] text-[#999]'}`}>
                    {intent.status === 'active' ? '启用' : '禁用'}
                  </span>
                </td>
                <td className="border border-[#eee] px-[16px] py-[12px] text-center">
                  <div className="flex gap-[8px] justify-center">
                    <button
                      onClick={() => handleToggleStatus(intent.id)}
                      className={`${
                        intent.status === 'active' ? 'text-[#f56c6c] hover:text-[#f78989]' : 'text-[#67c23a] hover:text-[#85ce61]'
                      } text-[12px]`}
                    >
                      {intent.status === 'active' ? '禁用' : '启用'}
                    </button>
                    <button
                      onClick={() => handleEdit(intent)}
                      className="text-[#409eff] hover:text-[#66b1ff] text-[12px]"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => handleDelete(intent.id)}
                      className="text-[#f56c6c] hover:text-[#f78989] text-[12px]"
                    >
                      删除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      <div className="flex gap-[8px] h-[72px] items-center justify-end px-[20px] py-[16px] border-t border-[#eee]">
        <p className="text-[#a0a0a0] text-[12px]">共 {filteredIntents.length} 条</p>
        <button className="bg-[#eee] flex items-center justify-center p-[6px] rounded-[4px] hover:bg-[#ddd]">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
            <path d="M12 6L8 10L12 14" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </button>
        <button className="bg-[#409eff] flex items-center justify-center p-[5px] rounded-[4px] text-white text-[14px] w-[32px] h-[32px]">1</button>
        <button className="bg-[#eee] flex items-center justify-center p-[5px] rounded-[4px] text-black text-[14px] w-[32px] h-[32px] hover:bg-[#ddd]">2</button>
        <button className="bg-[#eee] flex items-center justify-center p-[5px] rounded-[4px] text-black text-[14px] w-[32px] h-[32px] hover:bg-[#ddd]">3</button>
        <button className="bg-[#eee] flex items-center justify-center p-[6px] rounded-[4px] hover:bg-[#ddd]">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
            <path d="M8 6L12 10L8 14" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

      {/* 编辑弹窗 */}
      {isModalOpen && (
        <IntentEditModal
          intent={editingIntent}
          onClose={() => setIsModalOpen(false)}
          onSave={(data) => {
            console.log('保存数据:', data);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
