import svgPaths from "../imports/svg-ntjci611a3";
import imgLogo3 from "figma:asset/dab308ac8232f0565dd492b818a1fa61c8a0c9bf.png";
import imgLogo4 from "figma:asset/530b55abe4ee0bb771fb4d9745d6bd1fe42e815c.png";
import { ChevronDown } from 'lucide-react';

function Logo() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <div className="col-1 h-[32px] ml-0 mt-0 relative row-1 w-[112.174px]">
        <img alt="Logo" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLogo3} />
      </div>
      <div className="col-1 h-[32px] ml-0 mt-0 relative row-1 w-[32.174px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="Logo Icon" className="absolute h-full left-0 max-w-none top-0 w-[348.65%]" src={imgLogo4} />
        </div>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]">
      <div className="absolute inset-[14%_14.37%_14.37%_13.99%]">
        <div className="absolute inset-[-4.36%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4613 12.4607">
            <g>
              <path d={svgPaths.p34a77200} stroke="#A0A0A0" strokeLinejoin="round" />
              <path d={svgPaths.p91a1600} stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export function Sidebar({ activePage, onPageChange }: { activePage: string; onPageChange: (page: string) => void }) {
  return (
    <div className="bg-[#1a1a1a] flex flex-col h-full w-[184px]">
      {/* 顶部标题 */}
      <div className="flex h-[64px] items-center px-[16px] py-0">
        <Logo />
      </div>

      {/* 搜索框 */}
      <div className="flex gap-[8px] h-[28px] items-center px-0 py-[4px] mx-[16px] border-b border-white">
        <SearchIcon />
        <p className="flex-[1_0_0] text-[#a0a0a0] text-[12px] leading-[22px]">请输入</p>
      </div>

      {/* 运营后台 - 展开 */}
      <MenuItemExpanded label="运营后台">
        <SubMenuItem 
          label="智能体话术配置" 
          active={activePage === 'intent-config'} 
          onClick={() => onPageChange('intent-config')}
        />
      </MenuItemExpanded>

      {/* CRM 电联 - 展开 */}
      <MenuItemExpanded label="电联CRM">
        <SubMenuItem 
          label="客户管理" 
          active={activePage === 'customer-management'} 
          onClick={() => onPageChange('customer-management')}
        />
      </MenuItemExpanded>
    </div>
  );
}

// @ts-ignore
function MenuItem({ label }: { label: string }) {
  return (
    <div className="flex gap-[8px] h-[40px] items-center px-[16px] py-[4px] cursor-pointer hover:bg-[#2a2a2a]">
      <p className="flex-[1_0_0] text-[#a0a0a0] text-[12px] leading-[22px]">{label}</p>
      <ChevronDown className="w-3 h-3 text-[#a0a0a0] rotate-180" />
    </div>
  );
}

function MenuItemExpanded({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <div className="flex gap-[8px] h-[40px] items-center px-[16px] py-[4px]">
        <p className="flex-[1_0_0] text-white text-[12px] leading-[22px]">{label}</p>
        <ChevronDown className="w-3 h-3 text-white" />
      </div>
      {children}
    </>
  );
}

function SubMenuItem({ label, active, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`flex h-[40px] items-center pl-[32px] pr-[16px] py-[4px] ${active ? 'bg-[#409eff]' : 'bg-black hover:bg-[#2a2a2a]'} cursor-pointer`}
    >
      <p className={`flex-[1_0_0] text-[12px] leading-[22px] ${active ? 'text-white font-semibold' : 'text-[#a0a0a0]'}`}>{label}</p>
    </div>
  );
}
