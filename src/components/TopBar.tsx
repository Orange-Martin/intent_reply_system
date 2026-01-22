import svgPaths from "../imports/svg-ntjci611a3";

function ListCollapseIcon() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <div className="absolute inset-[18.75%_7.5%_12.5%_7.5%]">
        <div className="absolute inset-[-9.09%_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6 12">
            <g>
              <path d="M12.2 4.5L10.2 6L12.2 7.5" fill="#A0A0A0" stroke="#A0A0A0" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" />
              <line stroke="#A0A0A0" strokeLinecap="round" x1="0.5" x2="13.1" y1="0.5" y2="0.5" />
              <path d="M0.5 6H7.5" stroke="#A0A0A0" strokeLinecap="round" />
              <line stroke="#A0A0A0" strokeLinecap="round" x1="0.5" x2="13.1" y1="11.5" y2="11.5" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export function TopBar({ title }: { title?: string }) {
  return (
    <div className="flex gap-[12px] h-[36px] items-center px-[16px] py-0 border-b border-[#eee]">
      <ListCollapseIcon />
      <p className="flex-1 text-[12px] leading-[20px] text-black">{title || '运营后台/微信客服管理'}</p>
      <p className="text-[12px] leading-[20px] text-black">
        <span>欢迎您：</span>
        <span className="font-medium">martin</span>
      </p>
      <p className="text-[12px] leading-[20px] text-black cursor-pointer hover:text-[#409eff]">← 退出</p>
    </div>
  );
}
