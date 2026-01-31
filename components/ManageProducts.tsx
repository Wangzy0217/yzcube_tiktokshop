import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Filter, ChevronDown, MoreHorizontal, Edit, HelpCircle, ArrowUpDown, ChevronUp, Lightbulb, FileText, ChevronRight, Copy, Eye, Edit2, Info } from 'lucide-react';

interface ProductSku {
  id: string;
  name: string;
  skuCode: string;
  stock: number;
  price: string;
  promotionPrice?: string;
}

// Interface defining the Product structure - ready for DB integration
export interface Product {
  id: string;
  name: string;
  sellerSku: string;
  image: string;
  price: string;
  promotionPrice?: string;
  stock: number;
  itemsSold: number;
  views: number;
  salesRevenue: string;
  status: 'Live' | 'Reviewing' | 'Suspended' | 'Sold Out';
  statusLabel: string;
  updateTime: string;
  skuCount: number;
  uncompetitivePrice?: boolean;
  skus?: ProductSku[];
}

// Mock data - replace this with an API call in the future
const mockProductsData: Product[] = [
  {
    id: '1733698542108903351',
    name: '【Hometown Market Sale 】South Ocean 360-degree rotating camera',
    sellerSku: 'YZ7QXC03IP*1+YZ...',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80',
    price: 'RM319.00',
    promotionPrice: 'RM90.00',
    stock: 401,
    itemsSold: 2350,
    views: 1108763,
    salesRevenue: 'RM190,776.24',
    status: 'Live',
    statusLabel: 'Live',
    updateTime: 'Today 11:55 AM',
    skuCount: 1,
    skus: [
       {
         id: 'sku-1-1',
         name: 'Standard Camera Set',
         skuCode: 'YZ7QXC03IP*1',
         stock: 401,
         price: '319.00',
         promotionPrice: 'RM90.00'
       }
    ]
  },
  {
    id: '1732962033562257335',
    name: '* Mega Sale * South Ocean Outdoor CCTV Camera WiFi Waterproof',
    sellerSku: 'YZ7QXC03IP*1+YZ...',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80',
    price: 'RM619.00 - RM639.00',
    promotionPrice: 'RM189.00',
    stock: 21,
    itemsSold: 11,
    views: 10085,
    salesRevenue: 'RM1,729.62',
    status: 'Live',
    statusLabel: 'Live',
    updateTime: 'Today 10:49 AM',
    skuCount: 2,
    skus: [
      {
        id: 'sku-2-1',
        name: 'WiFi CCTV+64GB+5M Cabel',
        skuCode: 'YZ3CSC28-W*1+YZ3CSO64SD*1+YZPJDCY C-05*1',
        stock: 20,
        price: '619.00',
        promotionPrice: 'RM189.00'
      },
      {
        id: 'sku-2-2',
        name: 'Simcard CCTV+64GB+5M Cabel',
        skuCode: 'YZ3CSC28-G*1+YZ3CSO64SD*1+YZPJDCY C-05*1',
        stock: 1,
        price: '639.00',
        promotionPrice: 'RM189.00'
      }
    ]
  },
  {
    id: '1732228915244206007',
    name: '* FREE SD CARD * South Ocean WiFi CCTV Camera 1080P HD',
    sellerSku: 'YZ7QXC03IP*1+YZ...',
    image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=200&q=80',
    price: 'RM569.00 - RM599.00',
    promotionPrice: 'RM180.00',
    stock: 20,
    itemsSold: 10,
    views: 9080,
    salesRevenue: 'RM1,666.75',
    status: 'Live',
    statusLabel: 'Live',
    updateTime: 'Today 10:49 AM',
    skuCount: 2,
    uncompetitivePrice: true,
    skus: [
      {
        id: 'sku-3-1',
        name: '1080P WiFi Model',
        skuCode: 'YZ3CSC28-W-1080P',
        stock: 15,
        price: '569.00',
        promotionPrice: 'RM180.00'
      },
      {
        id: 'sku-3-2',
        name: '1080P WiFi + 32GB',
        skuCode: 'YZ3CSC28-W-1080P-32',
        stock: 5,
        price: '599.00',
        promotionPrice: 'RM180.00'
      }
    ]
  },
  {
    id: '1730897436091254711',
    name: '* Get 64gb SD Card * South Ocean CCTV Camera Outdoor Waterproof',
    sellerSku: 'YZ7QXC03IP*1+YZ...',
    image: 'https://images.unsplash.com/photo-1593642532400-2682810df593?w=200&q=80',
    price: 'RM569.00 - RM599.00',
    promotionPrice: 'RM170.90',
    stock: 20,
    itemsSold: 22,
    views: 48751,
    salesRevenue: 'RM3,608.25',
    status: 'Live',
    statusLabel: 'Live',
    updateTime: 'Today 10:49 AM',
    skuCount: 2,
    uncompetitivePrice: true,
     skus: [
      {
        id: 'sku-4-1',
        name: 'Outdoor Basic',
        skuCode: 'OUT-BASIC-01',
        stock: 10,
        price: '569.00',
        promotionPrice: 'RM170.90'
      },
      {
        id: 'sku-4-2',
        name: 'Outdoor + 64GB',
        skuCode: 'OUT-64GB-01',
        stock: 10,
        price: '599.00',
        promotionPrice: 'RM170.90'
      }
    ]
  },
  {
    id: '1731757212754216887',
    name: '* Get 64gb SD Card+5M Cabel * South Ocean CCTV 360 PTZ',
    sellerSku: 'YZ7QXC03IP*1+YZ...',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80',
    price: 'RM619.00 - RM639.00',
    promotionPrice: 'RM180.90',
    stock: 14,
    itemsSold: 48,
    views: 77749,
    salesRevenue: 'RM7,821.54',
    status: 'Live',
    statusLabel: 'Live',
    updateTime: 'Today 10:48 AM',
    skuCount: 2,
    skus: [
      {
        id: 'sku-5-1',
        name: '360 PTZ Basic',
        skuCode: 'PTZ-BASIC-01',
        stock: 7,
        price: '619.00',
        promotionPrice: 'RM180.90'
      },
      {
        id: 'sku-5-2',
        name: '360 PTZ + Cable',
        skuCode: 'PTZ-CABLE-01',
        stock: 7,
        price: '639.00',
        promotionPrice: 'RM180.90'
      }
    ]
  }
];

