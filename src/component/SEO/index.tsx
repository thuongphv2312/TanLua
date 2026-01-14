import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HOST, COMPANY_NAME, HOTLINE, ADDRESS, EMAIL } from '../NewsPage/constants';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'product';
    product?: {
        name: string;
        price: string;
        oldPrice?: string;
        image: string;
        description: string;
        category: string;
        availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
        brand?: string;
    };
    breadcrumbs?: Array<{ name: string; url: string }>;
    noIndex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
    title = 'Tấn Lụa - Máy móc Công Nông nghiệp chính hãng',
    description = 'Tấn Lụa (TanLua) - Chuyên phân phối máy móc công nông nghiệp chính hãng: Máy hàn, Máy cắt cỏ, Máy xới đất, Máy rửa xe, Dụng cụ cầm tay. Giá tốt nhất - Bảo hành uy tín - Giao hàng toàn quốc.',
    keywords = 'tanlua, tấn lụa, máy hàn, máy cắt cỏ, máy xới đất, máy rửa xe, dụng cụ cầm tay, máy nông nghiệp, máy công nghiệp',
    image = 'https://i.ibb.co/YF9VJFMg/logo.png',
    url = `https://${HOST}`,
    type = 'website',
    product,
    breadcrumbs,
    noIndex = false,
}) => {
    const fullTitle = title.includes('Tấn Lụa') ? title : `${title} | Tấn Lụa`;

    // Generate Product Schema
    const productSchema = product ? {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": product.image,
        "description": product.description,
        "brand": {
            "@type": "Brand",
            "name": product.brand || "Tấn Lụa"
        },
        "category": product.category,
        "offers": {
            "@type": "Offer",
            "url": url,
            "priceCurrency": "VND",
            "price": product.price.replace(/[^\d]/g, ''),
            "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            "availability": `https://schema.org/${product.availability || 'InStock'}`,
            "seller": {
                "@type": "Organization",
                "name": "Tấn Lụa"
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "156"
        }
    } : null;

    // Generate Breadcrumb Schema
    const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.name,
            "item": crumb.url
        }))
    } : null;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Robots */}
            {noIndex ? (
                <meta name="robots" content="noindex, nofollow" />
            ) : (
                <meta name="robots" content="index, follow, max-image-preview:large" />
            )}

            {/* Canonical URL */}
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type === 'product' ? 'product' : type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:locale" content="vi_VN" />
            <meta property="og:site_name" content="Tấn Lụa" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Product-specific meta */}
            {product && (
                <>
                    <meta property="product:price:amount" content={product.price.replace(/[^\d]/g, '')} />
                    <meta property="product:price:currency" content="VND" />
                    <meta property="product:availability" content={product.availability || 'in stock'} />
                    <meta property="product:category" content={product.category} />
                </>
            )}

            {/* Product Schema */}
            {productSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(productSchema)}
                </script>
            )}

            {/* Breadcrumb Schema */}
            {breadcrumbSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;

// SEO constants for reuse
export const SEO_DEFAULTS = {
    siteName: 'Tấn Lụa',
    siteUrl: `https://${HOST}`,
    logo: 'https://i.ibb.co/YF9VJFMg/logo.png',
    defaultImage: 'https://i.ibb.co/YF9VJFMg/logo.png',
    company: COMPANY_NAME,
    phone: HOTLINE,
    email: EMAIL,
    address: ADDRESS,
};

// Category SEO metadata
export const CATEGORY_SEO = {
    'may-nong-nghiep': {
        title: 'Máy Nông Nghiệp - Máy cắt cỏ, Máy xới đất, Máy phun thuốc',
        description: 'Máy nông nghiệp chính hãng tại Tấn Lụa: Máy cắt cỏ, Máy xới đất, Máy phun thuốc trừ sâu, Máy bơm nước. Giá tốt nhất, bảo hành uy tín.',
        keywords: 'máy nông nghiệp, máy cắt cỏ, máy xới đất, máy phun thuốc, tanlua',
    },
    'may-cong-nghiep': {
        title: 'Máy Công Nghiệp - Máy hàn, Máy rửa xe, Máy đầm thước',
        description: 'Máy công nghiệp chính hãng: Máy hàn điện, Máy rửa xe áp lực cao, Máy đầm thước, Máy xoa vữa. Phân phối bởi Tấn Lụa.',
        keywords: 'máy công nghiệp, máy hàn, máy rửa xe, máy đầm, tanlua',
    },
    'dung-cu-cam-tay': {
        title: 'Dụng Cụ Cầm Tay - Máy khoan pin, Máy mài, Máy siết bulong',
        description: 'Dụng cụ cầm tay pin chính hãng HUKAN, OSHIMA: Máy khoan pin, Máy mài, Máy cưa xích, Máy siết bulong. Tấn Lụa phân phối.',
        keywords: 'dụng cụ cầm tay, máy khoan pin, máy mài, máy cưa xích, máy siết bulong, tanlua',
    },
    'thiet-bi-xit-rua': {
        title: 'Thiết Bị Xịt Rửa - Đầu xịt rửa xe, Dây xịt áp lực',
        description: 'Thiết bị xịt rửa xe áp lực cao: Đầu xịt rửa, Dây xịt tăng áp, Giá đỡ bánh xe. Chính hãng tại Tấn Lụa.',
        keywords: 'thiết bị xịt rửa, đầu xịt, dây xịt áp lực, máy rửa xe, tanlua',
    },
    'may-phat-dien': {
        title: 'Máy Phát Điện - Máy phát điện gia đình, công nghiệp',
        description: 'Máy phát điện chính hãng cho gia đình và công nghiệp. Đa dạng công suất, giá tốt tại Tấn Lụa.',
        keywords: 'máy phát điện, máy phát điện gia đình, máy phát điện công nghiệp, tanlua',
    },
    'may-ban-cot': {
        title: 'Máy Bắn Cốt - Máy cân mực laser chính xác',
        description: 'Máy bắn cốt, máy cân mực laser OSHIMA chính hãng. Độ chính xác cao, giá tốt tại Tấn Lụa.',
        keywords: 'máy bắn cốt, máy cân mực, laser, oshima, tanlua',
    },
    'may-cat-co': {
        title: 'Máy Cắt Cỏ - Máy cắt cỏ 2 thì, 4 thì chính hãng',
        description: 'Máy cắt cỏ 2 thì, 4 thì chính hãng: TL35X, TJ35, CS260. Chất lượng cao, giá tốt tại Tấn Lụa.',
        keywords: 'máy cắt cỏ, máy cắt cỏ 4 thì, máy cắt cỏ 2 thì, tanlua',
    },
    'may-xoi-dat': {
        title: 'Máy Xới Đất - Máy xới đất mini đa năng',
        description: 'Máy xới đất mini OSHIMA XDX18, XDX23 chính hãng. Công suất mạnh, dễ sử dụng. Tấn Lụa phân phối.',
        keywords: 'máy xới đất, máy xới đất mini, oshima, tanlua',
    },
    'may-bom-nuoc': {
        title: 'Máy Bơm Nước - Máy bơm tăng áp, bơm nông nghiệp',
        description: 'Máy bơm nước tăng áp mini, máy bơm nông nghiệp chính hãng HUKAN, NAKAWA. Giá tốt tại Tấn Lụa.',
        keywords: 'máy bơm nước, máy bơm tăng áp, máy bơm nông nghiệp, tanlua',
    },
    'may-nen-khi': {
        title: 'Máy Nén Khí - Máy nén khí công nghiệp chính hãng',
        description: 'Máy nén khí công nghiệp chính hãng OSHIMA. Đa dạng dung tích, giá tốt tại Tấn Lụa.',
        keywords: 'máy nén khí, máy nén khí công nghiệp, oshima, tanlua',
    },
    'hang-thanh-ly': {
        title: 'Hàng Thanh Lý - Xả kho giá sốc đến 50%',
        description: 'Hàng thanh lý, xả kho máy móc công nông nghiệp giảm giá đến 50%. Số lượng có hạn tại Tấn Lụa.',
        keywords: 'hàng thanh lý, xả kho, giảm giá, máy móc giá rẻ, tanlua',
    },
    'vat-tu': {
        title: 'Vật Tư Tiêu Hao - Phụ kiện, linh kiện thay thế',
        description: 'Vật tư tiêu hao, phụ kiện máy móc: Pin, sạc, nhớt, phụ kiện máy cắt cỏ. Chính hãng tại Tấn Lụa.',
        keywords: 'vật tư tiêu hao, phụ kiện, pin máy khoan, nhớt 2 thì, tanlua',
    },
};
