import { useState } from 'react';
import { X, GripVertical, Plus, Trash2, Image as ImageIcon, Smile } from 'lucide-react';

interface Script {
  id: string;
  type: 'text' | 'image' | 'mixed';
  content: string;
  imageUrl?: string;
}

interface IntentEditModalProps {
  intent: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

export function IntentEditModal({ intent, onClose, onSave }: IntentEditModalProps) {
  const [intentName, setIntentName] = useState(intent?.name || '');
  const [description, setDescription] = useState(intent?.description || '');
  const [scripts, setScripts] = useState<Script[]>(
    intent
      ? [
          {
            id: '1',
            type: 'mixed' as const,
            content: '【春节放假通知】老师好，2月9日-...',
            imageUrl: 'https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=60&h=60&fit=crop',
          },
        ]
      : []
  );
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  const [currentEditingScript, setCurrentEditingScript] = useState<string | null>(null);
  const [currentContent, setCurrentContent] = useState('');

  const handleAddScript = () => {
    if (scripts.length >= 5) {
      alert('最多设置 5 段话术');
      return;
    }
    const newScript: Script = {
      id: Date.now().toString(),
      type: 'text',
      content: '',
    };
    setScripts([...scripts, newScript]);
    setCurrentEditingScript(newScript.id);
    setCurrentContent('');
  };

  const handleDeleteScript = (id: string) => {
    setScripts(scripts.filter((s) => s.id !== id));
    if (currentEditingScript === id) {
      setCurrentEditingScript(null);
      setCurrentContent('');
    }
  };

  const handleSaveCurrentScript = () => {
    if (currentEditingScript && currentContent) {
      setScripts(
        scripts.map((s) =>
          s.id === currentEditingScript
            ? { ...s, content: currentContent, type: activeTab === 'text' ? 'text' : 'mixed' }
            : s
        )
      );
      setCurrentEditingScript(null);
      setCurrentContent('');
    }
  };

  const handleEditScript = (script: Script) => {
    setCurrentEditingScript(script.id);
    setCurrentContent(script.content);
  };

  const handleSave = () => {
    onSave({
      name: intentName,
      description,
      scripts,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[8px] w-[960px] max-h-[90vh] flex flex-col shadow-xl">
        {/* 弹窗标题 */}
        <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#eee]">
          <h2 className="text-[16px] text-black">{intent ? '编辑意图话术' : '新增意图话术'}</h2>
          <button onClick={onClose} className="text-[#999] hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 弹窗内容 */}
        <div className="flex-1 overflow-auto p-[24px]">
          {/* 基本信息 */}
          <div className="mb-[24px]">
            <div className="flex gap-[12px] items-center mb-[16px]">
              <label className="text-[12px] text-black w-[80px] text-right">
                <span className="text-[#f56c6c] mr-1">*</span>意图名称
              </label>
              <input
                type="text"
                value={intentName}
                onChange={(e) => setIntentName(e.target.value)}
                placeholder="请输入意图名称"
                className="flex-1 h-[32px] px-[12px] border border-[#eee] rounded-[4px] text-[12px] outline-none focus:border-[#409eff]"
              />
            </div>
            <div className="flex gap-[12px] items-start">
              <label className="text-[12px] text-black w-[80px] text-right pt-[8px]">描述</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="请输入描述信息"
                className="flex-1 h-[60px] px-[12px] py-[8px] border border-[#eee] rounded-[4px] text-[12px] outline-none resize-none focus:border-[#409eff]"
              />
            </div>
          </div>

          {/* 话术列表 */}
          <div className="mb-[16px]">
            <div className="flex items-center justify-between mb-[12px]">
              <label className="text-[12px] text-black">
                <span className="text-[#f56c6c] mr-1">*</span>回复内容
              </label>
              <button
                onClick={handleAddScript}
                className={`flex items-center gap-[4px] text-[12px] ${
                  scripts.length >= 5
                    ? 'text-[#ccc] cursor-not-allowed'
                    : 'text-[#409eff] hover:text-[#66b1ff]'
                }`}
              >
                <Plus className="w-4 h-4" />
                添加话术
              </button>
            </div>

            {/* 话术卡片列表 */}
            <div className="space-y-[12px] mb-[16px]">
              {scripts.map((script, index) => (
                <div
                  key={script.id}
                  className="flex items-start gap-[12px] p-[12px] border border-[#eee] rounded-[4px] bg-[#fafafa] hover:border-[#409eff] cursor-pointer"
                  onClick={() => handleEditScript(script)}
                >
                  <div className="flex items-center gap-[8px]">
                    <GripVertical className="w-4 h-4 text-[#999] cursor-move" />
                    <div className="w-[24px] h-[24px] rounded-full bg-[#409eff] text-white flex items-center justify-center text-[12px]">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-[8px]">
                      {script.imageUrl && (
                        <img
                          src={script.imageUrl}
                          alt=""
                          className="w-[40px] h-[40px] rounded-[4px] object-cover flex-shrink-0"
                        />
                      )}
                      <p className="text-[12px] text-black flex-1 line-clamp-2">{script.content}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteScript(script.id);
                    }}
                    className="text-[#f56c6c] hover:text-[#f78989]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* 编辑区域 */}
            {currentEditingScript && (
              <div className="border border-[#eee] rounded-[8px] overflow-hidden bg-white">
                {/* 选项卡 */}
                <div className="flex border-b border-[#eee] bg-[#fafafa]">
                  <TabButton
                    label="文本"
                    active={activeTab === 'text'}
                    onClick={() => setActiveTab('text')}
                  />
                  <TabButton
                    label="图片"
                    active={activeTab === 'image'}
                    onClick={() => setActiveTab('image')}
                  />
                </div>

                {/* 内容编辑区 */}
                <div className="p-[16px]">
                  <textarea
                    value={currentContent}
                    onChange={(e) => setCurrentContent(e.target.value)}
                    placeholder="请输入文本内容，限1000个字"
                    className="w-full h-[200px] text-[12px] text-black outline-none resize-none"
                  />
                </div>

                {/* 底部操作栏 */}
                <div className="flex items-center justify-between px-[16px] py-[12px] border-t border-[#eee]">
                  <button className="flex items-center justify-center w-[32px] h-[32px] rounded-[4px] border border-[#eee] hover:border-[#409eff]">
                    <Smile className="w-4 h-4 text-[#999]" />
                  </button>
                  <div className="flex gap-[12px]">
                    <button
                      onClick={() => {
                        setCurrentEditingScript(null);
                        setCurrentContent('');
                      }}
                      className="h-[32px] px-[24px] rounded-[4px] border border-[#eee] text-[12px] text-black hover:bg-[#f5f5f5]"
                    >
                      取消
                    </button>
                    <button
                      onClick={handleSaveCurrentScript}
                      className="h-[32px] px-[24px] rounded-[4px] bg-[#00d4aa] text-white text-[12px] hover:bg-[#00c29a]"
                    >
                      添加
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 弹窗底部 */}
        <div className="flex items-center justify-end gap-[12px] px-[24px] py-[16px] border-t border-[#eee]">
          <button
            onClick={onClose}
            className="h-[36px] px-[24px] rounded-[4px] border border-[#eee] text-[12px] text-black hover:bg-[#f5f5f5]"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="h-[36px] px-[24px] rounded-[4px] bg-[#409eff] text-white text-[12px] hover:bg-[#66b1ff]"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-[24px] py-[12px] text-[12px] border-b-2 transition-colors ${
        active
          ? 'border-[#00d4aa] text-[#00d4aa]'
          : 'border-transparent text-[#666] hover:text-black'
      }`}
    >
      {label}
    </button>
  );
}
