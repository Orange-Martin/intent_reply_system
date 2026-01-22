import { useState } from 'react';
import { X, Plus, Trash2, Sparkles } from 'lucide-react';

interface PolicySection {
  id: string;
  type: 'greeting' | 'members' | 'coverage' | 'suggestions';
  title: string;
  content: string;
}

interface InsuranceProduct {
  id: string;
  name: string;
  enabled: boolean;
}

interface OfflinePolicy {
  id: string;
  policyHolder: string;
  insuredPerson: string;
  productName: string;
  premium: string;
  coverageAmount: string;
  startDate: string;
  paymentYears: string;
}

export function PolicyReviewModal({ onClose }: { onClose: () => void }) {
  const [sections, setSections] = useState<PolicySection[]>([
    {
      id: '1',
      type: 'greeting',
      title: '开场问候语',
      content: '尊敬的黄钰山先生，感谢您一直以来的信任与支持。新的一年已经到来，我们为您准备了专属的年度保单检视报告，帮助您更好地了解家庭保障情况。',
    },
    {
      id: '2',
      type: 'members',
      title: '已投保成员',
      content: '您的家庭已为以下成员配置保障：\n• 黄钰山（本人）\n• 配偶\n• 子女',
    },
    {
      id: '3',
      type: 'coverage',
      title: '已拥有保障情况',
      content: '经过梳理，您的家庭目前已经配置了以下保障类型，为家庭筑起了一道安全防线。',
    },
    {
      id: '4',
      type: 'suggestions',
      title: '保障建议',
      content: '基于您当前的保障情况，我们建议您关注以下方面：\n1. 补充医疗保障，提升保额至年收入的5-10倍\n2. 考虑为子女配置教育金储备\n3. 完善家庭成员的意外保障',
    },
  ]);

  const [insuranceProducts, setInsuranceProducts] = useState<InsuranceProduct[]>([
    { id: '1', name: '重疾险', enabled: true },
    { id: '2', name: '医疗险', enabled: true },
    { id: '3', name: '意外险', enabled: false },
    { id: '4', name: '寿险', enabled: false },
    { id: '5', name: '年金险', enabled: false },
    { id: '6', name: '终身寿险', enabled: false },
    { id: '7', name: '养老金', enabled: false },
  ]);

  const [offlinePolicies, setOfflinePolicies] = useState<OfflinePolicy[]>([]);
  const [isAddingOfflinePolicy, setIsAddingOfflinePolicy] = useState(false);
  const [editingPolicyId, setEditingPolicyId] = useState<string | null>(null);
  const [newOfflinePolicy, setNewOfflinePolicy] = useState<Partial<OfflinePolicy>>({});

  const [activeTab, setActiveTab] = useState<'content' | 'products' | 'offline'>('content');

  const handleSectionEdit = (id: string, newContent: string) => {
    setSections(sections.map(s => s.id === id ? { ...s, content: newContent } : s));
  };

  const handleToggleProduct = (id: string) => {
    setInsuranceProducts(insuranceProducts.map(p => 
      p.id === id ? { ...p, enabled: !p.enabled } : p
    ));
  };

  const handleAddOfflinePolicy = () => {
    if (!newOfflinePolicy.policyHolder || !newOfflinePolicy.productName) {
      alert('请填写投保人和产品名称');
      return;
    }

    if (editingPolicyId) {
      // Edit existing policy
      setOfflinePolicies(offlinePolicies.map(p => 
        p.id === editingPolicyId 
          ? { ...p, ...newOfflinePolicy } as OfflinePolicy 
          : p
      ));
      setEditingPolicyId(null);
    } else {
      // Add new policy
      const policy: OfflinePolicy = {
        id: Date.now().toString(),
        policyHolder: newOfflinePolicy.policyHolder || '',
        insuredPerson: newOfflinePolicy.insuredPerson || '',
        productName: newOfflinePolicy.productName || '',
        premium: newOfflinePolicy.premium || '',
        coverageAmount: newOfflinePolicy.coverageAmount || '',
        startDate: newOfflinePolicy.startDate || '',
        paymentYears: newOfflinePolicy.paymentYears || '',
      };
      setOfflinePolicies([...offlinePolicies, policy]);
    }
    setNewOfflinePolicy({});
    setIsAddingOfflinePolicy(false);
  };

  const handleEditOfflinePolicy = (policy: OfflinePolicy) => {
    setNewOfflinePolicy(policy);
    setEditingPolicyId(policy.id);
    setIsAddingOfflinePolicy(true);
  };

  const handleDeleteOfflinePolicy = (id: string) => {
    if (window.confirm('是否删除该保单？')) {
      setOfflinePolicies(offlinePolicies.filter(p => p.id !== id));
    }
  };

  const handleAIGenerate = (sectionId: string) => {
    // AI生成建议的模拟
    const aiSuggestion = `基于您当前的保障情况分析，AI为您生成以下建议：\n1. 您的重疾保障额度充足，建议每年复核一次\n2. 医疗险保额较高，建议关注续保条款\n3. 建议补充意外险，提升家庭抗风险能力\n4. 可考虑配置定期寿险，覆盖家庭负债和未来支出`;
    
    handleSectionEdit(sectionId, aiSuggestion);
  };

  const handleGenerateImage = () => {
    alert('生成保单检视长图功能开发中...');
  };

  const handleGenerateLink = () => {
    alert('生成链接功能开发中...');
  };

  const handleSyncPolicies = () => {
    alert('同步已有保单功能开发中...');
  };

  const handleBatchImport = () => {
    alert('批量导入线下保单功能开发中...');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div 
        className="bg-white rounded-[8px] flex shadow-xl overflow-hidden"
        style={{ width: '1400px', height: '85vh', maxHeight: '900px' }}
      >
        {/* 左侧预览区 */}
        <div className="bg-[#f5f5f5] flex flex-col border-r border-[#eee] shrink-0" style={{ width: '320px', flex: '0 0 320px' }}>
          <div className="px-[24px] py-[16px] border-b border-[#eee] bg-white">
            <h3 className="text-[14px] text-black font-medium">实时预览</h3>
            <p className="text-[12px] text-[#999] mt-[4px]">保单检视长图效果</p>
          </div>
          <div className="flex-1 overflow-auto p-[20px] flex justify-center">
            <div 
              className="w-[375px] bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-[12px] overflow-hidden shadow-lg h-fit origin-top"
              style={{ transform: 'scale(0.75)' }}
            >
              {/* 标题区 */}
              <div className="p-[24px] text-white">
                <div className="text-[20px] mb-[8px]">2025年年度保单检视报告</div>
                <div className="text-[12px] opacity-80">为您量身定制</div>
              </div>

              {/* 内容区 */}
              <div className="bg-white p-[20px] rounded-t-[12px]">
                {/* 1. 开场问候语 */}
                <div className="mb-[16px] p-[16px] bg-[#f9f9f9] rounded-[12px] border border-[#f0f0f0]">
                  <div className="text-[13px] text-[#444] leading-[1.8] whitespace-pre-line font-medium">
                    {sections.find(s => s.type === 'greeting')?.content}
                  </div>
                </div>

                {/* 2. 已投保成员 */}
                <div className="mb-[20px]">
                  <div className="text-[15px] text-[#333] mb-[10px] flex items-center gap-[6px] font-bold">
                    <div className="w-[4px] h-[16px] bg-[#409eff] rounded-full"></div>
                    已投保成员
                  </div>
                  <div className="text-[13px] text-[#555] leading-[1.8] whitespace-pre-line pl-[12px]">
                    {sections.find(s => s.type === 'members')?.content}
                  </div>
                </div>

                {/* 3. 已拥有保障情况 */}
                <div className="mb-[20px]">
                  <div className="text-[15px] text-[#333] mb-[10px] flex items-center gap-[6px] font-bold">
                    <div className="w-[4px] h-[16px] bg-[#409eff] rounded-full"></div>
                    已拥有保障情况
                  </div>
                  <div className="text-[13px] text-[#555] mb-[10px] pl-[12px]">
                    {sections.find(s => s.type === 'coverage')?.content}
                  </div>
                  
                  {/* 已投保险种 */}
                  <div className="space-y-[8px] pl-[12px]">
                    {insuranceProducts.filter(p => p.enabled).map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-[12px] bg-[#f0f9ff] rounded-[8px] border border-[#409eff]/20 shadow-sm">
                        <div className="text-[13px] text-[#333] font-medium">{product.name}</div>
                        <div className="w-[6px] h-[6px] rounded-full bg-[#00d4aa] shadow-[0_0_4px_#00d4aa]"></div>
                      </div>
                    ))}
                  </div>

                  {/* 线下保单 */}
                  {offlinePolicies.length > 0 && (
                    <div className="mt-[12px] pl-[12px]">
                      <div className="text-[12px] text-[#888] mb-[8px] font-medium">线下保单</div>
                      {offlinePolicies.map((policy) => (
                        <div key={policy.id} className="mb-[8px] p-[12px] bg-[#fafafa] rounded-[8px] border border-[#eee] shadow-sm">
                          <div className="text-[13px] text-[#333] mb-[4px] font-medium">{policy.productName}</div>
                          <div className="text-[11px] text-[#666]">
                            {policy.policyHolder} | 保额：{policy.coverageAmount} | {policy.paymentYears}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. 保障建议 */}
                <div className="mb-[16px]">
                  <div className="text-[15px] text-[#333] mb-[10px] flex items-center gap-[6px] font-bold">
                    <div className="w-[4px] h-[16px] bg-[#409eff] rounded-full"></div>
                    保障建议
                  </div>
                  <div className="p-[14px] bg-gradient-to-r from-[#f0f9ff] to-[#f9f0ff] rounded-[10px] border border-[#409eff]/20 shadow-sm">
                    <div className="flex items-center gap-[6px] mb-[8px]">
                      <Sparkles className="w-4 h-4 text-[#667eea]" />
                      <span className="text-[12px] text-[#667eea] font-bold">AI智能建议</span>
                    </div>
                    <div className="text-[13px] text-[#555] leading-[1.8] whitespace-pre-line">
                      {sections.find(s => s.type === 'suggestions')?.content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧编辑区 */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* 标题栏 */}
          <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#eee] shrink-0">
            <h2 className="text-[16px] font-bold text-black">保单检视配置</h2>
            <button onClick={onClose} className="text-[#999] hover:text-black">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 标签页 */}
          <div className="flex items-center px-[24px] border-b border-[#eee]">
            <button
              onClick={() => setActiveTab('content')}
              className={`px-[20px] py-[12px] text-[14px] border-b-2 transition-colors ${
                activeTab === 'content'
                  ? 'border-[#409eff] text-[#409eff] font-medium'
                  : 'border-transparent text-[#666] hover:text-black'
              }`}
            >
              文案模板
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-[20px] py-[12px] text-[14px] border-b-2 transition-colors ${
                activeTab === 'products'
                  ? 'border-[#409eff] text-[#409eff] font-medium'
                  : 'border-transparent text-[#666] hover:text-black'
              }`}
            >
              产品检视配置
            </button>
            <button
              onClick={() => setActiveTab('offline')}
              className={`px-[20px] py-[12px] text-[14px] border-b-2 transition-colors ${
                activeTab === 'offline'
                  ? 'border-[#409eff] text-[#409eff] font-medium'
                  : 'border-transparent text-[#666] hover:text-black'
              }`}
            >
              线下保单录入
            </button>
          </div>

          {/* 内容区 */}
          <div className="flex-1 overflow-auto p-[24px]">
            {activeTab === 'content' && (
              <div className="space-y-[16px]">
                <div className="mb-[16px]">
                  <h3 className="text-[14px] text-black">内容模块</h3>
                  <p className="text-[12px] text-[#666] mt-[4px]">按顺序编辑保单检视报告的各个模块</p>
                </div>

                {sections.map((section, index) => (
                  <div key={section.id} className="border border-[#eee] rounded-[8px] p-[16px] bg-white">
                    <div className="flex items-center justify-between mb-[12px]">
                      <div className="flex items-center gap-[8px]">
                        <div className="w-[24px] h-[24px] rounded-full bg-[#409eff] text-white flex items-center justify-center text-[12px]">
                          {index + 1}
                        </div>
                        <h4 className="text-[12px] text-black font-medium">{section.title}</h4>
                      </div>
                      {section.type === 'suggestions' && (
                        <button
                          onClick={() => handleAIGenerate(section.id)}
                          className="flex items-center gap-[4px] px-[8px] py-[4px] text-white text-[11px] rounded-[4px] hover:shadow-lg transition-shadow"
                          style={{ background: 'linear-gradient(to right, #667eea, #764ba2)' }}
                        >
                          <Sparkles className="w-3 h-3" />
                          AI生成
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <textarea
                        value={section.content}
                        onChange={(e) => handleSectionEdit(section.id, e.target.value)}
                        className="w-full h-[120px] px-[12px] py-[8px] border border-[#eee] rounded-[4px] text-[12px] outline-none resize-none focus:border-[#409eff]"
                        placeholder={`请输入${section.title}内容`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'products' && (
              <div className="space-y-[12px]">
                <div className="mb-[16px]">
                  <h3 className="text-[14px] text-black mb-[8px]">险种配置</h3>
                  <p className="text-[12px] text-[#666]">选择需要在保单检视报告中展示的险种</p>
                </div>

                {insuranceProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-[16px] border border-[#eee] rounded-[8px] bg-white hover:border-[#409eff]/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="text-[14px] text-black">{product.name}</h4>
                    </div>
                    <label className="flex items-center gap-[8px] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={product.enabled}
                        onChange={() => handleToggleProduct(product.id)}
                        className="w-[16px] h-[16px] cursor-pointer accent-[#409eff]"
                      />
                      <span className="text-[12px] text-[#666]">
                        {product.enabled ? '已投保' : '未投保'}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'offline' && (
              <div className="space-y-[16px]">
                <div className="flex items-center justify-between mb-[16px]">
                  <div>
                    <h3 className="text-[14px] text-black">线下保单录入</h3>
                    <p className="text-[12px] text-[#666] mt-[4px]">录入未在系统内的线下保单信息</p>
                  </div>
                  <div className="flex gap-[8px]">
                    <button
                      onClick={handleSyncPolicies}
                      className="flex items-center gap-[4px] h-[32px] px-[16px] border border-[#409eff] text-[#409eff] text-[12px] rounded-[4px] hover:bg-[#f0f9ff]"
                    >
                      同步已有保单
                    </button>
                    <button
                      onClick={handleBatchImport}
                      className="flex items-center gap-[4px] h-[32px] px-[16px] border border-[#409eff] text-[#409eff] text-[12px] rounded-[4px] hover:bg-[#f0f9ff]"
                    >
                      批量导入线下保单
                    </button>
                    <button
                      onClick={() => setIsAddingOfflinePolicy(true)}
                      className="flex items-center gap-[4px] h-[32px] px-[16px] bg-[#409eff] text-white text-[12px] rounded-[4px] hover:bg-[#66b1ff]"
                    >
                      <Plus className="w-4 h-4" />
                      添加线下保单
                    </button>
                  </div>
                </div>

                {isAddingOfflinePolicy && (
                  <div className="border border-[#409eff] rounded-[8px] p-[16px] bg-[#f0f9ff]">
                    <h4 className="text-[12px] text-black mb-[12px]">{editingPolicyId ? '编辑线下保单' : '新增线下保单'}</h4>
                    <div className="grid grid-cols-4 gap-[12px]">
                      <input
                        type="text"
                        placeholder="投保人"
                        value={newOfflinePolicy.policyHolder || ''}
                        onChange={(e) => setNewOfflinePolicy({ ...newOfflinePolicy, policyHolder: e.target.value })}
                        className="h-[32px] px-[12px] border border-[#eee] rounded-[4px] text-[12px] outline-none focus:border-[#409eff]"
                      />
                      <input
                        type="text"
                        placeholder="被保人"
                        value={newOfflinePolicy.insuredPerson || ''}
                        onChange={(e) => setNewOfflinePolicy({ ...newOfflinePolicy, insuredPerson: e.target.value })}
                        className="h-[32px] px-[12px] border border-[#eee] rounded-[4px] text-[12px] outline-none focus:border-[#409eff]"
                      />
                      <input
                        type="text"
                        placeholder="产品名称"
                        value={newOfflinePolicy.productName || ''}
                        onChange={(e) => setNewOfflinePolicy({ ...newOfflinePolicy, productName: e.target.value })}
                        className="h-[32px] px-[12px] border border-[#eee] rounded-[4px] text-[12px] outline-none focus:border-[#409eff]"
                      />
                      <input
                        type="text"
                        placeholder="保费"
                        value={newOfflinePolicy.premium || ''}
                        onChange={(e) => setNewOfflinePolicy({ ...newOfflinePolicy, premium: e.target.value })}
                        className="h-[32px] px-[12px] border border-[#eee] rounded-[4px] text-[12px] outline-none focus:border-[#409eff]"
                      />
                      <input
                        type="text"
                        placeholder="保额"
                        value={newOfflinePolicy.coverageAmount || ''}
                        onChange={(e) => setNewOfflinePolicy({ ...newOfflinePolicy, coverageAmount: e.target.value })}
                        className="h-[32px] px-[12px] border border-[#eee] rounded-[4px] text-[12px] outline-none focus:border-[#409eff]"
                      />
                      <input
                        type="text"
                        placeholder="缴费年限"
                        value={newOfflinePolicy.paymentYears || ''}
                        onChange={(e) => setNewOfflinePolicy({ ...newOfflinePolicy, paymentYears: e.target.value })}
                        className="h-[32px] px-[12px] border border-[#eee] rounded-[4px] text-[12px] outline-none focus:border-[#409eff]"
                      />
                      <input
                        type="date"
                        placeholder="起保日期"
                        value={newOfflinePolicy.startDate || ''}
                        onChange={(e) => setNewOfflinePolicy({ ...newOfflinePolicy, startDate: e.target.value })}
                        className="h-[32px] px-[12px] border border-[#eee] rounded-[4px] text-[12px] outline-none focus:border-[#409eff] col-span-2"
                      />
                    </div>
                    <div className="flex gap-[12px] mt-[12px]">
                      <button
                        onClick={handleAddOfflinePolicy}
                        className="h-[32px] px-[16px] rounded-[4px] bg-[#409eff] text-white text-[12px] hover:bg-[#66b1ff]"
                      >
                        {editingPolicyId ? '保存修改' : '确认添加'}
                      </button>
                      <button
                        onClick={() => {
                          setIsAddingOfflinePolicy(false);
                          setNewOfflinePolicy({});
                          setEditingPolicyId(null);
                        }}
                        className="h-[32px] px-[16px] rounded-[4px] border border-[#eee] text-[12px] text-black hover:bg-[#f5f5f5]"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-[12px]">
                  {offlinePolicies.map((policy) => (
                    <div key={policy.id} className="border border-[#eee] rounded-[8px] p-[16px] bg-white group hover:border-[#409eff]/30 transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 grid grid-cols-2 gap-[12px]">
                          <div>
                            <span className="text-[12px] text-[#666]">投保人：</span>
                            <span className="text-[12px] text-black font-medium">{policy.policyHolder}</span>
                          </div>
                          <div>
                            <span className="text-[12px] text-[#666]">被保人：</span>
                            <span className="text-[12px] text-black font-medium">{policy.insuredPerson}</span>
                          </div>
                          <div>
                            <span className="text-[12px] text-[#666]">产品：</span>
                            <span className="text-[12px] text-black font-medium">{policy.productName}</span>
                          </div>
                          <div>
                            <span className="text-[12px] text-[#666]">保费：</span>
                            <span className="text-[12px] text-black font-medium">{policy.premium}</span>
                          </div>
                          <div>
                            <span className="text-[12px] text-[#666]">保额：</span>
                            <span className="text-[12px] text-black font-medium">{policy.coverageAmount}</span>
                          </div>
                          <div>
                            <span className="text-[12px] text-[#666]">缴费年限：</span>
                            <span className="text-[12px] text-black font-medium">{policy.paymentYears}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-[12px] text-[#666]">起保日期：</span>
                            <span className="text-[12px] text-black font-medium">{policy.startDate}</span>
                          </div>
                        </div>
                        <div className="flex gap-[20px] items-start pt-[2px]">
                          <button
                            onClick={() => handleEditOfflinePolicy(policy)}
                            className="text-[#409eff] hover:text-[#66b1ff] opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <span className="text-[10px]">编辑</span>
                          </button>
                          <button
                            onClick={() => handleDeleteOfflinePolicy(policy.id)}
                            className="text-[#f56c6c] hover:text-[#f78989] text-[10px]"
                          >
                            删除
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {offlinePolicies.length === 0 && !isAddingOfflinePolicy && (
                  <div className="text-center py-[48px] text-[#999] text-[12px]">
                    暂无线下保单，点击"添加线下保单"开始录入
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 底部操作栏 */}
          <div className="flex items-center justify-end gap-[12px] px-[24px] py-[16px] border-t border-[#eee]">
            <button
              onClick={onClose}
              className="h-[36px] px-[24px] rounded-[4px] border border-[#eee] text-[14px] text-[#666] hover:bg-[#f5f5f5]"
            >
              取消
            </button>
            <button
              onClick={handleGenerateImage}
              className="h-[36px] px-[24px] rounded-[4px] bg-[#00d4aa] text-white text-[14px] hover:bg-[#00c29a]"
            >
              生成报告
            </button>
            <button
              onClick={handleGenerateLink}
              className="h-[36px] px-[24px] rounded-[4px] bg-[#409eff] text-white text-[14px] hover:bg-[#66b1ff]"
            >
              生成检视
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}