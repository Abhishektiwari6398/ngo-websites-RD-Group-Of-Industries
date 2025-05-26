import Image from 'next/image';

const GallerySection = ({ galleryData }) => {
  const getImageHeight = (size) => {
    switch (size) {
      case 'small': return 'h-48';
      case 'large': return 'h-80';
      default: return 'h-64';
    }
  };

  // Guard: If galleryData is not an array or is empty, render nothing or a fallback
  if (!Array.isArray(galleryData) || galleryData.length === 0) {
    return <div className="text-center py-16">No gallery images available.</div>;
  }

  return (
    <div className="bg-white py-16 relative overflow-hidden">
      {/* Background Title */}
      <div className="absolute top-14 left-20 right-30 z-0">
        <h1 className="font-inter font-extrabold text-[100px] leading-[100%] tracking-[-0.04em] text-[#000000]">
          OUR <span className="text-[#FFB338]">GALLERY</span>
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
          {[0, 1, 2].map((col) => (
            <div key={col} className="space-y-4">
              {galleryData.slice(col * 3, (col + 1) * 3).map((image, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className={`relative ${getImageHeight(image.size)} w-full rounded-lg overflow-hidden shadow-md`}>
                    <Image
                      src={image.image.asset.url}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GallerySection;