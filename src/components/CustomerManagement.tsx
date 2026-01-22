import { useState } from 'react';
import { Search, FileText, Eye } from 'lucide-react';
import { PolicyReviewModal } from './PolicyReviewModal';

interface Customer {
  id: number;
  name: string;
  phone: string;
  idCard: string;
  tags: string[];
  source: string;
}

const mockCustomers: Customer[] = [
  {
    id: 1,
    name: '黄钰山',
    phone: '12866627428',
    idCard: '已绑定有推荐位权益',
    tags: ['已买'],
    source: '小程序-小助手开启1次0117',
  },
  {
    id: 2,
    name: '冯雅',
    phone: '9468002749',
    idCard: '小程序-小红包开在此0117',
    tags: [],
    source: '已买头',
  },
  {
    id: 3,
    name: '洗安',
    phone: '4443716861',
    idCard: '小程序-超级服务快来用17',
    tags: [],
    source: '已买头',
  },
];

export function CustomerManagement() {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [isPolicyReviewOpen, setIsPolicyReviewOpen] = useState(false);

  const tabs = [
    { key: 'all', label: '全部', count: 3 },
    { key: 'prospect', label: '下单行为', count: 0 },
    { key: 'intention', label: '购买行为', count: 0 },
    { key: 'purchase', label: '消费行为', count: 0 },
    { key: 'blacklist', label: '黑白行为', count: 0 },
    { key: 'customer', label: '客户档案', count: 0 },
    { key: 'contact', label: '互动信息', count: 0 },
    { key: 'message', label: '留言管理', count: 0 },
  ];

  const secondaryTabs = [
    { key: 'customer_profile', label: '客户档案概览' },
    { key: 'status', label: '投保记录' },
    { key: 'claims', label: '理赔记录' },
    { key: 'preservation', label: '保全记录' },
    { key: 'products', label: '线下租赁记录' },
    { key: 'interaction', label: '互动情况记录' },
    { key: 'tags', label: '私有标签记录' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f5f5f5]">
      {/* 顶部搜索区 */}
      <div className="bg-white px-[24px] py-[16px] border-b border-[#eee]">
        <div className="flex items-center gap-[12px]">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="请输入CRM用户ID/姓名"
            className="flex-1 h-[36px] px-[12px] border border-[#eee] rounded-[4px] text-[12px] outline-none focus:border-[#409eff]"
          />
          <button className="bg-[#409eff] h-[36px] px-[24px] rounded-[4px] text-white text-[12px] hover:bg-[#66b1ff]">
            点击搜索或编辑
          </button>
        </div>
        <div className="mt-[12px] text-[12px] text-[#f56c6c]">
          仅对该用户的有保单类业务，仅代表有效统计信息
        </div>
      </div>

      {/* 标签页 */}
      <div className="bg-white border-b border-[#eee]">
        <div className="flex items-center px-[24px]">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key)}
              className={`px-[20px] py-[14px] text-[12px] border-b-2 transition-colors ${
                selectedTab === tab.key
                  ? 'border-[#409eff] text-[#409eff]'
                  : 'border-transparent text-[#666] hover:text-black'
              }`}
            >
              {tab.label}
              {tab.count > 0 && <span className="ml-1">({tab.count})</span>}
            </button>
          ))}
        </div>
      </div>

      {/* 统计信息 */}
      <div className="bg-white mx-[24px] mt-[16px] p-[16px] rounded-[4px] border border-[#eee]">
        <div className="flex items-center gap-[48px]">
          <div>
            <div className="text-[12px] text-[#666] mb-[4px]">家庭成员人次数：小张、成人、老人</div>
          </div>
          <div>
            <div className="text-[12px] text-[#666] mb-[4px]">家庭成员人：5</div>
          </div>
          <div>
            <div className="text-[12px] text-[#666] mb-[4px]">家庭人均保额：3124.16</div>
          </div>
        </div>
      </div>

      {/* 生命周期 */}
      <div className="bg-white mx-[24px] mt-[16px] p-[16px] rounded-[4px] border border-[#eee]">
        <h3 className="text-[14px] text-black mb-[12px]">生命周期</h3>
        <div className="space-y-[8px]">
          <div className="flex items-start gap-[12px]">
            <div className="text-[12px] text-[#666] w-[120px]">主险种号：京东：</div>
            <div className="flex-1 text-[12px] text-black">-</div>
          </div>
          <div className="flex items-start gap-[12px]">
            <div className="text-[12px] text-[#666] w-[120px]">受保障家长保值：- 元</div>
            <div className="flex-1 text-[12px] text-black">社保障家属比较值：- 元</div>
          </div>
        </div>
      </div>

      {/* 购买偏好 */}
      <div className="bg-white mx-[24px] mt-[16px] p-[16px] rounded-[4px] border border-[#eee]">
        <h3 className="text-[14px] text-black mb-[12px]">购买偏好</h3>
        <div className="text-[12px] text-[#666] mb-[8px]">购买案例分类次数：-</div>
      </div>

      {/* 二级标签页 */}
      <div className="bg-white mx-[24px] mt-[16px] border border-[#eee] rounded-[4px] overflow-hidden">
        <div className="flex items-center border-b border-[#eee] bg-[#fafafa]">
          {secondaryTabs.map((tab) => (
            <button
              key={tab.key}
              className="px-[20px] py-[12px] text-[12px] text-[#666] hover:text-black hover:bg-[#f0f0f0]"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 小细致信息展示 */}
        <div className="p-[16px]">
          <div className="bg-[#f9f9f9] p-[12px] rounded-[4px] mb-[12px]">
            <div className="text-[12px] text-black mb-[8px]">
              最近游览时间时间：2024-05-09 23:55:00
            </div>
          </div>

          {/* 投保情况 */}
          <div className="mb-[16px]">
            <h4 className="text-[12px] text-black mb-[8px]">投保情况</h4>
            <table className="w-full border border-[#eee]">
              <thead className="bg-[#f5f5f5]">
                <tr>
                  <th className="border border-[#eee] px-[12px] py-[8px] text-[12px] text-black text-left">投保对象</th>
                  <th className="border border-[#eee] px-[12px] py-[8px] text-[12px] text-black text-left">年份</th>
                  <th className="border border-[#eee] px-[12px] py-[8px] text-[12px] text-black text-left">年收入（万）</th>
                  <th className="border border-[#eee] px-[12px] py-[8px] text-[12px] text-black text-left">社保类型</th>
                  <th className="border border-[#eee] px-[12px] py-[8px] text-[12px] text-black text-left">性别</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-[#eee] px-[12px] py-[8px] text-[12px] text-[#666]" colSpan={5}>
                    -
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 医疗健康历史 */}
          <div>
            <h4 className="text-[12px] text-black mb-[8px]">医疗健康历史</h4>
            <table className="w-full border border-[#eee]">
              <thead className="bg-[#f5f5f5]">
                <tr>
                  <th className="border border-[#eee] px-[12px] py-[8px] text-[12px] text-black text-left">对象</th>
                  <th className="border border-[#eee] px-[12px] py-[8px] text-[12px] text-black text-left">产品</th>
                  <th className="border border-[#eee] px-[12px] py-[8px] text-[12px] text-black text-left">课产品</th>
                  <th className="border border-[#eee] px-[12px] py-[8px] text-[12px] text-black text-left">课产投资</th>
                  <th className="border border-[#eee] px-[12px] py-[8px] text-[12px] text-black text-left">任期开始时间</th>
                  <th className="border border-[#eee] px-[12px] py-[8px] text-[12px] text-black text-left">主体保费</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-[#eee] px-[12px] py-[8px] text-[12px] text-[#666]" colSpan={6}>
                    -
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 保单检视按钮 */}
      <div className="bg-white mx-[24px] mt-[16px] mb-[24px] p-[16px] rounded-[4px] border border-[#eee]">
        <button
          onClick={() => setIsPolicyReviewOpen(true)}
          className="bg-[#409eff] flex items-center gap-[8px] h-[40px] px-[24px] rounded-[4px] text-white text-[14px] hover:bg-[#66b1ff]"
        >
          <FileText className="w-5 h-5" />
          保单检视
        </button>
      </div>

      {/* 保单检视弹窗 */}
      {isPolicyReviewOpen && (
        <PolicyReviewModal onClose={() => setIsPolicyReviewOpen(false)} />
      )}
    </div>
  );
}