const Tabs = [
  { label: 'All', count: null },
  { label: 'Live', count: 99 },
  { label: 'Reviewing', count: 0 },
  { label: 'Needs attention', count: 17 },
  { label: 'Deactivated', count: null },
  { label: 'Draft', count: null },
  { label: 'Deleted', count: null }
];

const ManageProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Live');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for data
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination State
  const [pageSize, setPageSize] = useState(20);
  const [isPageSizeOpen, setIsPageSizeOpen] = useState(false);
  const pageSizeRef = useRef<HTMLDivElement>(null);

  // State for expanded SKU sections
  const [expandedProductIds, setExpandedProductIds] = useState<Set<string>>(new Set());

  // Edit Popover State
  const [editingTarget, setEditingTarget] = useState<{
    id: string;
    field: 'stock' | 'price';
  } | null>(null);
  
  // Copy ID State
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Refs for click outside
  const popoverRef = useRef<HTMLDivElement>(null);

  // Simulate Fetching Data
  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(mockProductsData);
      setIsLoading(false);
    }, 300); // Simulate network delay

    return () => clearTimeout(timer);
  }, []);

  // Handle click outside for page size dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pageSizeRef.current && !pageSizeRef.current.contains(event.target as Node)) {
        setIsPageSizeOpen(false);
      }
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setEditingTarget(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
  };

  const toggleSelectProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(pId => pId !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const toggleExpand = (id: string) => {
    const newSet = new Set(expandedProductIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedProductIds(newSet);
  };

  const handleCopyId = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openEditPopover = (e: React.MouseEvent, id: string, field: 'stock' | 'price') => {
    e.stopPropagation();
    setEditingTarget({ id, field });
  };

  return (
    <div className="p-6 md:p-8 w-[1600px] mx-auto pb-32">
      
      {/* 1. Header & Page Controls */}
      <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-baseline gap-4">
               <h1 className="text-[24px] font-bold text-[#161823]">Manage Products</h1>
               <a href="#" className="flex items-center gap-1 text-[13px] text-[#009E91] hover:underline font-medium">
                 <Lightbulb className="w-3.5 h-3.5" />
                 Tutorials & Help
               </a>
            </div>
            <div className="flex items-center gap-3">
               <button className="px-3 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-[#161823] text-[13px] font-medium rounded-[4px] transition-colors shadow-sm">
                  Product bundles
               </button>
               <button className="px-3 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-[#161823] text-[13px] font-medium rounded-[4px] flex items-center gap-1 transition-colors shadow-sm">
                  Bulk actions <ChevronDown className="w-4 h-4" />
               </button>
               <div className="flex shadow-sm">
                  <button className="px-4 py-2 bg-[#009E91] hover:bg-[#008C80] text-white text-[13px] font-medium rounded-l-[4px] transition-colors">
                      Add product
                  </button>
                  <button className="px-2 py-2 bg-[#009E91] hover:bg-[#008C80] text-white border-l border-[#008C80] rounded-r-[4px] transition-colors">
                      <ChevronDown className="w-4 h-4" />
                  </button>
               </div>
            </div>
          </div>

          {/* Page Level Tabs */}
          <div className="flex gap-8 border-b border-gray-200/50">
              <button className="pb-3 text-[14px] font-semibold text-[#009E91] border-b-[3px] border-[#009E91] transition-colors">
                Overview
              </button>
              <button className="pb-3 text-[14px] font-medium text-[#5C5F6A] hover:text-[#009E91] transition-colors">
                Improve listing quality
              </button>
          </div>
      </div>

      {/* 2. Main Content Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">

          {/* Status Tabs */}
          <div className="flex border-b border-gray-100 mb-6 overflow-x-auto">
            {Tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`px-4 py-3 text-[13px] font-medium transition-colors relative whitespace-nowrap
                  ${activeTab === tab.label 
                    ? 'text-[#009E91] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#009E91]' 
                    : 'text-[#80838D] hover:text-[#161823]'
                  }`}
              >
                {tab.label}
                {tab.count !== null && <span className="ml-1">{tab.count}</span>}
              </button>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between mb-5 gap-4">
             <div className="flex items-center gap-3 flex-1">
                {/* Search Input */}
                <div className="relative w-[340px]">
                   <input 
                      type="text" 
                      placeholder="Product name, ID, or SKU"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full h-[36px] pl-3 pr-8 border border-[#E5E7EB] rounded-[4px] text-[13px] outline-none focus:border-[#009E91] placeholder-[#B0B3BC] transition-colors"
                   />
                   <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B0B3BC]" />
                </div>

                {/* Category Dropdown */}
                <button className="h-[36px] px-3 border border-[#E5E7EB] rounded-[4px] flex items-center justify-between gap-6 text-[13px] text-[#80838D] hover:border-[#B0B3BC] bg-white min-w-[120px]">
                   Category <ChevronDown className="w-4 h-4" />
                </button>
                
                {/* Sold Out Chip */}
                <button className="h-[36px] px-3 border border-[#E5E7EB] rounded-[4px] text-[13px] text-[#161823] hover:bg-gray-50 bg-white">
                   Sold out 1
                </button>

                {/* Filter Button */}
                <button className="h-[36px] px-4 bg-[#F2F2F2] hover:bg-[#E8E8E8] rounded-[4px] flex items-center gap-1.5 text-[13px] font-medium text-[#161823] transition-colors">
                   <Filter className="w-3.5 h-3.5" />
                   Filter
                </button>
             </div>

             {/* Sort Button */}
             <button className="h-[36px] px-4 bg-[#F2F2F2] hover:bg-[#E8E8E8] rounded-[4px] flex items-center gap-1.5 text-[13px] font-medium text-[#161823] transition-colors">
                <ArrowUpDown className="w-3.5 h-3.5" />
                Sort by
             </button>
          </div>

          {/* Table Container - Removed overflow-hidden to allow popovers to show */}
          <div className="border border-[#E5E7EB] rounded-lg">
              {/* Table Header */}
              <div className="bg-[#F8F8F8] border-b border-[#E5E7EB] flex items-center text-[12px] font-semibold text-[#161823]">
                 <div className="w-[50px] h-[48px] flex items-center justify-center border-r border-transparent">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-[#009E91] focus:ring-[#009E91] cursor-pointer"
                      checked={products.length > 0 && selectedProducts.length === products.length}
                      onChange={toggleSelectAll}
                    />
                 </div>
                 <div className="flex-[2] px-4 h-[48px] flex items-center">Product</div>
                 <div className="w-[200px] px-4 h-[48px] flex items-center gap-1 cursor-pointer hover:bg-gray-100">Performance <HelpCircle className="w-3.5 h-3.5 text-[#B0B3BC]" /> <ArrowUpDown className="w-3 h-3 text-[#B0B3BC]" /></div>
                 <div className="w-[150px] px-4 h-[48px] flex items-center gap-1 cursor-pointer hover:bg-gray-100">Status <ArrowUpDown className="w-3 h-3 text-[#B0B3BC]" /></div>
                 <div className="w-[100px] px-4 h-[48px] flex items-center hover:bg-gray-100 cursor-pointer">Stock</div>
                 <div className="w-[180px] px-4 h-[48px] flex items-center gap-1 cursor-pointer hover:bg-gray-100">Retail price <ArrowUpDown className="w-3 h-3 text-[#B0B3BC]" /></div>
                 <div className="w-[100px] px-4 h-[48px] flex items-center justify-end">Action</div>
              </div>

              {/* Table Content */}
              <div className="bg-white rounded-b-lg">
                {isLoading ? (
                    <div className="p-10 text-center text-gray-400">Loading products...</div>
                ) : (
                    products.map((product) => {
                       const isExpanded = expandedProductIds.has(product.id);
                       const hasMultipleSkus = product.skuCount > 1;

                       // Edit Popover Variables
                       const isEditingStock = editingTarget?.id === product.id && editingTarget?.field === 'stock';
                       const isEditingPrice = editingTarget?.id === product.id && editingTarget?.field === 'price';

                       return (
                       <React.Fragment key={product.id}>
                         <div className="flex border-b border-[#E5E7EB] hover:bg-[#F8F9FB] transition-colors group relative">
                            <div className="w-[50px] py-5 flex items-start justify-center">
                               <input 
                                 type="checkbox" 
                                 className="w-4 h-4 rounded border-gray-300 text-[#009E91] focus:ring-[#009E91] mt-1 cursor-pointer"
                                 checked={selectedProducts.includes(product.id)}
                                 onChange={() => toggleSelectProduct(product.id)}
                               />
                            </div>
                            
                            {/* Product Column */}
                            <div className="flex-[2] py-5 px-4 pl-0 flex gap-4 min-w-0">
                               <div className="w-[70px] h-[70px] border border-[#E5E7EB] rounded-[4px] overflow-hidden flex-shrink-0 relative bg-gray-50">
                                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                               </div>
                               <div className="min-w-0 flex flex-col gap-1">
                                  {/* Title with Eye Icon */}
                                  <div className="relative group/title inline-block">
                                      <div className="text-[14px] text-[#161823] leading-snug line-clamp-2 hover:text-[#009E91] cursor-pointer font-medium pr-6 transition-colors" title={product.name}>
                                        {product.name}
                                      </div>
                                      <div className="absolute top-0 right-0 hidden group-hover/title:flex items-center justify-center bg-white border border-gray-200 shadow-sm rounded p-0.5">
                                         <Eye className="w-3.5 h-3.5 text-[#009E91]" />
                                      </div>
                                  </div>
                                  
                                  {/* ID with Copy Icon */}
                                  <div className="text-[12px] text-[#80838D] flex items-center gap-2 group/id relative w-fit">
                                    <span>ID: {product.id}</span>
                                    <button 
                                      className="hidden group-hover/id:block text-[#009E91] hover:text-[#008C80] transition-colors"
                                      onClick={(e) => handleCopyId(e, product.id)}
                                      title="Copy ID"
                                    >
                                      <Copy className="w-3 h-3" />
                                    </button>
                                    {copiedId === product.id && (
                                       <span className="absolute left-full ml-2 bg-black text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap animate-fade-in">Copied!</span>
                                    )}
                                  </div>

                                  <div className="text-[12px] text-[#80838D] truncate" title={product.sellerSku}>
                                    Seller SKU: {product.sellerSku}
                                  </div>
                               </div>
                            </div>

                            {/* Performance Column */}
                            <div className="w-[200px] py-5 px-4 flex flex-col justify-start gap-1">
                               <div className="text-[14px] text-[#161823]">{product.itemsSold} items sold</div>
                               <div className="text-[12px] text-[#80838D]">Views: {product.views}</div>
                               <div className="text-[12px] text-[#80838D]">Sales: {product.salesRevenue}</div>
                            </div>

                            {/* Status Column */}
                            <div className="w-[150px] py-5 px-4 flex flex-col justify-start gap-1">
                               <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${product.status === 'Live' ? 'bg-[#2CB686]' : 'bg-gray-400'}`}></div>
                                  <span className="text-[14px] text-[#161823]">{product.statusLabel}</span>
                               </div>
                               <div className="text-[12px] text-[#80838D]">{product.updateTime}</div>
                            </div>

                            {/* Stock Column (Interactive) */}
                            <div className="w-[100px] py-5 px-4 relative">
                               <div 
                                 className="flex items-center gap-2 group/stock cursor-pointer w-fit"
                                 onClick={(e) => openEditPopover(e, product.id, 'stock')}
                               >
                                  <span className={`text-[14px] font-medium ${product.stock < 20 ? 'text-[#D87C30]' : 'text-[#161823]'}`}>
                                    {product.stock}
                                  </span>
                                  <Edit2 className="w-3.5 h-3.5 text-[#009E91] opacity-0 group-hover/stock:opacity-100 transition-opacity" />
                               </div>

                               {/* Stock Popover */}
                               {isEditingStock && (
                                 <div 
                                   ref={popoverRef}
                                   className="absolute top-12 left-0 w-[320px] bg-white rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.15)] border border-gray-200 z-50 p-4 animate-fade-in cursor-default text-left"
                                   onClick={(e) => e.stopPropagation()}
                                 >
                                    <h3 className="text-[14px] font-semibold text-[#161823] mb-3">Total stock</h3>
                                    <div className="flex items-center justify-between mb-4">
                                      <input 
                                        type="text" 
                                        defaultValue={product.stock}
                                        className="w-full h-[32px] px-2 border border-gray-300 rounded-[4px] text-[13px] outline-none focus:border-[#009E91]"
                                      />
                                    </div>
                                    <div className="space-y-2 mb-4">
                                       <div className="flex justify-between text-[13px] text-[#161823]">
                                          <span>Available</span>
                                          <span>{product.stock}</span>
                                       </div>
                                       <div className="flex justify-between text-[13px] text-[#161823]">
                                          <span className="flex items-center gap-1">Creator <HelpCircle className="w-3 h-3 text-gray-400" /></span>
                                          <span>0</span>
                                       </div>
                                       <div className="flex justify-between text-[13px] text-[#161823]">
                                          <span className="flex items-center gap-1">Campaign <HelpCircle className="w-3 h-3 text-gray-400" /></span>
                                          <span>0</span>
                                       </div>
                                       <div className="flex justify-between text-[13px] text-[#161823]">
                                          <span className="flex items-center gap-1">Committed <HelpCircle className="w-3 h-3 text-gray-400" /></span>
                                          <span>10</span>
                                       </div>
                                    </div>
                                    <p className="text-[12px] text-[#80838D] leading-tight mb-3">
                                      Total stock includes committed stock. Data may not match between the pop-up and main table.
                                    </p>
                                    <div className="h-[1px] bg-gray-100 w-full mb-3"></div>
                                    
                                    <h4 className="text-[13px] font-semibold text-[#161823] mb-2">Storage details</h4>
                                    <div className="flex justify-between text-[13px] text-[#161823] mb-4">
                                        <span>Malaysia Pickup Warehouse</span>
                                        <span>{product.stock}</span>
                                    </div>

                                    <div className="flex justify-end gap-2 mb-3">
                                        <button 
                                          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-[#161823] text-[13px] font-medium rounded-[4px] transition-colors"
                                          onClick={() => setEditingTarget(null)}
                                        >
                                          Cancel
                                        </button>
                                        <button 
                                          className="px-3 py-1.5 bg-[#009E91] hover:bg-[#008C80] text-white text-[13px] font-medium rounded-[4px] transition-colors"
                                          onClick={() => setEditingTarget(null)}
                                        >
                                          Save
                                        </button>
                                    </div>

                                    <div className="text-[12px] text-[#80838D]">
                                       SKU alert value (days of supply): 14 <span className="text-[#009E91] cursor-pointer hover:underline">Set</span>
                                    </div>
                                    
                                    {/* Arrow */}
                                    <div className="absolute -top-1.5 left-8 w-3 h-3 bg-white border-t border-l border-gray-200 transform rotate-45"></div>
                                 </div>
                               )}
                            </div>

                            {/* Retail Price Column (Interactive) */}
                            <div className="w-[180px] py-5 px-4 flex flex-col justify-start gap-1 relative">
                               <div 
                                 className="cursor-pointer group/price w-fit"
                                 onClick={(e) => openEditPopover(e, product.id, 'price')}
                               >
                                  <div className="flex items-center gap-2">
                                     <div className="text-[14px] font-medium text-[#161823]">{product.price}</div>
                                     <Edit2 className="w-3.5 h-3.5 text-[#009E91] opacity-0 group-hover/price:opacity-100 transition-opacity" />
                                  </div>
                                  {product.promotionPrice && (
                                    <div className="text-[12px] text-[#80838D]">Promotion: {product.promotionPrice}</div>
                                  )}
                                  {product.uncompetitivePrice && (
                                    <div className="text-[12px] text-[#009E91] hover:underline cursor-pointer">Uncompetitive price</div>
                                  )}
                               </div>

                               {/* Price Popover */}
                               {isEditingPrice && (
                                 <div 
                                   ref={popoverRef}
                                   className="absolute top-12 left-0 w-[280px] bg-white rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.15)] border border-gray-200 z-50 p-4 animate-fade-in cursor-default text-left"
                                   onClick={(e) => e.stopPropagation()}
                                 >
                                    <h3 className="text-[14px] font-semibold text-[#161823] mb-3">Retail price</h3>
                                    <div className="flex items-center gap-2 mb-4 border border-gray-300 rounded-[4px] px-2 h-[32px] focus-within:border-[#009E91]">
                                      <span className="text-[13px] text-[#80838D]">RM</span>
                                      <input 
                                        type="text" 
                                        defaultValue={product.price.replace('RM', '').split(' - ')[0]} // Basic parsing for mock
                                        className="flex-1 h-full text-[13px] outline-none"
                                      />
                                    </div>

                                    <div className="mb-4">
                                       <div className="flex items-center gap-1 text-[13px] font-medium text-[#161823] mb-2">
                                          Promotion: <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                                       </div>
                                       <div className="flex items-center gap-2">
                                          <span className="text-[13px] text-[#161823]">{product.promotionPrice || product.price}</span>
                                          <span className="bg-[#F2F2F2] text-[#161823] text-[11px] px-1.5 py-0.5 rounded-[2px]">Flash sale</span>
                                       </div>
                                    </div>

                                    <div className="flex justify-end gap-2">
                                        <button 
                                          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-[#161823] text-[13px] font-medium rounded-[4px] transition-colors"
                                          onClick={() => setEditingTarget(null)}
                                        >
                                          Cancel
                                        </button>
                                        <button 
                                          className="px-3 py-1.5 bg-[#009E91] hover:bg-[#008C80] text-white text-[13px] font-medium rounded-[4px] transition-colors"
                                          onClick={() => setEditingTarget(null)}
                                        >
                                          Save
                                        </button>
                                    </div>

                                    {/* Arrow */}
                                    <div className="absolute -top-1.5 left-8 w-3 h-3 bg-white border-t border-l border-gray-200 transform rotate-45"></div>
                                 </div>
                               )}
                            </div>

                            {/* Action Column */}
                            <div className="w-[100px] py-5 px-4 flex items-start justify-end gap-2">
                                <button className="w-8 h-8 flex items-center justify-center rounded-[4px] bg-[#F2F2F2] hover:bg-[#E5E5E5] text-[#161823] transition-colors" title="Edit">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-[4px] bg-[#F2F2F2] hover:bg-[#E5E5E5] text-[#161823] transition-colors" title="More">
                                  <MoreHorizontal className="w-4 h-4" />
                                </button>
                            </div>
                         </div>
                         
                         {/* SKU Logic - Only show if SKU Count > 1 */}
                         {hasMultipleSkus && (
                            <div className={`border-b border-[#E5E7EB] ${isExpanded ? 'bg-[#FAFAFA]' : 'bg-white'}`}>
                              
                              {/* Header / Expand Trigger */}
                              <div className={`flex items-center px-4 py-2 ${isExpanded ? 'bg-[#F2F2F2]/50' : ''}`}>
                                 <div className="w-[50px]"></div> {/* Spacing for Checkbox align */}
                                 <div className="flex-1 flex justify-between items-center">
                                    <div 
                                      className="text-[13px] text-[#80838D] cursor-pointer"
                                      onClick={() => toggleExpand(product.id)}
                                    >
                                       {product.skuCount} SKUs
                                    </div>
                                    
                                    <div className="flex items-center gap-4">
                                       {isExpanded ? (
                                          <>
                                            <button className="flex items-center gap-1 text-[13px] text-[#161823] bg-[#E8E8E8] hover:bg-[#dcdcdc] px-2 py-1 rounded-[2px] transition-colors">
                                               Batch edit <ChevronDown className="w-3.5 h-3.5" />
                                            </button>
                                            <div className="h-3 w-[1px] bg-gray-300"></div>
                                            <button 
                                              className="flex items-center gap-1 text-[13px] text-[#80838D] hover:text-[#161823] transition-colors"
                                              onClick={() => toggleExpand(product.id)}
                                            >
                                               Collapse <ChevronUp className="w-3.5 h-3.5" />
                                            </button>
                                          </>
                                       ) : (
                                          <button 
                                              className="flex items-center gap-1 text-[13px] text-[#80838D] hover:text-[#009E91] transition-colors"
                                              onClick={() => toggleExpand(product.id)}
                                           >
                                              Expand <ChevronDown className="w-3.5 h-3.5" />
                                           </button>
                                       )}
                                    </div>
                                 </div>
                              </div>

                              {/* Expanded SKU List */}
                              {isExpanded && product.skus && (
                                 <div className="pb-2 animate-fade-in">
                                    {product.skus.map((sku) => (
                                       <div key={sku.id} className="flex border-t border-dashed border-gray-200 last:border-b-0 py-4 px-4 bg-white hover:bg-[#F8F9FB] transition-colors">
                                          <div className="w-[50px]"></div> {/* Checkbox spacer */}
                                          
                                          {/* SKU Info - Matches Product+Performance+Status width approx */}
                                          <div className="flex-[3] pr-4 min-w-0">
                                             <div className="text-[13px] font-medium text-[#161823] mb-1">{sku.name}</div>
                                             <div className="text-[12px] text-[#80838D] break-all">{sku.skuCode}</div>
                                          </div>

                                          {/* Stock Input - Aligns with Stock Col */}
                                          <div className="w-[100px] flex items-start">
                                             <input 
                                                type="text" 
                                                defaultValue={sku.stock}
                                                className="w-[80px] h-[32px] px-2 border border-gray-300 rounded-[4px] text-[13px] outline-none focus:border-[#009E91] transition-colors"
                                             />
                                          </div>

                                          {/* Price Input - Aligns with Price Col */}
                                          <div className="w-[180px] flex flex-col gap-1">
                                             <div className="flex items-center">
                                                <span className="text-[12px] text-[#80838D] mr-2">RM</span>
                                                <input 
                                                   type="text" 
                                                   defaultValue={sku.price}
                                                   className="flex-1 h-[32px] px-2 border border-gray-300 rounded-[4px] text-[13px] outline-none focus:border-[#009E91] transition-colors font-medium"
                                                />
                                             </div>
                                             {sku.promotionPrice && (
                                                <div className="text-[11px] text-[#80838D] text-right">Promotion: {sku.promotionPrice}</div>
                                             )}
                                          </div>
                                          
                                          {/* Action Spacer */}
                                          <div className="w-[100px]"></div>
                                       </div>
                                    ))}
                                 </div>
                              )}
                            </div>
                         )}
                       </React.Fragment>
                    )})
                )}
              </div>
          </div>

           {/* Pagination Footer */}
           <div className="py-6 flex justify-between items-center text-[13px] text-[#80838D]">
               <div className="flex items-center gap-4">
                 <div>Showing 1-{products.length} of {products.length}</div>
                 
                 {/* Page Size Selector */}
                 <div className="relative" ref={pageSizeRef}>
                    <button 
                      onClick={() => setIsPageSizeOpen(!isPageSizeOpen)}
                      className="flex items-center gap-1 hover:text-[#161823] transition-colors bg-white border border-transparent hover:border-gray-200 px-2 py-1 rounded"
                    >
                      {pageSize} / page <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    {isPageSizeOpen && (
                      <div className="absolute bottom-full left-0 mb-1 w-[100px] bg-white border border-gray-200 shadow-lg rounded-[4px] py-1 z-10">
                        {[20, 50, 100].map(size => (
                          <button
                            key={size}
                            onClick={() => {
                              setPageSize(size);
                              setIsPageSizeOpen(false);
                            }}
                            className={`w-full text-left px-3 py-1.5 hover:bg-gray-50 text-[13px] ${pageSize === size ? 'text-[#009E91] font-medium' : 'text-[#161823]'}`}
                          >
                            {size} / page
                          </button>
                        ))}
                      </div>
                    )}
                 </div>
               </div>

               <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Prev</button>
                  <button className="px-3 py-1.5 bg-[#effaf9] text-[#009E91] border border-[#009E91] rounded font-medium">1</button>
                  <button className="px-3 py-1.5 border border-gray-200 rounded hover:bg-gray-50">2</button>
                  <button className="px-3 py-1.5 border border-gray-200 rounded hover:bg-gray-50">3</button>
                  <span className="px-1">...</span>
                  <button className="px-3 py-1.5 border border-gray-200 rounded hover:bg-gray-50">Next</button>
               </div>
           </div>
      </div>
    </div>
  );
};

export default ManageProducts;