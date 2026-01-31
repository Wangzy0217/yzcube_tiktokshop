import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Edit2, X, MessageCircle, ChevronDown, ShieldCheck, HelpCircle, Sparkles, Rocket, Calendar, CheckCircle2, AlertCircle, ShoppingBag } from 'lucide-react';

// Mock data structure simulating DB response
const dashboardStats = [
  { id: 'orders_ship', label: 'Orders to ship', value: 94, urgent: 19 },
  { id: 'pending_returns', label: 'Pending returns', value: 20, urgent: 1 },
  { id: 'rejected_products', label: 'Rejected products', value: 2 },
  { id: 'low_stock', label: 'Low stock', value: 31, outOfStock: 1 },
  { id: 'neg_reviews', label: 'Address negative reviews', value: 19 },
];

const AlertIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M7 3.5V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <circle cx="7" cy="9.5" r="0.8" fill="currentColor"/>
  </svg>
);

const PerformanceMetric = ({ label, value, change, tooltip }: { label: string, value: string, change: string, tooltip?: string }) => (
  <div className="flex-1 p-3 rounded-[6px] hover:bg-[#f4f4f4] transition-colors duration-200 group relative cursor-pointer">
    <div className="flex items-center gap-1 text-[13px] text-[#80838D] mb-1 font-light">
      {label} <ChevronRight className="w-3 h-3 text-[#B0B3BC] group-hover:text-[#161823] transition-colors" />
    </div>
    {/* Reduced font size and weight as requested */}
    <div className="text-[20px] font-medium text-[#161823] leading-tight mb-1 font-sans tracking-tight">{value}</div>
    <div className="text-[12px] text-[#009E91] font-normal flex items-center gap-0.5">
      <span className="text-[10px]">▲</span> {change}
    </div>

    {/* Animated Tooltip */}
    {tooltip && (
        <div className="absolute top-full left-0 mt-2 w-[280px] bg-[#2E3039] text-white text-[12px] leading-relaxed p-3 rounded-[4px] shadow-xl z-50 opacity-0 translate-y-2 invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none">
            {/* Arrow */}
            <div className="absolute -top-1.5 left-8 w-3 h-3 bg-[#2E3039] transform rotate-45"></div>
            {tooltip}
        </div>
    )}
  </div>
);

const RadioIcon = ({ selected }: { selected: boolean }) => {
  if (selected) {
    return (
      <div className="w-4 h-4 rounded-full border-[5px] border-[#009E91] bg-white"></div>
    );
  }
  return (
    <div className="w-4 h-4 rounded-full border border-gray-300"></div>
  );
};

