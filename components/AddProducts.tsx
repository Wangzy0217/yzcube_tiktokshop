import React from 'react';
import { Plus, Upload, RefreshCw, Search, ChevronDown, ChevronRight, FileText } from 'lucide-react';

const drafts = [
  {
    id: 1,
    title: '【Include 64gb Sd Card】 South Ocean 360-degree rotating camera',
    image: 'https://images.unsplash.com/photo-1589816365538-40b8c54c1538?w=120&q=80',
    daysAgo: 9
  },
  {
    id: 2,
    title: '[ FREE 64GB SD CRAD ] SouthOcean Outdoor CCTV Camera WiFi Waterproof',
    image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=120&q=80',
    daysAgo: 9
  },
  {
    id: 3,
    title: '【 Include 32gb+Car Parfume +Anti Slip Mat 】South Ocean Dash Cam',
    image: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=120&q=80',
    daysAgo: 14
  }
];

const AddProducts: React.FC = () => {
  return (
    <div className="w-[1280px] mx-auto p-8 pb-32">
      <style>{`
        @keyframes fadeInStatic {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-static {
          animation: fadeInStatic 0.5s ease-in-out forwards;
        }
      `}</style>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[24px] font-bold text-[#161823]">Add products</h1>
        <button className="px-4 py-2 bg-[#F2F2F2] hover:bg-[#E8E8E8] text-[#161823] font-medium rounded-[6px] text-[14px] transition-colors">
            Add brand authorization
        </button>
      </div>

      {/* Main Methods Section */}
      <div className="bg-white p-6 rounded-[10px] mb-6">
        <h2 className="text-[16px] font-medium text-[#161823] mb-4">List products with your preferred method</h2>
        
        <div className="grid grid-cols-3 gap-4 h-[220px]">
            {/* Featured Card (Row Span 2) */}
            <div className="row-span-2 bg-[#F2FCFB] p-6 rounded-[10px] border border-transparent hover:border-[#009E91] transition-all flex flex-col relative group">
                <div className="flex items-center gap-2 mb-3">
                    <Plus className="w-5 h-5 text-[#161823]" />
                    <span className="text-[16px] font-bold text-[#161823]">Add individual products</span>
                </div>
                <p className="text-[13px] text-[#80838D] leading-relaxed mb-8 max-w-[280px]">
                    Add products by entering the information yourself.
                </p>
                
                <div className="mt-auto flex w-fit shadow-sm">
                    <button className="bg-[#009E91] hover:bg-[#008C80] text-white px-5 py-2 rounded-l-[6px] text-[14px] font-medium transition-colors">
                        Add product
                    </button>
                    <button className="bg-[#009E91] hover:bg-[#008C80] text-white px-2.5 py-2 rounded-r-[6px] border-l border-[#008C80] flex items-center justify-center transition-colors">
                        <ChevronDown className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Other Cards */}
            {/* Card 1: List an existing product */}
            <div className="bg-[#F8F8F8] hover:bg-[#f0f0f0] p-5 rounded-[10px] border border-transparent transition-all duration-500 cursor-pointer group">
                 <div className="flex gap-3 h-full">
                    <FileText className="w-5 h-5 text-[#161823] flex-shrink-0 mt-0.5" />
                    <div className="flex flex-col h-full w-full">
                        <h3 className="text-[14px] font-bold text-[#161823] mb-1">List an existing product</h3>
                        <p className="text-[12px] text-[#80838D] leading-relaxed group-hover:hidden">Search matching products in TikTok Shop to auto-fill listing information.</p>
                        <div className="hidden group-hover:block mt-2 animate-fade-static">
                             <button className="px-3 py-1.5 bg-[#009E91] hover:bg-[#008C80] text-white text-[13px] font-medium rounded-[4px] transition-colors">
                                Search now
                             </button>
                        </div>
                    </div>
                 </div>
            </div>

            {/* Card 2: Upload in bulk */}
            <div className="bg-[#F8F8F8] hover:bg-[#f0f0f0] p-5 rounded-[10px] border border-transparent transition-all duration-500 cursor-pointer group">
                 <div className="flex gap-3 h-full">
                    <Upload className="w-5 h-5 text-[#161823] flex-shrink-0 mt-0.5" />
                     <div className="flex flex-col h-full w-full">
                        <h3 className="text-[14px] font-bold text-[#161823] mb-1">Upload in bulk</h3>
                        <p className="text-[12px] text-[#80838D] leading-relaxed group-hover:hidden">List multiple products at once using Excel templates.</p>
                        <div className="hidden group-hover:block mt-2 animate-fade-static">
                             <button className="px-3 py-1.5 bg-[#009E91] hover:bg-[#008C80] text-white text-[13px] font-medium rounded-[4px] transition-colors">
                                List now
                             </button>
                        </div>
                    </div>
                 </div>
            </div>

            {/* Card 3: Sync with other platforms */}
            <div className="bg-[#F8F8F8] hover:bg-[#f0f0f0] p-5 rounded-[10px] border border-transparent transition-all duration-500 cursor-pointer group">
                 <div className="flex gap-3 h-full">
                    <RefreshCw className="w-5 h-5 text-[#161823] flex-shrink-0 mt-0.5" />
                     <div className="flex flex-col h-full w-full">
                        <h3 className="text-[14px] font-bold text-[#161823] mb-1">Sync with other platforms</h3>
                        <p className="text-[12px] text-[#80838D] leading-relaxed group-hover:hidden">Use an integration app to sync with other platforms like Amazon, Shopify, eBay, and more.</p>
                         <div className="hidden group-hover:block mt-2 animate-fade-static">
                             <button className="px-3 py-1.5 bg-[#009E91] hover:bg-[#008C80] text-white text-[13px] font-medium rounded-[4px] transition-colors">
                                List now
                             </button>
                        </div>
                    </div>
                 </div>
            </div>

            {/* Card 4: Not-for-sale products */}
            <div className="bg-[#F8F8F8] hover:bg-[#f0f0f0] p-5 rounded-[10px] border border-transparent transition-all duration-500 cursor-pointer group">
                 <div className="flex gap-3 h-full">
                    <Search className="w-5 h-5 text-[#161823] flex-shrink-0 mt-0.5" />
                     <div className="flex flex-col h-full w-full">
                        <h3 className="text-[14px] font-bold text-[#161823] mb-1">Not-for-sale products</h3>
                        <p className="text-[12px] text-[#80838D] leading-relaxed line-clamp-2 group-hover:hidden">Not-for-sale products are only available as gifts through the gift with purchase tool. They can't be purchased directly.</p>
                         <div className="hidden group-hover:block mt-2 animate-fade-static">
                             <button className="px-3 py-1.5 bg-[#009E91] hover:bg-[#008C80] text-white text-[13px] font-medium rounded-[4px] transition-colors">
                                List now
                             </button>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
      </div>

      {/* Drafts Section */}
       <div className="bg-white p-6 rounded-[10px]">
          <div className="flex justify-between items-center mb-4">
              <h2 className="text-[16px] font-medium text-[#161823]">Continue listing your drafts</h2>
              <a href="#" className="text-[13px] text-[#009E91] flex items-center hover:underline font-medium">
                  View more <ChevronRight className="w-4 h-4" />
              </a>
          </div>

          <div className="grid grid-cols-3 gap-4">
              {drafts.map(draft => (
                  <div key={draft.id} className="flex border border-gray-200 rounded-[10px] p-3 gap-3 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="w-[60px] h-[60px] flex-shrink-0 rounded-[6px] overflow-hidden bg-gray-100 border border-gray-100">
                         <img src={draft.image} alt={draft.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                          <div className="text-[13px] font-medium text-[#161823] line-clamp-1 mb-1" title={draft.title}>{draft.title}</div>
                          <div className="text-[12px] text-[#80838D]">Draft created {draft.daysAgo} days ago</div>
                      </div>
                  </div>
              ))}
          </div>
       </div>
    </div>
  );
};

export default AddProducts;