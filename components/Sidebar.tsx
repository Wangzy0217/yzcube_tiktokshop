import React, { useState, useEffect } from 'react';
import { 
  Home, 
  ClipboardList, 
  Package, 
  Megaphone, 
  Users, 
  Video, 
  TrendingUp, 
  BarChart2, 
  Trophy, 
  Wallet, 
  GraduationCap
} from 'lucide-react';

interface SubItem {
  label: string;
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  id: string;
  subItems?: SubItem[];
}

const menuGroups: MenuItem[][] = [
  // Group 1
  [
    { icon: Home, label: 'Homepage', id: 'homepage' },
  ],
  // Group 2
  [
    { 
      icon: ClipboardList, 
      label: 'Orders', 
      id: 'orders',
      subItems: [
        { label: 'Manage orders' },
        { label: 'Manage cancellations' },
        { label: 'Manage returns' },
        { label: 'Shipping settings' },
        { label: 'Fulfillment settings' }
      ]
    },
    { 
      icon: Package, 
      label: 'Products', 
      id: 'products',
      subItems: [
        { label: 'Manage products' },
        { label: 'Add products' },
        { label: 'Sales Accelerator' },
        { label: 'Product ratings' },
        { label: 'Price bidding' },
        { label: 'Product opportunities' },
        { label: 'Price diagnosis' }
      ]
    },
  ],
  // Group 3
  [
    { 
      icon: Megaphone, 
      label: 'Marketing', 
      id: 'marketing',
      subItems: [
        { label: 'Promotions' },
        { label: 'Campaigns' },
        { label: 'Shop ads' },
        { label: 'Program' },
        { label: 'Shop page' },
        { label: 'Flash sale registration' }
      ]
    },
    { icon: Users, label: 'Affiliate', id: 'affiliate' },
    { 
      icon: Video, 
      label: 'LIVE & video', 
      id: 'live_video',
      subItems: [
        { label: 'Shoppable videos' },
        { label: 'LIVE selling' }
      ]
    },
    { 
      icon: TrendingUp, 
      label: 'Growth', 
      id: 'growth',
      subItems: [
        { label: 'Missions & rewards' },
        { label: 'Star Shop' },
        { label: 'App store' },
        { label: 'TikTok Shop partners' }
      ]
    },
  ],
  // Group 4
  [
    { icon: BarChart2, label: 'Data compass', id: 'data_compass' },
    { 
      icon: Trophy, 
      label: 'Account health', 
      id: 'account_health',
      subItems: [
        { label: 'Shop health' },
        { label: 'Store rating' },
        { label: 'TikTok account health' }
      ]
    },
    { 
      icon: Wallet, 
      label: 'Finance', 
      id: 'finance',
      subItems: [
        { label: 'Transactions' },
        { label: 'Withdrawals' },
        { label: 'Tax documents' }
      ]
    },
  ],
  // Group 5
  [
    { icon: GraduationCap, label: 'Academy', id: 'academy' },
  ]
];

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  // State to track expanded menu (single string or null for accordion effect)
  const [openMenuId, setOpenMenuId] = useState<string | null>('orders');

  // Auto-expand menu if active page is inside a sub-menu
  useEffect(() => {
    for (const group of menuGroups) {
      for (const item of group) {
        if (item.subItems && item.subItems.some(sub => sub.label === activePage)) {
          setOpenMenuId(item.id);
          return;
        }
      }
    }
  }, [activePage]);

  const toggleMenu = (id: string) => {
    // If clicking the currently open menu, close it (set to null). Otherwise, open the new one.
    setOpenMenuId(prev => prev === id ? null : id);
  };

  const handleItemClick = (e: React.MouseEvent, item: MenuItem) => {
    e.preventDefault();
    if (item.subItems) {
      toggleMenu(item.id);
    } else {
      onNavigate(item.label);
    }
  };

  const handleSubItemClick = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    onNavigate(label);
  };

  return (
    <aside className="w-[216px] bg-white border-r border-gray-200 flex-shrink-0 h-[calc(100vh-60px)] overflow-y-auto custom-scrollbar hidden lg:block sticky top-[60px]">
      <div className="py-3">
        {menuGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            {/* Divider between groups */}
            {groupIndex > 0 && <div className="h-[1px] bg-[#E5E7EB] mx-4 my-2"></div>}
            
            <div className="px-2">
                {group.map((item) => {
                  const isActive = activePage === item.label;
                  // Check if this menu is the currently opened one
                  const isOpen = openMenuId === item.id;
                  const hasSubs = !!item.subItems;

                  return (
                    <div key={item.id} className="mb-0.5">
                      <a
                        href="#"
                        onClick={(e) => handleItemClick(e, item)}
                        className={`flex items-center justify-between px-3 py-2.5 text-[14px] rounded-[4px] transition-all duration-200 group mb-0.5
                          ${isActive 
                            ? 'text-tiktok-teal bg-[#effaf9] font-medium' 
                            : 'text-[#161823] hover:bg-gray-100 font-normal'
                          }`}
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <item.icon 
                            className={`w-[18px] h-[18px] flex-shrink-0 transition-colors 
                            ${isActive ? 'text-tiktok-teal' : 'text-[#4F515B] group-hover:text-[#161823]'}`} 
                          />
                          <span className="truncate leading-none">{item.label}</span>
                        </div>
                      </a>

                      {/* Sub Items with Animation */}
                      {hasSubs && (
                        <div 
                          className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                        >
                          <div className="overflow-hidden">
                            {item.subItems!.map((sub) => {
                               const isSubActive = activePage === sub.label;
                               return (
                                <a
                                  key={sub.label}
                                  href="#"
                                  onClick={(e) => handleSubItemClick(e, sub.label)}
                                  className={`block pl-[42px] pr-3 py-2.5 text-[14px] rounded-[4px] transition-colors leading-tight mb-0.5
                                    ${isSubActive
                                      ? 'text-tiktok-teal bg-[#effaf9] font-medium'
                                      : 'text-[#757780] hover:bg-gray-100 hover:text-[#161823] font-light'
                                    }`}
                                >
                                  {sub.label}
                                </a>
                               );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;