// Reusable Scrollable Row Component
const ScrollableRow: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5); // 5px tolerance
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [children]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 380; // Scroll by approx one card width
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 400);
    }
  };

  return (
    <div 
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left Scroll Button */}
      <button
        onClick={() => scroll('left')}
        className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-5 z-20 w-10 h-10 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-gray-100 flex items-center justify-center text-[#161823] hover:scale-105 hover:bg-gray-50 transition-all duration-300
          ${isHovered && canScrollLeft ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-4 pointer-events-none'}
        `}
      >
        <ChevronRight className="w-5 h-5 rotate-180" />
      </button>

      {/* Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar pb-1 px-1 h-full"
        onScroll={checkScroll}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
      >
         <style>{`
            .no-scrollbar::-webkit-scrollbar {
                display: none;
            }
         `}</style>
        {children}
      </div>

      {/* Right Scroll Button */}
      <button
        onClick={() => scroll('right')}
        className={`absolute right-0 top-1/2 -translate-y-1/2 -mr-5 z-20 w-10 h-10 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-gray-100 flex items-center justify-center text-[#161823] hover:scale-105 hover:bg-gray-50 transition-all duration-300
          ${isHovered && canScrollRight ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible -translate-x-4 pointer-events-none'}
        `}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('Last 7 days');
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [activeCampaignTab, setActiveCampaignTab] = useState('registered');
  const timeDropdownRef = useRef<HTMLDivElement>(null);

  const timeOptions = ['Today', 'Last 7 days', 'Last 28 days'];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (timeDropdownRef.current && !timeDropdownRef.current.contains(event.target as Node)) {
        setIsTimeDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTimeSelect = (option: string) => {
    setTimeFilter(option);
    setIsTimeDropdownOpen(false);
  };

  return (
    <div className="flex-1 bg-[#f8f8f8] relative min-w-[1160px]">
      {/* Decorative Dark Background */}
      <div className="absolute top-0 left-0 w-full h-[140px] bg-[#161823] overflow-hidden z-0">
        {/* Geometric Decorations */}
        <div className="absolute top-[-20px] right-[20%] w-12 h-12 bg-[#25F4EE] opacity-80 transform rotate-[30deg]"></div>
        <div className="absolute top-[80px] right-[18%] w-6 h-6 bg-[#FE2C55] opacity-80 transform rotate-[15deg]"></div>
        <div className="absolute top-[20px] right-[25%] w-8 h-8 bg-[#25F4EE] opacity-60 transform rotate-[45deg] rounded-sm"></div>
      </div>

      {/* Main Content Container - Increased Width to 1140px */}
      <div className="relative z-10 w-[1140px] mx-auto pb-20 pt-[58px]">
        
        {/* Stats Row - Increased padding for height */}
        <div className="mb-6">
           <div className="bg-white rounded-lg px-6 py-8 shadow-sm flex items-start">
             {dashboardStats.map((stat, index) => (
               <div key={stat.id} className="flex-1 min-w-0 group pr-2">
                 <div className="flex items-center text-[#80838D] text-[13px] mb-2 cursor-pointer hover:text-[#161823] transition-colors font-light truncate">
                   <span>{stat.label}</span>
                   <ChevronRight className="w-3.5 h-3.5 ml-0.5 text-[#B0B3BC] group-hover:text-[#161823]" />
                 </div>
                 
                 {/* Reduced font size from 26px to 24px */}
                 <div className="text-[24px] font-medium text-[#161823] leading-none mb-2 tracking-tight">
                   {stat.value}
                 </div>

                 <div className="h-[20px] flex items-center">
                   {stat.urgent !== undefined && (
                     <div className="text-[12px] text-[#FE2C55] flex items-center gap-1.5 font-normal">
                       <AlertIcon />
                       <span>Urgent: {stat.urgent}</span>
                     </div>
                   )}
                   {stat.outOfStock !== undefined && (
                     <div className="text-[12px] text-[#FE2C55] flex items-center gap-1.5 font-normal">
                        <AlertIcon />
                        <span>Out of stock: {stat.outOfStock}</span>
                     </div>
                   )}
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* Section Header (Outside Card) */}
        <div className="mb-4">
          <h2 className="text-[20px] font-normal text-[#161823] leading-snug tracking-tight">Review your shop performance</h2>
          <p className="text-[13px] text-[#80838D] mt-1 font-light">Summarize key metrics data to understand your shop's performance and grow your business</p>
        </div>

        {/* Performance & Health Section - Wider Layout */}
        <div className="flex gap-4 mb-6">
          
          {/* Left: Performance Panel - Width increased to 820px */}
          <div className="w-[820px] bg-white px-6 py-4 rounded-lg shadow-sm border border-transparent hover:border-gray-200 transition-colors">
            
            {/* Controls Section */}
            <div className="flex justify-between items-center mb-6 relative z-20">
              <div className="relative" ref={timeDropdownRef}>
                <button 
                  onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                  className={`text-[14px] text-[#161823] flex items-center gap-2 px-2 py-1.5 rounded-[4px] transition-colors font-normal ${isTimeDropdownOpen ? 'bg-gray-100' : 'bg-transparent hover:bg-gray-100'}`}
                >
                  {timeFilter} <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isTimeDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isTimeDropdownOpen && (
                  <div className="absolute top-[calc(100%+4px)] left-0 w-[200px] bg-white rounded-[4px] shadow-xl border border-gray-100 py-1 animate-fade-in z-50">
                    {timeOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleTimeSelect(option)}
                        className="w-full text-left px-4 py-2.5 text-[14px] hover:bg-gray-50 flex items-center gap-3 transition-colors group"
                      >
                         <RadioIcon selected={timeFilter === option} />
                         <span className={`${timeFilter === option ? 'text-[#161823] font-normal' : 'text-[#161823] font-light'}`}>
                           {option}
                         </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-[12px] text-[#80838D] font-light">
                Updated on Jan 29, 16:00 (GMT+00:00)
                <Edit2 className="w-3.5 h-3.5 cursor-pointer hover:text-gray-600" />
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="flex items-start gap-4">
              <PerformanceMetric 
                label="GMV" 
                value="RM185,215.21" 
                change="5.95%" 
                tooltip="Gross merchandise value = sale price x total items sold + shipping and handling fees - any discounts"
              />
              <PerformanceMetric 
                label="Customers" 
                value="1,999" 
                change="4.50%"
                tooltip="Total number of unique customers"
              />
              <PerformanceMetric 
                label="SKU orders" 
                value="2,195" 
                change="5.83%" 
                tooltip="Number of SKUs in orders placed, including canceled and refunded orders."
              />
              <PerformanceMetric 
                label="Visitors" 
                value="43,942" 
                change="4.72%" 
                tooltip="Total number of unique users who visited the product pages."
              />
            </div>
          </div>

          {/* Right: Shop Health Panel - Width increased to 300px */}
          <div className="w-[300px] bg-white p-4 rounded-lg shadow-sm border border-transparent hover:border-gray-200 transition-colors flex flex-col justify-center relative group cursor-pointer">
             
             {/* Shop Health Tooltip - Positioned left */}
             <div className="absolute right-full top-0 mr-3 w-[260px] bg-white text-[#161823] text-[12px] p-4 rounded-[4px] shadow-[0_4px_16px_rgba(0,0,0,0.1)] border border-gray-100 z-50 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 pointer-events-none">
                <div className="flex gap-3">
                   <HelpCircle className="w-4 h-4 text-[#161823] flex-shrink-0 mt-0.5" />
                   <span className="leading-relaxed font-light text-[#161823] text-[13px]">
                     Shop health provides an overview of shop performance and adherence to TikTok Shop policies. Regular monitoring helps prevent violations that may affect your store.
                   </span>
                </div>
                {/* Arrow pointing right */}
                <div className="absolute top-6 -right-1.5 w-3 h-3 bg-white border-t border-r border-gray-100 transform rotate-45 shadow-sm"></div>
             </div>

             <div className="flex items-center gap-2 mb-2">
               <ShieldCheck className="w-5 h-5 text-[#161823]" fill="currentColor" color="white" />
               <h3 className="font-medium text-[15px] text-[#161823]">Shop Health</h3>
             </div>
             
             {/* Reduced font size and weight */}
             <div className="text-[18px] font-medium text-[#F5A300] mb-1 leading-tight">
               2 new violations
             </div>
             
             <p className="text-[12px] text-[#80838D] leading-relaxed font-light">
               Try to address new violations quickly to avoid shop disruptions.
             </p>
          </div>
        </div>

        {/* Drive sales with TikTok Shop Ads */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            {/* Increased font size to 20px and made normal weight */}
            <h2 className="text-[20px] font-normal text-[#161823] mb-6">Drive sales with TikTok Shop Ads</h2>
            
            <div className="flex gap-8">
                {/* Left Image: Width reduced to 240px */}
                <div className="w-[240px] h-[160px] bg-[#EAF4F9] rounded-md overflow-hidden flex-shrink-0">
                   <img 
                     src="https://lf16-scmcdn.oecstatic.com/obj/oec-magellan-sg/gec/atlas/workbench_components/assets/gvm_max_bg.lga88n3x.png" 
                     alt="GMV Max" 
                     className="w-full h-full object-cover"
                   />
                </div>

                {/* Right Content */}
                <div className="flex-1 flex flex-col justify-center">
                    {/* GMV Max Title: Reduced weight to font-medium */}
                    <h3 className="text-[18px] font-medium text-[#161823] mb-2">GMV Max can promote all your products and livestreams</h3>
                    <p className="text-[13px] text-[#80838D] mb-8 font-light">80% of sellers have seen a 20% increase in gross merchandise value with GMV Max</p>

                    <div className="flex items-start justify-between gap-6">
                        <div className="flex items-start gap-8 flex-1">
                            <div className="flex gap-2 flex-1">
                                <Sparkles className="w-4 h-4 text-[#80838D] flex-shrink-0 mt-0.5" />
                                <span className="text-[13px] text-[#5C5F6A] leading-snug font-light">Automatically identify and scale your highest-performing ad creative</span>
                            </div>
                            <div className="flex gap-2 flex-1">
                                <Rocket className="w-4 h-4 text-[#80838D] flex-shrink-0 mt-0.5" />
                                <span className="text-[13px] text-[#5C5F6A] leading-snug font-light">Reach high-intent shoppers in all placements—TikTok feeds, Shop Tabs, and search results</span>
                            </div>
                        </div>

                        {/* Button Group: Added mr-24 to move buttons left */}
                        <div className="flex flex-col items-center gap-2 flex-shrink-0 w-[140px] mr-24">
                             <button className="w-full bg-[#009E91] hover:bg-[#008C80] text-white py-2 rounded-[4px] text-[14px] font-medium transition-colors">
                                Create ads
                             </button>
                             <div className="flex items-center gap-1 text-[12px] text-[#80838D] font-light">
                                Just three steps <HelpCircle className="w-3 h-3" />
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Campaigns Section - Header Outside */}
        <div className="mb-4">
          <h2 className="text-[20px] font-normal text-[#161823] leading-snug tracking-tight">Join campaigns and monitor the results</h2>
          <p className="text-[13px] text-[#80838D] mt-1 font-light">Get more sales by joining campaigns and tracking their results</p>
        </div>

        {/* Campaigns Card - Content Inside */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6 h-[260px] flex flex-col">
          
          {/* Tabs */}
          <div className="flex border-b border-gray-100 mb-6 shrink-0">
            {['Registered campaigns', 'More campaigns', 'Bundle program'].map((tab) => {
                const key = tab.split(' ')[0].toLowerCase();
                const isActive = activeCampaignTab === key;
                return (
                    <button
                        key={key}
                        onClick={() => setActiveCampaignTab(key)}
                        className={`px-1 pb-3 text-[14px] font-medium mr-6 transition-colors relative
                            ${isActive ? 'text-[#161823]' : 'text-[#80838D] hover:text-[#161823]'}
                        `}
                    >
                        {tab}
                        {isActive && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#009E91] rounded-t-sm"></div>}
                    </button>
                )
            })}
          </div>

          {/* Content Area - Uses ScrollableRow for carousel effect */}
          <ScrollableRow key={activeCampaignTab} className="animate-fade-in flex-1 min-h-0">
             {/* REGISTERED CAMPAIGNS TAB */}
             {activeCampaignTab === 'registered' && (
                <>
                    {/* Replicated Cards for scrolling demo */}
                    {[1, 2, 3, 4, 5].map((item) => (
                      <React.Fragment key={item}>
                        {/* Card 1 */}
                        <div className="min-w-[360px] flex-1 bg-[#F8F8F8] p-4 rounded-lg flex flex-col relative border border-transparent hover:border-gray-200 transition-colors">
                            <div className="text-[12px] text-[#80838D] mb-1.5 truncate">TikTok Shop Q1 2026 Campaigns...</div>
                            <div className="text-[14px] font-semibold text-[#161823] mb-2 leading-snug">
                                [BXP EXCLUSIVE] The Hometown Market Huat Ah! Sale...
                            </div>
                            
                            <div className="flex items-center gap-1.5 text-[12px] text-[#80838D] mb-1.5 font-light">
                                <CheckCircle2 className="w-4 h-4 text-[#B0B3BC]" />
                                <span>You're all caught up</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[12px] text-[#80838D] mb-2 font-light">
                                <Calendar className="w-4 h-4 text-[#80838D]" />
                                <span>Ongoing campaign</span>
                            </div>

                            <div className="h-[1px] bg-gray-200 w-full mb-2 mt-auto"></div>
                            
                            <div className="flex items-center gap-2">
                                {/* Mock Product Images */}
                                <div className="w-8 h-8 rounded-[2px] bg-white border border-gray-200 p-0.5 flex items-center justify-center">
                                    <span className="text-[8px] text-blue-500">PROD</span>
                                </div>
                                <div className="w-8 h-8 rounded-[2px] bg-white border border-gray-200 p-0.5 flex items-center justify-center">
                                    <span className="text-[8px] text-blue-500">PROD</span>
                                </div>
                                <div className="h-8 px-2 flex items-center justify-center bg-white border border-gray-200 rounded-[2px] text-[12px] text-[#161823]">
                                    94+
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="min-w-[360px] flex-1 bg-[#F8F8F8] p-4 rounded-lg flex flex-col relative border border-transparent hover:border-gray-200 transition-colors">
                            <div className="text-[12px] text-[#80838D] mb-1.5 truncate">MY-TikTok Shopping - Flash Sale...</div>
                            <div className="text-[14px] font-semibold text-[#161823] mb-2 leading-snug">
                                TikTok Shopping Center Flash Sale (No promotion but...
                            </div>
                            
                            <div className="flex items-center gap-1.5 text-[12px] text-[#80838D] mb-1.5 font-light">
                                <CheckCircle2 className="w-4 h-4 text-[#B0B3BC]" />
                                <span>You're all caught up</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[12px] text-[#80838D] mb-2 font-light">
                                <Calendar className="w-4 h-4 text-[#80838D]" />
                                <span>Ongoing campaign</span>
                            </div>

                            <div className="h-[1px] bg-gray-200 w-full mb-2 mt-auto"></div>
                            
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-[2px] bg-white border border-gray-200 p-0.5 flex items-center justify-center">
                                    <span className="text-[8px] text-blue-500">PROD</span>
                                </div>
                                <div className="w-8 h-8 rounded-[2px] bg-white border border-gray-200 p-0.5 flex items-center justify-center">
                                    <span className="text-[8px] text-blue-500">PROD</span>
                                </div>
                                <div className="h-8 px-2 flex items-center justify-center bg-white border border-gray-200 rounded-[2px] text-[12px] text-[#161823]">
                                    60+
                                </div>
                            </div>
                        </div>
                      </React.Fragment>
                    ))}
                </>
             )}

             {/* MORE CAMPAIGNS TAB */}
             {activeCampaignTab === 'more' && (
                <>
                   {[1, 2, 3, 4, 5].map((item) => (
                      <React.Fragment key={item}>
                        {/* Card 1 - Shopping Bag */}
                        <div className="min-w-[400px] bg-[#F8F8F8] rounded-lg flex relative border border-transparent hover:border-gray-200 transition-colors overflow-hidden group">
                          {/* Close Button */}
                          <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 z-10 p-1"><X className="w-3.5 h-3.5" /></button>
                          
                          {/* Left Image - Full Height */}
                          <div className="w-[140px] bg-white flex items-center justify-center flex-shrink-0 relative">
                            <div className="w-20 h-20">
                                <img src="https://lf19-scmcdn-sg.oecstatic.com/obj/ecom-shop-sg/ecom/affiliate/seller/icon/shopping-bag.png" alt="Shop" className="w-full h-full object-contain opacity-90" />
                            </div>
                          </div>
                          
                          {/* Right Content */}
                          <div className="flex-1 p-3 pl-4 flex flex-col relative">
                            {/* Watermark */}
                            <div className="absolute -bottom-4 -right-4 text-gray-200 opacity-20 pointer-events-none">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24">
                                    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
                                </svg>
                            </div>

                            <div className="text-[14px] font-bold text-[#161823] mb-1 leading-tight line-clamp-2 pr-5 z-0">
                                TikTok Shop Q1 2026 Campaigns...
                            </div>
                            
                            <div className="text-[12px] text-[#80838D] mb-1 flex flex-wrap gap-x-2 font-light z-0">
                                <span>16 sub campaigns eligible</span>
                                <span className="text-gray-300">|</span>
                                <span>12/15/2025 - 04/05/2026</span>
                            </div>

                            <div className="mt-auto z-10">
                                <div className="text-[12px] text-[#80838D] flex items-center gap-1 mb-2 font-light">
                                    <ShieldCheck className="w-3.5 h-3.5 text-[#80838D]" />
                                    <span>You've received an exclusive invite</span>
                                </div>
                                <button className="px-3 py-1.5 bg-[#E8E8E8] hover:bg-[#dcdcdc] text-[13px] font-medium rounded-[4px] text-[#161823] transition-colors">
                                    View invite
                                </button>
                            </div>
                          </div>
                        </div>

                        {/* Card 2 - Banner Image */}
                         <div className="min-w-[400px] bg-[#F8F8F8] rounded-lg flex relative border border-transparent hover:border-gray-200 transition-colors overflow-hidden group">
                          <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 z-10 p-1"><X className="w-3.5 h-3.5" /></button>
                          
                          <div className="w-[140px] relative flex-shrink-0">
                             <div className="w-full h-full bg-gradient-to-br from-[#4a7c59] to-[#8dbd8d] flex flex-col items-center justify-center text-white text-center p-2">
                                <span className="text-[16px] font-bold leading-tight drop-shadow-sm">LEBIH<br/>JIMAT</span>
                                <span className="text-[#FFE066] text-[18px] font-bold leading-none mt-1 drop-shadow-sm">90% OFF</span>
                                {/* Decorative elements */}
                                <div className="absolute top-2 left-2 text-[10px] opacity-60">🌙</div>
                                <div className="absolute bottom-2 right-2 text-[10px] opacity-60">✨</div>
                             </div>
                          </div>
                          
                          <div className="flex-1 p-3 pl-4 flex flex-col relative">
                             {/* Watermark */}
                             <div className="absolute -bottom-4 -right-4 text-gray-200 opacity-20 pointer-events-none">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24">
                                    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
                                </svg>
                             </div>

                            <div className="text-[14px] font-bold text-[#161823] mb-1 leading-tight line-clamp-2 pr-5 z-0">
                                February Lebih Jimat
                            </div>
                            <div className="text-[12px] text-[#80838D] mb-1 font-light z-0">
                                2 sub campaigns eligible
                            </div>

                            <div className="mt-auto z-10">
                                <div className="text-[12px] text-[#80838D] flex items-center gap-1 mb-2 font-light">
                                    <ShieldCheck className="w-3.5 h-3.5 text-[#80838D]" />
                                    <span>You've received an exclusive invite</span>
                                </div>
                                <button className="px-3 py-1.5 bg-[#E8E8E8] hover:bg-[#dcdcdc] text-[13px] font-medium rounded-[4px] text-[#161823] transition-colors">
                                    View invite
                                </button>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                   ))}
                </>
             )}

             {/* BUNDLE PROGRAM TAB */}
             {activeCampaignTab === 'bundle' && (
                <>
                   {[1, 2, 3, 4, 5].map((item) => (
                      <React.Fragment key={item}>
                        {/* Card 1 */}
                        <div className="min-w-[360px] flex-1 bg-[#F8F8F8] p-4 rounded-lg relative flex flex-col">
                            <div className="flex gap-4 mb-2">
                                <div className="w-[72px] h-[72px] rounded-lg flex-shrink-0 overflow-hidden bg-gradient-to-br from-black to-red-900 flex flex-col items-center justify-center text-white border border-gray-200">
                                    <ShoppingBag className="w-8 h-8 text-pink-500 mb-1" />
                                    <span className="text-[8px] font-bold text-center leading-none px-1">Bonus Xtra Program PLUS</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="text-[14px] font-semibold text-[#161823] mb-1">Bonus Xtra Program Plus</div>
                                            <div className="text-[12px] text-[#80838D]">4.86% min. service fee</div>
                                        </div>
                                        <div className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[10px] rounded-[2px] hidden">Best value</div>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-[#009E91] text-[12px] font-medium">
                                            <CheckCircle2 className="w-4 h-4" />
                                            Registered
                                        </div>
                                        <button className="px-3 py-1.5 bg-[#E8E8E8] hover:bg-[#dcdcdc] text-[13px] font-medium rounded-[4px] text-[#161823] transition-colors">View details</button>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[1px] bg-gray-200 w-full mb-2 mt-auto"></div>
                            <div className="text-[12px] text-[#80838D]">
                                Bundle includes:
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="min-w-[360px] flex-1 bg-[#F8F8F8] p-4 rounded-lg relative flex flex-col">
                            <div className="flex gap-4 mb-2">
                                <div className="w-[72px] h-[72px] rounded-lg flex-shrink-0 overflow-hidden bg-black flex flex-col items-center justify-center text-white border border-gray-200 relative">
                                    <div className="absolute top-1 right-1 text-[8px] text-cyan-400">TikTok Shop</div>
                                    <div className="text-[10px] font-bold text-center leading-tight px-1 z-10">Bonus Extra Voucher</div>
                                    <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-cyan-400 opacity-50"></div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="text-[14px] font-semibold text-[#161823] mb-1">Bonus Extra Program (BXP)</div>
                                            <div className="text-[12px] text-[#80838D]">4.86% min. service fee</div>
                                        </div>
                                        <div className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[10px] rounded-[2px] font-medium">Best value</div>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-[#EBA400] text-[12px] font-medium">
                                            <AlertCircle className="w-4 h-4 fill-[#EBA400] text-white" />
                                            <span className="text-[#161823] font-normal">Not eligible</span>
                                        </div>
                                        <button className="px-3 py-1.5 bg-[#E8E8E8] hover:bg-[#dcdcdc] text-[13px] font-medium rounded-[4px] text-[#161823] transition-colors">View details</button>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[1px] bg-gray-200 w-full mb-2 mt-auto"></div>
                            <div className="text-[12px] text-[#80838D] leading-relaxed">
                                Bundle includes: <br/>
                                <span className="text-[#161823]">Bonus Cashback Benefits • Voucher Xtra Benefit</span>
                            </div>
                        </div>
                      </React.Fragment>
                   ))}
                </>
             )}
          </ScrollableRow>
        </div>

         {/* Growth Camp (Partial) */}
         <div>
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-[16px] font-semibold text-[#161823]">Growth camp</h2>
               <a href="#" className="text-[13px] text-[#80838D] flex items-center hover:text-tiktok-teal">View more <ChevronRight className="w-4 h-4" /></a>
            </div>
            <div className="flex gap-4">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="flex-1 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="bg-[#FFF5E5] text-[#D87C30] text-[11px] font-medium inline-block px-2 py-0.5 rounded-[2px] mb-3">🔥 Strengthen Your Potential</div>
                    <div className="flex items-center gap-2 mb-3">
                       <span className="text-[#2C68FF] text-[11px] bg-[#EAF2FF] px-1.5 py-0.5 rounded-[2px]">Enjoy fee discount</span>
                    </div>
                    <div className="text-[13px] font-medium mb-4 text-[#161823] leading-snug">Go LIVE for 14 hours (at least 1 hour daily)</div>
                    <div className="text-[12px] text-[#FE2C55]">1 days left</div>
                 </div>
               ))}
            </div>
         </div>

      </div>

      {/* Chat Widget */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-[#161823] hover:bg-gray-50 hover:scale-105 transition-all">
          <MessageCircle className="w-6 h-6 text-tiktok-teal" />
          <div className="absolute top-0 right-0 w-3 h-3 bg-[#FE2C55] rounded-full border-2 border-white"></div>
        </button>
      </div>

    </div>
  );
};

export default Dashboard;