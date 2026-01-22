import { useState, useEffect } from 'react';
import { IntentManagement } from './components/IntentManagement';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { CustomerManagement } from './components/CustomerManagement';

export default function App() {
  // 从 URL 获取初始页面状态
  const getInitialPage = () => {
    const path = window.location.pathname;
    if (path === '/intent') return 'intent-config';
    if (path === '/customer') return 'customer-management';
    return 'intent-config'; // 默认页
  };

  const [activePage, setActivePage] = useState(getInitialPage());

  // 处理页面切换和 URL 更新
  const handlePageChange = (page: string) => {
    setActivePage(page);
    let path = '/';
    if (page === 'intent-config') path = '/intent';
    if (page === 'customer-management') path = '/customer';
    window.history.pushState({}, '', path);
  };

  // 监听浏览器前进后退
  useEffect(() => {
    const handlePopState = () => {
      setActivePage(getInitialPage());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const getPageTitle = () => {
    switch (activePage) {
      case 'intent-config':
        return '运营后台 / 智能体话术配置';
      case 'customer-management':
        return '电联CRM / 用户详情';
      default:
        return '运营后台 / 微信客服管理';
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activePage={activePage} onPageChange={handlePageChange} />
      <div className="flex-1 flex flex-col">
        <TopBar title={getPageTitle()} />
        <div className="flex-1 overflow-auto">
          {activePage === 'intent-config' && <IntentManagement />}
          {activePage === 'customer-management' && <CustomerManagement />}
        </div>
      </div>
    </div>
  );
}
