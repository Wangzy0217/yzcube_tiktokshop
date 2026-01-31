import React, { useState, useRef, useEffect } from 'react';
import { 
  HelpCircle, 
  Image as ImageIcon, 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Link as LinkIcon,
  Video,
  ChevronDown,
  Megaphone,
  ArrowLeft,
  Upload,
  Smartphone,
  Monitor,
  Lock,
  Trash2,
  Eye,
  Edit2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  X,
  FolderOpen,
  Image
} from 'lucide-react';

interface ProductEditorProps {
  onCancel: () => void;
}

const PLACEHOLDER_URLS = [
  "https://lf16-scmcdn.oecstatic.com/obj/oec-magellan-sg/i18n/ecom/next/product_listing_page/assets/image-upload-placeholder-01.l6yk282c.png",
  "https://lf16-scmcdn.oecstatic.com/obj/oec-magellan-sg/i18n/ecom/next/product_listing_page/assets/image-upload-placeholder-02.jh8uddfo.png",
  "https://lf16-scmcdn.oecstatic.com/obj/oec-magellan-sg/i18n/ecom/next/product_listing_page/assets/image-upload-placeholder-03.iz06ibr0.png",
  "https://lf16-scmcdn.oecstatic.com/obj/oec-magellan-sg/i18n/ecom/next/product_listing_page/assets/image-upload-placeholder-04.pfu1gkcr.png",
  "https://lf16-scmcdn.oecstatic.com/obj/oec-magellan-sg/i18n/ecom/next/product_listing_page/assets/image-upload-placeholder-05.n79diafj.png",
  "https://lf16-scmcdn.oecstatic.com/obj/oec-magellan-sg/i18n/ecom/next/product_listing_page/assets/image-upload-placeholder-06.gqw624xw.png",
  "https://lf16-scmcdn.oecstatic.com/obj/oec-magellan-sg/i18n/ecom/next/product_listing_page/assets/image-upload-placeholder-07.evahojhc.png",
  "https://lf16-scmcdn.oecstatic.com/obj/oec-magellan-sg/i18n/ecom/next/product_listing_page/assets/image-upload-placeholder-08.i450u3x7.png"
];

const ProductEditor: React.FC<ProductEditorProps> = ({ onCancel }) => {
  const [activeSection, setActiveSection] = useState('basic');
  
  // Image State
  // Index 0 is Main Image. Indices 1-8 are secondary.
  // We initialize with empty strings or nulls to represent slots
  const [images, setImages] = useState<(string | null)[]>(Array(9).fill(null));
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingImageIndex, setEditingImageIndex] = useState<number | null>(null);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
  const [descriptionContent, setDescriptionContent] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeUploadIndexRef = useRef<number | null>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  // Refs for scrolling sections
  const basicRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const salesRef = useRef<HTMLDivElement>(null);
  const shippingRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    let ref = basicRef;
    if (section === 'details') ref = detailsRef;
    if (section === 'sales') ref = salesRef;
    if (section === 'shipping') ref = shippingRef;

    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // --- Image Handling Logic ---

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeUploadIndexRef.current !== null) {
      const url = URL.createObjectURL(file);
      const newImages = [...images];
      newImages[activeUploadIndexRef.current] = url;
      setImages(newImages);
    }
    // Reset
    activeUploadIndexRef.current = null;
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerUpload = (index: number) => {
    activeUploadIndexRef.current = index;
    fileInputRef.current?.click();
  };

  const deleteImage = (index: number) => {
    const newImages = [...images];
    newImages[index] = null;
    
    // Shift remaining images left to fill gap, but keep index 0 as main
    // Actually, usually in these UIs, if you delete a secondary image, the others shift.
    // If you delete main, the first secondary might become main or it stays empty.
    // Let's implement simple shifting for now:
    // Filter out nulls, then pad with nulls
    const validImages = newImages.filter(img => img !== null);
    const resultImages = Array(9).fill(null);
    validImages.forEach((img, i) => {
        resultImages[i] = img;
    });
    
    setImages(resultImages);
  };

  const openEditModal = (index: number) => {
    setEditingImageIndex(index);
    setAspectRatio('1:1');
    setIsEditModalOpen(true);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto p-6 pb-32 relative">
        <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
        />

        {/* Edit Image Modal */}
        {isEditModalOpen && editingImageIndex !== null && images[editingImageIndex] && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="bg-white rounded-[8px] w-[800px] h-[550px] flex flex-col shadow-2xl overflow-hidden animate-fade-in">
                    {/* Modal Header */}
                    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                        <h3 className="text-[16px] font-bold text-[#161823]">Edit image</h3>
                        <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Modal Content */}
                    <div className="flex-1 flex min-h-0">
                        {/* Left: Image Canvas */}
                        <div className="flex-1 bg-[#F2F2F2] flex items-center justify-center p-8 relative overflow-hidden">
                             {/* Grid Lines Overlay Simulation */}
                             <div className="relative shadow-sm" style={{ 
                                 width: aspectRatio === '1:1' ? '300px' : aspectRatio === '3:4' ? '240px' : '320px',
                                 height: aspectRatio === '1:1' ? '300px' : aspectRatio === '3:4' ? '320px' : '240px',
                             }}>
                                <img 
                                    src={images[editingImageIndex]!} 
                                    alt="Editing" 
                                    className="w-full h-full object-cover" 
                                />
                                {/* Crop Grid Lines */}
                                <div className="absolute inset-0 border border-white/50 pointer-events-none">
                                    <div className="absolute top-1/3 left-0 right-0 h-px bg-white/50"></div>
                                    <div className="absolute top-2/3 left-0 right-0 h-px bg-white/50"></div>
                                    <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/50"></div>
                                    <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/50"></div>
                                    {/* Corners */}
                                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white"></div>
                                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white"></div>
                                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white"></div>
                                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white"></div>
                                </div>
                             </div>
                        </div>

                        {/* Right: Controls */}
                        <div className="w-[280px] border-l border-gray-100 flex flex-col">
                            <div className="p-6 space-y-8">
                                {/* Basic Controls */}
                                <div>
                                    <h4 className="text-[14px] font-medium text-[#161823] mb-3">Basic</h4>
                                    
                                    {/* Aspect Ratio */}
                                    <div className="flex gap-2 mb-4">
                                        <div className="relative w-[100px]">
                                            <select 
                                                className="w-full h-[32px] px-2 border border-gray-200 rounded-[4px] text-[13px] outline-none appearance-none bg-white cursor-pointer hover:border-gray-300"
                                                value={aspectRatio}
                                                onChange={(e) => setAspectRatio(e.target.value)}
                                            >
                                                <option value="1:1">1:1</option>
                                                <option value="3:4">3:4</option>
                                                <option value="4:3">4:3</option>
                                            </select>
                                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                                        </div>
                                        <div className="flex bg-[#F2F2F2] rounded-[4px] p-1">
                                            <button className="p-1 hover:bg-white rounded transition-colors text-gray-600" title="Zoom In"><ZoomIn className="w-4 h-4" /></button>
                                            <div className="w-px bg-gray-300 mx-1"></div>
                                            <button className="p-1 hover:bg-white rounded transition-colors text-gray-600" title="Zoom Out"><ZoomOut className="w-4 h-4" /></button>
                                        </div>
                                        <button className="p-1.5 bg-[#F2F2F2] hover:bg-gray-200 rounded-[4px] transition-colors text-gray-600" title="Rotate"><RotateCw className="w-4 h-4" /></button>
                                        <button className="text-[13px] text-[#009E91] hover:underline ml-auto">Reset</button>
                                    </div>
                                </div>

                                {/* Advanced Controls */}
                                <div>
                                    <h4 className="text-[14px] font-medium text-[#161823] mb-3">Advanced</h4>
                                    <button className="px-3 py-1.5 bg-[#F2F2F2] hover:bg-[#E8E8E8] text-[#161823] text-[13px] font-medium rounded-[4px] flex items-center gap-2 transition-colors w-fit">
                                        <span className="text-tiktok-teal">✨</span> AI optimize
                                    </button>
                                </div>
                            </div>

                            {/* Footer Buttons */}
                            <div className="mt-auto p-6 border-t border-gray-100 flex justify-end gap-3">
                                <button 
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 border border-gray-200 rounded-[4px] text-[14px] font-medium hover:bg-gray-50 text-[#161823] transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 bg-[#009E91] hover:bg-[#008C80] text-white rounded-[4px] text-[14px] font-medium transition-colors"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Top Header */}
        <div className="flex items-center justify-between mb-6 sticky top-0 z-30 bg-[#f8f8f8] py-2">
            <div className="flex items-center gap-4">
                <button onClick={onCancel} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-[#161823]" />
                </button>
                <h1 className="text-[24px] font-bold text-[#161823]">Add product</h1>
            </div>
            
            <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-200 rounded-full text-gray-500">
                    <HelpCircle className="w-5 h-5" />
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-[4px] text-[14px] font-medium text-[#161823] hover:bg-gray-50 flex items-center gap-2 transition-colors">
                    <span className="w-3.5 h-3.5 border border-gray-400 rounded-[1px]"></span>
                    Save as draft
                </button>
                <button className="px-4 py-2 bg-[#009E91] hover:bg-[#008C80] text-white rounded-[4px] text-[14px] font-medium transition-colors flex items-center gap-2">
                    Submit for review
                </button>
            </div>
        </div>

        <div className="flex gap-6 items-start">
            {/* Left Sidebar (Anchor Navigation) */}
            <div className="w-[260px] flex-shrink-0 sticky top-24 space-y-4">
                
                {/* Navigation Menu */}
                <div className="bg-white rounded-[8px] p-4">
                    <div className="flex items-start gap-2 mb-4">
                        <Megaphone className="w-4 h-4 text-[#161823] mt-1" />
                        <div>
                            <h3 className="text-[16px] font-normal text-[#161823]">Suggestions</h3>
                            <p className="text-[12px] text-[#80838D] mt-1 leading-relaxed">
                                Complete product information can help increase your product exposure.
                            </p>
                        </div>
                    </div>
                    
                    <div className="space-y-1">
                        {[
                            { id: 'basic', label: 'Basic information' },
                            { id: 'details', label: 'Product details' },
                            { id: 'sales', label: 'Sales information' },
                            { id: 'shipping', label: 'Shipping' }
                        ].map((item) => (
                            <button 
                              key={item.id}
                              onClick={() => scrollToSection(item.id)}
                              className={`w-full text-left px-4 py-4 text-[16px] transition-colors rounded-[4px]
                                ${activeSection === item.id 
                                    ? 'bg-[#F9F9F9] text-[#161823] font-normal' 
                                    : 'text-[#161823] hover:bg-[#F8F8F8] font-normal'}
                              `}
                            >
                              {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Preview Card */}
                <div className="bg-white rounded-[8px] p-4">
                    <div className="flex items-center gap-2 mb-4">
                        <h3 className="text-[16px] font-bold text-[#161823]">Preview</h3>
                        <HelpCircle className="w-3.5 h-3.5 text-[#80838D]" />
                    </div>
                    
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-[13px] text-[#161823]">Product details</span>
                        <div className="flex items-center gap-2">
                             <Lock className="w-3.5 h-3.5 text-gray-400" />
                             <div className="bg-[#F2F2F2] p-1 rounded-[2px]">
                                <Monitor className="w-3.5 h-3.5 text-gray-400" />
                             </div>
                             <div className="bg-[#F2F2F2] p-1 rounded-[2px]">
                                <Smartphone className="w-3.5 h-3.5 text-gray-400" />
                             </div>
                        </div>
                    </div>

                    <div className="w-full h-[200px] bg-[#F8F8F8] rounded-[4px] border border-gray-100"></div>
                </div>
            </div>

            {/* Right Form Content */}
            <div className="w-[852px] space-y-6 flex-shrink-0">
                
                {/* 1. Basic Information */}
                <div ref={basicRef} className="bg-white rounded-[8px] p-8 scroll-mt-24">
                    <h2 className="text-[20px] font-bold text-[#161823] mb-6">Basic information</h2>
                    
                    <div className="space-y-8">
                        {/* Images Section */}
                        <div>
                             <div className="flex items-center gap-1 mb-2">
                                <span className="text-red-500">*</span>
                                <label className="text-[14px] font-medium text-[#161823]">Images</label>
                                <HelpCircle className="w-3.5 h-3.5 text-[#80838D]" />
                             </div>
                             <p className="text-[12px] text-[#80838D] mb-4">
                                It's recommended to include at least 5 images to adequately represent your product.
                             </p>

                             <div className="flex gap-4 items-start">
                                 {/* MAIN IMAGE UPLOADER (Index 0) */}
                                 {(() => {
                                     const hasImage = !!images[0];
                                     return (
                                        <div className="w-[252px] h-[252px] flex-shrink-0 relative group hover:z-30">
                                            {hasImage ? (
                                                <div className="w-full h-full relative rounded-[4px] overflow-hidden border border-gray-200 bg-gray-50">
                                                    <img src={images[0]!} alt="Main" className="w-full h-full object-cover" />
                                                    
                                                    {/* Bottom Label */}
                                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[12px] text-center py-1">
                                                        Main image
                                                    </div>

                                                    {/* Hover Overlay */}
                                                    <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center gap-3 transition-all z-10">
                                                        <button 
                                                            className="p-1.5 bg-white/20 hover:bg-white/40 rounded text-white backdrop-blur-sm transition-colors"
                                                            onClick={() => window.open(images[0]!, '_blank')}
                                                            title="View"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                        <button 
                                                            className="p-1.5 bg-white/20 hover:bg-white/40 rounded text-white backdrop-blur-sm transition-colors"
                                                            onClick={() => openEditModal(0)}
                                                            title="Edit"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button 
                                                            className="p-1.5 bg-white/20 hover:bg-white/40 rounded text-white backdrop-blur-sm transition-colors"
                                                            onClick={() => deleteImage(0)}
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="w-full h-full border border-dashed border-[#E5E7EB] group-hover:border-[#009E91] group-hover:bg-[#F0FBF9] rounded-[4px] flex flex-col items-center justify-center relative transition-all duration-200">
                                                    {/* Default State */}
                                                    <div className="flex flex-col items-center">
                                                        <Upload className="w-6 h-6 text-[#161823] mb-2" />
                                                        <span className="text-[13px] text-[#161823]">Upload main image</span>
                                                    </div>

                                                    {/* Popover - Above the slot */}
                                                    <div className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 bg-white rounded-[4px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] p-2 hidden group-hover:flex flex-col gap-1 z-50 w-[140px] border border-gray-100 animate-fade-in after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[6px] after:border-transparent after:border-t-white">
                                                        <button 
                                                            onClick={() => triggerUpload(0)}
                                                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-[4px] text-[13px] text-[#161823] transition-colors"
                                                        >
                                                            <FolderOpen className="w-3.5 h-3.5" /> Local file
                                                        </button>
                                                        <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-[4px] text-[13px] text-[#161823] transition-colors">
                                                            <Image className="w-3.5 h-3.5" /> Media center
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                     );
                                 })()}
                                 
                                 {/* Grid of secondary images (Indices 1-8) */}
                                 <div className="grid grid-cols-4 gap-4">
                                     {PLACEHOLDER_URLS.map((placeholder, i) => {
                                         const index = i + 1; // 1-based index for logic
                                         const hasImage = !!images[index];
                                         // Enabled if previous slot is filled. 
                                         // For index 1, enabled if index 0 filled.
                                         // For index 2, enabled if index 1 filled.
                                         const isEnabled = !!images[index - 1];

                                         return (
                                             <div key={index} className="relative group w-[118px] h-[118px] hover:z-30">
                                                {hasImage ? (
                                                    <div className="w-full h-full relative rounded-[4px] overflow-hidden border border-gray-200 bg-gray-50">
                                                        <img src={images[index]!} alt={`Image ${index}`} className="w-full h-full object-cover" />
                                                        
                                                        {/* Hover Overlay */}
                                                        <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center gap-2 transition-all z-10">
                                                            <button 
                                                                className="p-1 bg-white/20 hover:bg-white/40 rounded text-white backdrop-blur-sm transition-colors"
                                                                onClick={() => window.open(images[index]!, '_blank')}
                                                            >
                                                                <Eye className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button 
                                                                className="p-1 bg-white/20 hover:bg-white/40 rounded text-white backdrop-blur-sm transition-colors"
                                                                onClick={() => openEditModal(index)}
                                                            >
                                                                <Edit2 className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button 
                                                                className="p-1 bg-white/20 hover:bg-white/40 rounded text-white backdrop-blur-sm transition-colors"
                                                                onClick={() => deleteImage(index)}
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className={`w-full h-full rounded-[4px] border ${isEnabled ? 'border-dashed border-[#E5E7EB] hover:border-[#009E91] hover:bg-[#F0FBF9]' : 'border-transparent'} bg-[#F8F8F8] flex items-center justify-center relative transition-all duration-200`}>
                                                        <img 
                                                            src={placeholder} 
                                                            alt="Placeholder" 
                                                            className={`w-1/2 h-1/2 object-contain opacity-50 ${!isEnabled ? 'grayscale opacity-30' : ''}`} 
                                                        />
                                                        
                                                        {/* Popover (Only if Enabled) - Above the slot */}
                                                        {isEnabled && (
                                                            <div className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 bg-white rounded-[4px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] p-1.5 hidden group-hover:flex flex-col gap-0.5 z-50 w-[130px] border border-gray-100 animate-fade-in after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[6px] after:border-transparent after:border-t-white">
                                                                <button 
                                                                    onClick={() => triggerUpload(index)}
                                                                    className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded-[2px] text-[12px] text-[#161823] transition-colors"
                                                                >
                                                                    <FolderOpen className="w-3 h-3" /> Local file
                                                                </button>
                                                                <button className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded-[2px] text-[12px] text-[#161823] transition-colors">
                                                                    <Image className="w-3 h-3" /> Media center
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                             </div>
                                         );
                                     })}
                                 </div>
                             </div>
                        </div>

                        {/* Product Name */}
                        <div>
                            <div className="flex items-center gap-1 mb-2">
                                <span className="text-red-500">*</span>
                                <label className="text-[14px] font-medium text-[#161823]">Product name</label>
                                <HelpCircle className="w-3.5 h-3.5 text-[#80838D]" />
                             </div>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    className="w-full h-[32px] px-3 border border-gray-300 rounded-[4px] outline-none focus:border-[#009E91] text-[14px] placeholder-gray-400"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-gray-400">0/255</span>
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                             <div className="flex items-center justify-between mb-2">
                                 <div className="flex items-center gap-1">
                                    <span className="text-red-500">*</span>
                                    <label className="text-[14px] font-medium text-[#161823]">Category</label>
                                    <HelpCircle className="w-3.5 h-3.5 text-[#80838D]" />
                                 </div>
                             </div>
                             
                             <div className="w-full h-[32px] px-3 border border-gray-300 rounded-[4px] flex items-center justify-between cursor-pointer bg-white hover:border-gray-400">
                                 <span className="text-[14px] text-gray-400"></span>
                                 <ChevronDown className="w-4 h-4 text-gray-400" />
                             </div>
                        </div>
                    </div>
                </div>

                {/* 2. Product Details */}
                <div ref={detailsRef} className="bg-white rounded-[8px] p-8 scroll-mt-24">
                     <h2 className="text-[20px] font-bold text-[#161823] mb-6">Product details</h2>
                     
                     {/* Product Description - Rich Text Editor */}
                     <div>
                        <div className="flex items-center gap-1 mb-2">
                            <span className="text-red-500">*</span>
                            <label className="text-[14px] font-medium text-[#161823]">Product description</label>
                            <HelpCircle className="w-3.5 h-3.5 text-[#80838D]" />
                        </div>
                        
                        <div className="border border-gray-300 rounded-[4px] overflow-hidden focus-within:border-[#009E91] transition-colors relative">
                            {/* Toolbar */}
                            <div className="bg-[#F8F8F8] border-b border-gray-300 p-2 flex items-center gap-1 flex-wrap">
                                <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600" title="Bold"><Bold className="w-4 h-4" /></button>
                                <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600" title="Italic"><Italic className="w-4 h-4" /></button>
                                <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600" title="Underline"><Underline className="w-4 h-4" /></button>
                                <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
                                <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600" title="Bullet List"><List className="w-4 h-4" /></button>
                                <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600" title="Ordered List"><ListOrdered className="w-4 h-4" /></button>
                                <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
                                <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600" title="Align Left"><AlignLeft className="w-4 h-4" /></button>
                                <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600" title="Align Center"><AlignCenter className="w-4 h-4" /></button>
                                <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600" title="Align Right"><AlignRight className="w-4 h-4" /></button>
                                <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
                                <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600" title="Insert Image"><ImageIcon className="w-4 h-4" /></button>
                                <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600" title="Insert Video"><Video className="w-4 h-4" /></button>
                                <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600" title="Insert Link"><LinkIcon className="w-4 h-4" /></button>
                            </div>
                            
                            {/* Editor Area */}
                            <div className="relative">
                                {!isDescriptionFocused && descriptionContent.trim() === '' && (
                                    <div className="absolute top-4 left-4 text-gray-400 text-[14px] pointer-events-none">
                                        Enter your product description here...
                                    </div>
                                )}
                                <div 
                                    className="min-h-[400px] p-4 bg-white outline-none text-[14px] leading-relaxed" 
                                    contentEditable
                                    ref={descriptionRef}
                                    onFocus={() => setIsDescriptionFocused(true)}
                                    onBlur={() => {
                                        setIsDescriptionFocused(false);
                                        if (descriptionRef.current) {
                                            setDescriptionContent(descriptionRef.current.innerText);
                                        }
                                    }}
                                    onInput={(e) => {
                                        if (descriptionRef.current) {
                                            setDescriptionContent(descriptionRef.current.innerText);
                                        }
                                    }}
                                >
                                </div>
                            </div>
                        </div>
                     </div>

                     {/* Product Video */}
                     <div className="mt-8">
                         <label className="block text-[14px] font-medium text-[#161823] mb-2">
                                Product video
                        </label>
                        <div className="w-[100px] h-[100px] border border-dashed border-gray-300 bg-gray-50 rounded-[4px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors text-gray-500">
                             <Video className="w-6 h-6 mb-1" />
                             <span className="text-[12px]">Add video</span>
                        </div>
                     </div>
                </div>

                {/* 3. Sales Information */}
                <div ref={salesRef} className="bg-white rounded-[8px] p-8 scroll-mt-24">
                     <h2 className="text-[20px] font-bold text-[#161823] mb-6">Sales information</h2>
                     
                     <div className="space-y-6">
                         {/* Variations */}
                         <div>
                            <label className="block text-[14px] font-medium text-[#161823] mb-2">
                                Variations
                            </label>
                            <div className="bg-[#F8F8F8] p-4 rounded-[4px] border border-gray-200">
                                <button className="text-[#009E91] text-[13px] font-medium flex items-center gap-1 hover:underline">
                                    <span className="text-[16px] font-bold">+</span> Enable variations
                                </button>
                                <p className="text-[12px] text-gray-500 mt-1">Add variations like color, size, material, etc.</p>
                            </div>
                         </div>

                         <div className="grid grid-cols-2 gap-6">
                            {/* Price */}
                            <div>
                                <label className="block text-[14px] font-medium text-[#161823] mb-2">
                                    Retail Price <span className="text-red-500">*</span>
                                </label>
                                <div className="flex items-center border border-gray-300 rounded-[4px] px-3 h-[40px] focus-within:border-[#009E91]">
                                    <span className="text-gray-500 text-[14px] mr-2">RM</span>
                                    <input type="text" className="flex-1 outline-none text-[14px]" placeholder="0.00" />
                                </div>
                            </div>

                             {/* Quantity */}
                             <div>
                                <label className="block text-[14px] font-medium text-[#161823] mb-2">
                                    Quantity <span className="text-red-500">*</span>
                                </label>
                                <input type="number" className="w-full h-[40px] px-3 border border-gray-300 rounded-[4px] outline-none focus:border-[#009E91] text-[14px]" placeholder="0" />
                            </div>
                         </div>
                         
                         {/* SKU */}
                         <div>
                            <label className="block text-[14px] font-medium text-[#161823] mb-2">
                                Seller SKU
                            </label>
                            <input type="text" className="w-full h-[40px] px-3 border border-gray-300 rounded-[4px] outline-none focus:border-[#009E91] text-[14px]" placeholder="SKU code" />
                        </div>
                     </div>
                </div>

                {/* 4. Shipping */}
                <div ref={shippingRef} className="bg-white rounded-[8px] p-8 scroll-mt-24">
                     <h2 className="text-[20px] font-bold text-[#161823] mb-6">Shipping & Warranty</h2>
                     
                     <div className="space-y-6">
                         {/* Weight */}
                         <div>
                            <label className="block text-[14px] font-medium text-[#161823] mb-2">
                                Package Weight <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center border border-gray-300 rounded-[4px] px-3 h-[40px] focus-within:border-[#009E91] w-[200px]">
                                <input type="text" className="flex-1 outline-none text-[14px]" placeholder="0.00" />
                                <span className="text-gray-500 text-[14px] ml-2 border-l pl-2 h-[20px] flex items-center">kg</span>
                            </div>
                         </div>

                         {/* Dimensions */}
                         <div>
                            <label className="block text-[14px] font-medium text-[#161823] mb-2">
                                Package Dimensions (L x W x H)
                            </label>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-gray-300 rounded-[4px] px-3 h-[40px] focus-within:border-[#009E91] w-[140px]">
                                    <input type="text" className="flex-1 outline-none text-[14px]" placeholder="Length" />
                                    <span className="text-gray-500 text-[14px] ml-1">cm</span>
                                </div>
                                <span className="text-gray-400">x</span>
                                <div className="flex items-center border border-gray-300 rounded-[4px] px-3 h-[40px] focus-within:border-[#009E91] w-[140px]">
                                    <input type="text" className="flex-1 outline-none text-[14px]" placeholder="Width" />
                                    <span className="text-gray-500 text-[14px] ml-1">cm</span>
                                </div>
                                <span className="text-gray-400">x</span>
                                <div className="flex items-center border border-gray-300 rounded-[4px] px-3 h-[40px] focus-within:border-[#009E91] w-[140px]">
                                    <input type="text" className="flex-1 outline-none text-[14px]" placeholder="Height" />
                                    <span className="text-gray-500 text-[14px] ml-1">cm</span>
                                </div>
                            </div>
                         </div>

                         {/* Warranty */}
                         <div>
                             <label className="block text-[14px] font-medium text-[#161823] mb-2">
                                Warranty Period
                             </label>
                             <div className="w-[300px] h-[40px] px-3 border border-gray-300 rounded-[4px] flex items-center justify-between cursor-pointer bg-white">
                                <span className="text-[14px] text-gray-500">Select warranty period</span>
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </div>
                         </div>
                     </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProductEditor;